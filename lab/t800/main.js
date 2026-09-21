import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/loaders/GLTFLoader.js';

// Tuning surface: these are the values to adjust for the character's feel.
const CONFIG = {
  modelUrl: './T-800.glb',
  eyeSensitivity: { x: 0.52, y: 0.28 },
  headSensitivity: { x: 0.38, y: 0.22 },
  neckSensitivity: { x: 0.12, y: 0.07 },
  eyeSmoothing: 0.2,
  headSmoothing: 0.075,
  neckSmoothing: 0.045,
  mouthIntensity: 0.5,
  mouthSpeed: 11,
  headHeightFraction: 0.95,
  cameraFov: 26
};

const viewport = document.querySelector('#viewport');
const loading = document.querySelector('#loading');
const errorBox = document.querySelector('#error');
const input = document.querySelector('#speech-input');
const form = document.querySelector('#speech-form');
const pointer = new THREE.Vector2();
const targetLook = new THREE.Vector2();
const currentLook = new THREE.Vector2();
const currentHeadLook = new THREE.Vector2();
let scene, camera, renderer, character, rig, clock;
let jawBone = null;
let headBone = null;
let headBaseQuaternion = null;
let neckBaseQuaternion = null;
const eyeBaseQuaternions = new Map();
let jawBaseQuaternion = null;
let mouthMorphs = [];
let speech = { active: false, elapsed: 0 };
let mouthOpenTarget = 0;
let mouthOpenAmount = 0;
const INTERACTION_ENABLED = true;

const findBone = (patterns) => {
  if (!rig) return null;
  const bones = rig.skeleton.bones;
  for (const pattern of patterns) {
    const match = bones.find((bone) => pattern.test(bone.name));
    if (match) return match;
  }
  return null;
};

function discoverRig() {
  const bones = rig?.skeleton?.bones || [];
  const boneNames = bones.map((bone) => bone.name);
  const eyes = {
    left: findBone([/^l_j_eyeball_endo$/i, /^j_eyeball-l$/i, /^j_eyeball_l$/i, /^eyeball[._ ]?l$/i, /(?:^|[-_. ])l[-_ .]?eye$/i, /eye[-_ .]?l$/i]),
    right: findBone([/^r_j_eyeball_endo$/i, /^j_eyeball-r$/i, /^j_eyeball_r$/i, /^eyeball[._ ]?r$/i, /(?:^|[-_. ])r[-_ .]?eye$/i, /eye[-_ .]?r$/i])
  };
  const head = findBone([/^head$/i, /^j_head$/i, /head_part/i, /head[-_ ]?focus/i]);
  const neck = findBone([/head neck upper/i, /^neck/i, /^j_neck/i, /neck.*upper/i]);
  headBone = head;
  headBaseQuaternion = headBone ? headBone.quaternion.clone() : null;
  neckBaseQuaternion = neck ? neck.quaternion.clone() : null;
  jawBone = findBone([/^j_jaw_endo$/i, /^j_jaw$/i, /jaw/i, /mandible/i, /mouth/i, /lower.*face/i, /chin/i]);
  if (!jawBone) {
    jawBone = findBone([/teeth[._ ]?lower/i, /lip[._ ]?lower/i]);
  }
  character.traverse((object) => {
    if (!object.isMesh || !object.morphTargetDictionary) return;
    Object.entries(object.morphTargetDictionary).forEach(([name, index]) => {
      if (/jaw|mouth|open|viseme|lip|speak/i.test(name)) mouthMorphs.push({ object, index, name });
    });
  });
  rig.userData.controls = { eyes, head, neck };
  window.__t800Controls = { eyes, head, neck, jaw: jawBone };
  window.__t800EyeDebug = {
    bases: { left: eyeBaseQuaternions.get(eyes.left), right: eyeBaseQuaternions.get(eyes.right) },
    apply(axisName, leftSign, rightSign, degrees) {
      window.__t800CalibrationMode = true;
      window.__t800TrackingEnabled = false;
      const axis = { x: new THREE.Vector3(1, 0, 0), z: new THREE.Vector3(0, 0, 1) }[axisName];
      const angle = THREE.MathUtils.degToRad(degrees);
      [
        [eyes.left, leftSign],
        [eyes.right, rightSign]
      ].forEach(([bone, sign]) => {
        const base = eyeBaseQuaternions.get(bone);
        if (!bone || !base) return;
        bone.quaternion.copy(base).multiply(new THREE.Quaternion().setFromAxisAngle(axis, angle * sign));
      });
    },
    reset() {
      window.__t800CalibrationMode = true;
      window.__t800TrackingEnabled = false;
      [eyes.left, eyes.right].forEach((bone) => {
        const base = eyeBaseQuaternions.get(bone);
        if (bone && base) bone.quaternion.copy(base);
      });
    }
  };
  [eyes.left, eyes.right].filter(Boolean).forEach((bone) => eyeBaseQuaternions.set(bone, bone.quaternion.clone()));
  jawBaseQuaternion = jawBone ? jawBone.quaternion.clone() : null;
  console.info('T-800 eye controls', { left: eyes.left?.name || null, right: eyes.right?.name || null });
  console.info('T-800 facial controls', { head: head?.name || null, neck: neck?.name || null, jaw: jawBone?.name || null, morphs: mouthMorphs.map((morph) => morph.name) });
  const eyeCandidates = bones.filter((bone) => /eye|eyeball/i.test(bone.name)).map((bone) => bone.name);
  console.info('T-800 eye bone candidates', eyeCandidates);
  console.info('T-800 eye node details', bones.filter((bone) => /eye|eyeball|ocular|pupil|iris/i.test(bone.name)).map((bone) => ({
    name: bone.name,
    type: 'Bone',
    parent: bone.parent?.name || '<none>',
    position: bone.position.toArray(),
    quaternion: bone.quaternion.toArray(),
    scale: bone.scale.toArray()
  })));
  const eyeObjects = [];
  character.traverse((object) => {
    if (/eye|eyeball|ocular|pupil|iris/i.test(object.name)) {
      eyeObjects.push({
        name: object.name,
        type: object.type,
        parent: object.parent?.name || '<none>',
        position: object.position.toArray(),
        quaternion: object.quaternion.toArray(),
        scale: object.scale.toArray()
      });
    }
  });
  console.info('T-800 eye object details', eyeObjects);
}

