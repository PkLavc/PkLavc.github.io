const host = document.querySelector('[data-s800-background]');
let loadPromise = null;

function reveal() {
  document.body.classList.add('is-s800-revealed');
  if (!host) return Promise.resolve();
  if (!loadPromise) loadPromise = loadScene();
  return loadPromise;
}

function hide() { document.body.classList.remove('is-s800-revealed'); }

async function loadScene() {
  host.dataset.s800Ready = 'loading';
  try {
    const [THREE, gltfModule, dracoModule] = await Promise.all([
      import('./vendor/three/three.module.js'),
      import('./vendor/three/GLTFLoader.js'),
      import('./vendor/three/DRACOLoader.js')
    ]);
    const { GLTFLoader } = gltfModule;
    const { DRACOLoader } = dracoModule;
    const base = new URL('.', import.meta.url);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(26, 1, .01, 100);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    const loader = new GLTFLoader().setDRACOLoader(new DRACOLoader().setDecoderPath(new URL('./vendor/three/draco/', base).href));
    const targetLook = new THREE.Vector2();
    const eyeLook = new THREE.Vector2();
    const headLook = new THREE.Vector2();
    const worldTarget = new THREE.Vector3();
    const cameraRight = new THREE.Vector3();
    const cameraUp = new THREE.Vector3();
    const eyeBase = new Map();
    const eyeForwards = new Map();
    const axisX = new THREE.Vector3(1, 0, 0);
    const axisZ = new THREE.Vector3(0, 0, 1);
    let character, rig, eyes = { left: null, right: null }, head, neck, jaw, headBase, neckBase, jawBase;
    let mouthOpen = 0;
    let speech = { active: false, energy: 0, lastBoundary: 0 };

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    host.replaceChildren(renderer.domElement);
    scene.add(new THREE.HemisphereLight('#dbe8d8', '#111715', 2.2));
    const key = new THREE.DirectionalLight('#e6f5dd', 3.2); key.position.set(2, 4, 4); scene.add(key);
    const rim = new THREE.PointLight('#a8ffb7', 7, 8); rim.position.set(-3, 2, -2); scene.add(rim);

    const findBone = patterns => rig?.skeleton?.bones.find(bone => patterns.some(pattern => pattern.test(bone.name))) || null;
    function resize() {
      const width = Math.max(1, host.clientWidth), height = Math.max(1, host.clientHeight);
      camera.aspect = width / height; camera.updateProjectionMatrix(); renderer.setSize(width, height, false);
    }
    function frame(root) {
      const visibleHead = root.getObjectByName('S800Endo-Head') || root;
      const box = new THREE.Box3().setFromObject(visibleHead);
      const size = box.getSize(new THREE.Vector3()), center = box.getCenter(new THREE.Vector3());
      center.y += size.y * .1;
      camera.position.set(center.x, center.y, center.z + size.y / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * .95));
      camera.lookAt(center);
    }
    function discoverRig() {
      rig = character.getObjectByProperty('type', 'SkinnedMesh');
      if (!rig?.skeleton) throw new Error('S-800 runtime rig was not found.');
      eyes.left = findBone([/^l_j_eyeball_endo$/i, /^j_eyeball[-_]l$/i, /^eyeball[._ ]?l$/i]);
      eyes.right = findBone([/^r_j_eyeball_endo$/i, /^j_eyeball[-_]r$/i, /^eyeball[._ ]?r$/i]);
      head = findBone([/^j_head$/i, /^head$/i]);
      neck = findBone([/^j_neck$/i, /head neck upper/i, /^neck/i]);
      jaw = findBone([/^j_jaw_endo$/i, /^j_jaw$/i, /jaw/i, /mandible/i]);
      headBase = head?.quaternion.clone(); neckBase = neck?.quaternion.clone(); jawBase = jaw?.quaternion.clone();
      [eyes.left, eyes.right].filter(Boolean).forEach(eye => eyeBase.set(eye, eye.quaternion.clone()));
    }
    function cacheEyeAim() {
      [eyes.left, eyes.right].filter(Boolean).forEach(eye => {
        eye.parent.updateWorldMatrix(true, false); eye.updateWorldMatrix(false, false);
        const baseQuaternion = eye.getWorldQuaternion(new THREE.Quaternion());
        eyeForwards.set(eye, camera.position.clone().sub(eye.getWorldPosition(new THREE.Vector3())).normalize().applyQuaternion(baseQuaternion.invert()).normalize());
      });
    }
    function updatePointer(event) {
      const rect = host.getBoundingClientRect();
      const pointerX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const pointerY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      const visibleEyes = [eyes.left, eyes.right].filter(Boolean), anchor = new THREE.Vector3();
      if (visibleEyes.length) { visibleEyes.forEach(eye => anchor.add(eye.getWorldPosition(new THREE.Vector3()))); anchor.multiplyScalar(1 / visibleEyes.length).project(camera); }
      targetLook.set(THREE.MathUtils.clamp(pointerX - anchor.x, -1, 1), THREE.MathUtils.clamp(pointerY - anchor.y, -1, 1));
    }
    function applyEyes() {
      cameraRight.setFromMatrixColumn(camera.matrixWorld, 0); cameraUp.setFromMatrixColumn(camera.matrixWorld, 1);
      worldTarget.copy(camera.position).addScaledVector(cameraRight, eyeLook.x * 3).addScaledVector(cameraUp, eyeLook.y * 2);
      [eyes.left, eyes.right].filter(Boolean).forEach(eye => {
        const baseQuaternion = eyeBase.get(eye), localForward = eyeForwards.get(eye);
        if (!baseQuaternion || !localForward) return;
        eye.quaternion.copy(baseQuaternion); eye.parent.updateWorldMatrix(true, false);
        const neutralWorld = eye.getWorldQuaternion(new THREE.Quaternion());
        const neutralForward = localForward.clone().applyQuaternion(neutralWorld).normalize();
        const turn = new THREE.Quaternion().setFromUnitVectors(neutralForward, worldTarget.clone().sub(eye.getWorldPosition(new THREE.Vector3())).normalize());
        const angle = 2 * Math.acos(THREE.MathUtils.clamp(turn.w, -1, 1));
        if (angle > .62) turn.slerp(new THREE.Quaternion(), 1 - .62 / angle);
        eye.quaternion.copy(eye.parent.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(turn.multiply(neutralWorld)));
      });
    }
    function animateMouth(delta) {
      speech.energy = Math.max(0, speech.energy - delta * 5.2);
      const target = speech.active ? Math.max(.055, speech.energy * .62) : 0;
      mouthOpen = THREE.MathUtils.damp(mouthOpen, target, target > mouthOpen ? 20 : 11, delta);
      if (jaw && jawBase) jaw.quaternion.copy(jawBase).multiply(new THREE.Quaternion().setFromAxisAngle(axisX, mouthOpen));
    }
    function speak(text, language) {
      if (!text?.trim() || !('speechSynthesis' in window)) return;
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.trim()); utterance.lang = language || 'en-US';
      speech = { active: true, energy: .3, lastBoundary: performance.now() };
      utterance.onboundary = event => {
        const gap = Math.min((performance.now() - speech.lastBoundary) / 1000, .3); speech.lastBoundary = performance.now();
        const char = event.charIndex === undefined ? '' : utterance.text[event.charIndex] || '';
        speech.energy = THREE.MathUtils.clamp((/[aeiouáàâãéêíóôõúü]/i.test(char) ? 1 : .55) * (.72 + gap * .9), .25, 1);
      };
      utterance.onend = utterance.onerror = () => { speech.active = false; speech.energy = 0; };
      speechSynthesis.speak(utterance);
    }

    character = (await loader.loadAsync(new URL('./S-800-bust.glb', base).href)).scene;
    scene.add(character); resize(); frame(character); character.updateMatrixWorld(true); discoverRig(); cacheEyeAim();
    host.dataset.s800Controls = `eyes:${Number(Boolean(eyes.left && eyes.right))},head:${Number(Boolean(head && neck))},jaw:${Number(Boolean(jaw))}`;
    host.dataset.s800Ready = 'true';
    document.addEventListener('pointermove', updatePointer, { passive: true }); new ResizeObserver(resize).observe(host);
    let previousTime = performance.now();
    (function draw(now) {
      requestAnimationFrame(draw);
      const delta = Math.min((now - previousTime) / 1000, .05); previousTime = now;
      eyeLook.lerp(targetLook, .2); headLook.lerp(targetLook, .055);
      if (head && headBase) head.quaternion.copy(headBase).multiply(new THREE.Quaternion().setFromAxisAngle(axisX, headLook.x * .38)).multiply(new THREE.Quaternion().setFromAxisAngle(axisZ, -headLook.y * .22));
      if (neck && neckBase) neck.quaternion.copy(neckBase).multiply(new THREE.Quaternion().setFromAxisAngle(axisX, headLook.x * .12)).multiply(new THREE.Quaternion().setFromAxisAngle(axisZ, -headLook.y * .07));
      character.updateMatrixWorld(true); applyEyes(); animateMouth(delta); renderer.render(scene, camera);
    }());
    window.S800Background = { reveal, hide, speak };
  } catch (error) {
    host.dataset.s800Ready = 'false'; console.error('S-800 background failed to load:', error); throw error;
  }
}

window.S800Background = { reveal, hide };