function setupScene() {
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#080b0b', 8, 18);
  camera = new THREE.PerspectiveCamera(CONFIG.cameraFov, viewport.clientWidth / viewport.clientHeight, 0.01, 100);
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(viewport.clientWidth, viewport.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  viewport.appendChild(renderer.domElement);
  scene.add(new THREE.HemisphereLight('#dbe8d8', '#111715', 2.2));
  const key = new THREE.DirectionalLight('#e6f5dd', 3.2); key.position.set(2, 4, 4); scene.add(key);
  const rim = new THREE.PointLight('#a8ffb7', 7, 8); rim.position.set(-3, 2, -2); scene.add(rim);
  clock = new THREE.Clock();
}

function frameCharacter() {
  const head = character.getObjectByName('T800Endo-Head');
  const bounds = new THREE.Box3().setFromObject(head || character);
  const size = bounds.getSize(new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());
  const target = center.clone();
  target.y += size.y * 0.1;
  const distance = size.y / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * CONFIG.headHeightFraction);
  camera.position.set(target.x, target.y, target.z + distance);
  camera.lookAt(target);
}

function updatePointer(event) {
  const rect = viewport.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
  targetLook.set(THREE.MathUtils.clamp(pointer.x, -1, 1), THREE.MathUtils.clamp(pointer.y, -1, 1));
}

function animateMouth(delta) {
  if (!INTERACTION_ENABLED) return;
  if (speech.active) {
    speech.elapsed += delta;
    const phoneme = Math.abs(Math.sin(speech.elapsed * CONFIG.mouthSpeed) * 0.48 + Math.sin(speech.elapsed * 18.7) * 0.3 + Math.sin(speech.elapsed * 7.1) * 0.22);
    mouthOpenTarget = phoneme * CONFIG.mouthIntensity;
  }
  mouthOpenAmount = THREE.MathUtils.damp(mouthOpenAmount, mouthOpenTarget, 12, delta);
  const opening = mouthOpenAmount;
  if (jawBone && jawBaseQuaternion) {
    const jawOffset = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), opening);
    jawBone.quaternion.copy(jawBaseQuaternion).multiply(jawOffset);
  } else if (mouthMorphs.length) {
    mouthMorphs.forEach(({ object, index }) => { object.morphTargetInfluences[index] = opening; });
  }
}

function stopSpeech() {
  speech.active = false;
  speech.elapsed = 0;
  mouthOpenTarget = 0;
  mouthMorphs.forEach(({ object, index }) => { object.morphTargetInfluences[index] = 0; });
}

function animate() {
  requestAnimationFrame(animate);
  const delta = Math.min(clock.getDelta(), 0.05);
  if (rig) {
    const { eyes, head, neck } = rig.userData.controls;
    const trackingEnabled = INTERACTION_ENABLED && window.__t800TrackingEnabled !== false;
    const lookTarget = trackingEnabled ? targetLook : new THREE.Vector2();
    currentLook.lerp(lookTarget, CONFIG.eyeSmoothing);
    currentHeadLook.lerp(lookTarget, CONFIG.headSmoothing);
    const eyeBones = [eyes.left, eyes.right].filter(Boolean);
    if (INTERACTION_ENABLED && !window.__t800CalibrationMode) {
      if (head && headBaseQuaternion) {
        const yawOffset = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), currentHeadLook.x * CONFIG.headSensitivity.x);
        const pitchOffset = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), -currentHeadLook.y * CONFIG.headSensitivity.y);
        head.quaternion.copy(headBaseQuaternion).multiply(yawOffset).multiply(pitchOffset);
      }
      if (neck && neckBaseQuaternion) {
        const neckYaw = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), currentHeadLook.x * CONFIG.neckSensitivity.x);
        const neckPitch = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), -currentHeadLook.y * CONFIG.neckSensitivity.y);
        neck.quaternion.copy(neckBaseQuaternion).multiply(neckYaw).multiply(neckPitch);
      }
      eyeBones.forEach((bone) => {
        const base = eyeBaseQuaternions.get(bone);
        if (!base) return;
        const yawOffset = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), currentLook.x * CONFIG.eyeSensitivity.x);
        const pitchOffset = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), -currentLook.y * CONFIG.eyeSensitivity.y);
        bone.quaternion.copy(base).multiply(yawOffset).multiply(pitchOffset);
      });
    }
    animateMouth(delta);
  }
  renderer.render(scene, camera);
}

function speak(text) {
  const cleanText = text.trim();
  if (!cleanText) return;
  window.speechSynthesis.cancel();
  stopSpeech();
  const utterance = new SpeechSynthesisUtterance(cleanText);
  speech = { active: true, elapsed: 0 };
  utterance.onstart = () => { speech.active = true; };
  utterance.onend = stopSpeech;
  utterance.onerror = stopSpeech;
  window.speechSynthesis.speak(utterance);
}

form.addEventListener('submit', (event) => { event.preventDefault(); speak(input.value); input.focus(); });
viewport.addEventListener('pointermove', updatePointer);
window.addEventListener('resize', () => { if (!camera || !renderer) return; camera.aspect = viewport.clientWidth / viewport.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(viewport.clientWidth, viewport.clientHeight); });

async function load() {
  setupScene();
  try {
    const gltf = await new GLTFLoader().loadAsync(CONFIG.modelUrl);
    character = gltf.scene;
    scene.add(character);
    rig = character.getObjectByName('Terminator_Rig') || character.getObjectByProperty('type', 'SkinnedMesh')?.skeleton?.bones[0]?.parent;
    if (!rig) { rig = character.getObjectByProperty('type', 'SkinnedMesh')?.skeleton?.bones[0]; }
    if (rig?.isBone) rig = character.getObjectByProperty('type', 'SkinnedMesh')?.skeleton?.bone;
    const armature = character.getObjectByName('Terminator_Rig');
    if (armature?.isSkinnedMesh) rig = armature;
    const skinned = character.getObjectByProperty('type', 'SkinnedMesh');
    if (skinned && !rig?.skeleton) rig = skinned;
    if (!rig?.skeleton) throw new Error('The GLB loaded, but no skinned armature was found. Export the Terminator_Rig with skins enabled.');
    discoverRig();
    frameCharacter();
    loading.remove();
    animate();
  } catch (loadError) {
    loading.remove();
    errorBox.hidden = false;
    errorBox.textContent = `Could not load T-800.glb. Run the export script in Blender, then serve this folder over HTTP. Details: ${loadError.message}`;
    console.error(loadError);
  }
}

load();
