import * as THREE from './vendor/three/three.module.js';
import { GLTFLoader } from './vendor/three/GLTFLoader.js';
import { DRACOLoader } from './vendor/three/DRACOLoader.js';

const ASSET_BASE = new URL('.', import.meta.url);
const CONFIG = {
  skins: {
    endo: { label: 'S-800 endoskeleton', modelUrl: new URL('S-800-bust.glb', ASSET_BASE).href }
  },
  eyeSmoothing: 0.2, headSmoothing: 0.075, neckSmoothing: 0.045,
  headSensitivity: { x: 0.38, y: 0.22 }, neckSensitivity: { x: 0.12, y: 0.07 },
  eyeLimit: 0.62, mouthIntensity: 0.62, mouthAttack: 20, mouthRelease: 11,
  headHeightFraction: 0.95, cameraFov: 26
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
const worldTarget = new THREE.Vector3();
const cameraRight = new THREE.Vector3();
const cameraUp = new THREE.Vector3();
const quaternionA = new THREE.Quaternion();
const quaternionB = new THREE.Quaternion();
let scene, camera, renderer, character, rig, clock;
let jawBone, headBone, neckBone, headBaseQuaternion, neckBaseQuaternion, jawBaseQuaternion;
let mouthMorphs = [];
const eyeBaseQuaternions = new Map();
const eyeLocalForwards = new Map();
let loadingSkin = false;
let speech = { active: false, energy: 0, lastBoundary: 0 };
let mouthOpenTarget = 0;
let mouthOpenAmount = 0;
const dracoLoader = new DRACOLoader().setDecoderPath(new URL('vendor/three/draco/', ASSET_BASE).href);
const gltfLoader = new GLTFLoader().setDRACOLoader(dracoLoader);

const findBone = (patterns) => {
  if (!rig?.skeleton) return null;
  for (const pattern of patterns) {
    const match = rig.skeleton.bones.find((bone) => pattern.test(bone.name));
    if (match) return match;
  }
  return null;
};

function resetRigState() {
  jawBone = headBone = neckBone = headBaseQuaternion = neckBaseQuaternion = jawBaseQuaternion = null;
  mouthMorphs = [];
  eyeBaseQuaternions.clear();
  eyeLocalForwards.clear();
  mouthOpenTarget = mouthOpenAmount = 0;
}

function discoverRig() {
  const eyes = {
    left: findBone([/^l_j_eyeball_endo$/i, /^j_eyeball-l$/i, /^j_eyeball_l$/i, /^eyeball[._ ]?l$/i, /(?:^|[-_. ])l[-_ .]?eye$/i, /eye[-_ .]?l$/i]),
    right: findBone([/^r_j_eyeball_endo$/i, /^j_eyeball-r$/i, /^j_eyeball_r$/i, /^eyeball[._ ]?r$/i, /(?:^|[-_. ])r[-_ .]?eye$/i, /eye[-_ .]?r$/i])
  };
  headBone = findBone([/^head$/i, /^j_head$/i, /head_part/i, /head[-_ ]?focus/i]);
  neckBone = findBone([/head neck upper/i, /^neck/i, /^j_neck/i, /neck.*upper/i]);
  jawBone = findBone([/^j_jaw_endo$/i, /^j_jaw$/i, /jaw/i, /mandible/i, /mouth/i, /lower.*face/i, /chin/i]) || findBone([/teeth[._ ]?lower/i, /lip[._ ]?lower/i]);
  headBaseQuaternion = headBone?.quaternion.clone() || null;
  neckBaseQuaternion = neckBone?.quaternion.clone() || null;
  jawBaseQuaternion = jawBone?.quaternion.clone() || null;
  [eyes.left, eyes.right].filter(Boolean).forEach((eye) => eyeBaseQuaternions.set(eye, eye.quaternion.clone()));
  character.traverse((object) => {
    if (!object.isMesh || !object.morphTargetDictionary) return;
    Object.entries(object.morphTargetDictionary).forEach(([name, index]) => {
      if (/jaw|mouth|open|viseme|lip|speak/i.test(name)) mouthMorphs.push({ object, index, name });
    });
  });
  rig.userData.controls = { eyes, head: headBone, neck: neckBone };
  window.__s800Controls = rig.userData.controls;
  console.info('S-800 controls', { leftEye: eyes.left?.name, rightEye: eyes.right?.name, head: headBone?.name, neck: neckBone?.name, jaw: jawBone?.name, morphs: mouthMorphs.map(({ name }) => name) });
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
  const head = character.getObjectByName('S800Endo-Head') || character.getObjectByName('S-800-Head') || character.getObjectByName('Head');
  const bounds = new THREE.Box3().setFromObject(head || character);
  const size = bounds.getSize(new THREE.Vector3());
  const target = bounds.getCenter(new THREE.Vector3());
  target.y += size.y * 0.1;
  const distance = size.y / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * CONFIG.headHeightFraction);
  camera.position.set(target.x, target.y, target.z + distance);
  camera.lookAt(target);
}

function cacheEyeAim() {
  const eyes = rig?.userData.controls?.eyes;
  if (!eyes) return;
  [eyes.left, eyes.right].filter(Boolean).forEach((eye) => {
    eye.parent.updateWorldMatrix(true, false);
    eye.updateWorldMatrix(false, false);
    const neutralWorld = eye.getWorldQuaternion(new THREE.Quaternion());
    const eyePosition = eye.getWorldPosition(new THREE.Vector3());
    const cameraDirection = camera.position.clone().sub(eyePosition).normalize();
    eyeLocalForwards.set(eye, cameraDirection.applyQuaternion(neutralWorld.invert()).normalize());
  });
}

function updatePointer(event) {
  const rect = viewport.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
  // The neutral point is the projected midpoint between the actual eyes, not
  // the geometrical centre of the browser viewport. This makes the character
  // look straight ahead when the pointer is over its eyes.
  const eyes = rig?.userData.controls?.eyes;
  const visibleEyes = [eyes?.left, eyes?.right].filter(Boolean);
  const eyeAnchor = new THREE.Vector3();
  if (visibleEyes.length) {
    visibleEyes.forEach((eye) => eyeAnchor.add(eye.getWorldPosition(new THREE.Vector3())));
    eyeAnchor.multiplyScalar(1 / visibleEyes.length).project(camera);
  }
  targetLook.set(
    THREE.MathUtils.clamp(pointer.x - eyeAnchor.x, -1, 1),
    THREE.MathUtils.clamp(pointer.y - eyeAnchor.y, -1, 1)
  );
}

function disposeCharacter(root) {
  root.traverse((object) => {
    if (!object.isMesh) return;
    object.geometry?.dispose();
    (Array.isArray(object.material) ? object.material : [object.material]).forEach((material) => material?.dispose());
  });
}

async function setSkin(requestedSkin) {
  const skin = CONFIG.skins[requestedSkin];
  if (!skin || loadingSkin) return;
  loadingSkin = true;
  loading.hidden = false;
  loading.textContent = `Loading ${skin.label}...`;
  try {
    const gltf = await gltfLoader.loadAsync(skin.modelUrl);
    const nextCharacter = gltf.scene;
    const nextRig = nextCharacter.getObjectByProperty('type', 'SkinnedMesh');
    if (!nextRig?.skeleton) throw new Error(`${skin.modelUrl} has no skinned armature.`);
    if (character) { scene.remove(character); disposeCharacter(character); }
    character = nextCharacter;
    rig = nextRig;
    resetRigState();
    scene.add(character);
    discoverRig();
    frameCharacter();
    cacheEyeAim();
    errorBox.hidden = true;
  } catch (loadError) {
    console.error(loadError);
    throw loadError;
  } finally {
    loading.hidden = true;
    loadingSkin = false;
  }
}

function applyEyeTracking(eyes) {
  if (!eyes.left && !eyes.right) return;
  cameraRight.setFromMatrixColumn(camera.matrixWorld, 0);
  cameraUp.setFromMatrixColumn(camera.matrixWorld, 1);
  worldTarget.copy(camera.position)
    .addScaledVector(cameraRight, currentLook.x * 3)
    .addScaledVector(cameraUp, currentLook.y * 2);
  [eyes.left, eyes.right].filter(Boolean).forEach((eye) => {
    const base = eyeBaseQuaternions.get(eye);
    if (!base) return;
    eye.quaternion.copy(base);
    eye.parent.updateWorldMatrix(true, false);
    eye.updateWorldMatrix(false, false);
    const eyePosition = eye.getWorldPosition(new THREE.Vector3());
    const neutralWorld = eye.getWorldQuaternion(quaternionA);
    const localForward = eyeLocalForwards.get(eye);
    if (!localForward) return;
    const neutralForward = localForward.clone().applyQuaternion(neutralWorld).normalize();
    const desiredForward = worldTarget.clone().sub(eyePosition).normalize();
    const turn = quaternionB.setFromUnitVectors(neutralForward, desiredForward);
    const angle = 2 * Math.acos(THREE.MathUtils.clamp(turn.w, -1, 1));
    if (angle > CONFIG.eyeLimit) turn.slerp(new THREE.Quaternion(), 1 - CONFIG.eyeLimit / angle);
    const desiredWorld = turn.multiply(neutralWorld);
    eye.quaternion.copy(eye.parent.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(desiredWorld));
  });
}

function animateMouth(delta) {
  speech.energy = Math.max(0, speech.energy - delta * 5.2);
  mouthOpenTarget = speech.active ? Math.max(0.055, speech.energy * CONFIG.mouthIntensity) : 0;
  mouthOpenAmount = THREE.MathUtils.damp(mouthOpenAmount, mouthOpenTarget, mouthOpenTarget > mouthOpenAmount ? CONFIG.mouthAttack : CONFIG.mouthRelease, delta);
  if (jawBone && jawBaseQuaternion) jawBone.quaternion.copy(jawBaseQuaternion).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), mouthOpenAmount));
  mouthMorphs.forEach(({ object, index }) => { object.morphTargetInfluences[index] = mouthOpenAmount; });
}

function stopSpeech() {
  speech = { active: false, energy: 0, lastBoundary: 0 };
  mouthOpenTarget = 0;
}

function animate() {
  requestAnimationFrame(animate);
  const delta = Math.min(clock.getDelta(), 0.05);
  if (rig?.userData.controls) {
    const { eyes, head, neck } = rig.userData.controls;
    currentLook.lerp(targetLook, CONFIG.eyeSmoothing);
    currentHeadLook.lerp(targetLook, CONFIG.headSmoothing);
    if (head && headBaseQuaternion) head.quaternion.copy(headBaseQuaternion).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), currentHeadLook.x * CONFIG.headSensitivity.x)).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), -currentHeadLook.y * CONFIG.headSensitivity.y));
    if (neck && neckBaseQuaternion) neck.quaternion.copy(neckBaseQuaternion).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), currentHeadLook.x * CONFIG.neckSensitivity.x)).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), -currentHeadLook.y * CONFIG.neckSensitivity.y));
    character.updateMatrixWorld(true);
    applyEyeTracking(eyes);
    animateMouth(delta);
  }
  renderer.render(scene, camera);
}

function onSpeechBoundary(event) {
  const now = performance.now();
  const gap = Math.min((now - speech.lastBoundary) / 1000, 0.3);
  speech.lastBoundary = now;
  const char = event.charIndex === undefined ? '' : event.utterance.text[event.charIndex] || '';
  const vowel = /[aeiouáàâãéêíóôõúü]/i.test(char);
  speech.energy = THREE.MathUtils.clamp((vowel ? 1 : 0.55) * (0.72 + gap * 0.9), 0.25, 1);
}

function speak(text) {
  const cleanText = text.trim();
  if (!cleanText) return;
  window.speechSynthesis.cancel();
  stopSpeech();
  const utterance = new SpeechSynthesisUtterance(cleanText);
  speech = { active: true, energy: 0.3, lastBoundary: performance.now() };
  utterance.onstart = () => { speech.active = true; };
  utterance.onboundary = onSpeechBoundary;
  utterance.onend = stopSpeech;
  utterance.onerror = stopSpeech;
  window.speechSynthesis.speak(utterance);
}

form.addEventListener('submit', (event) => { event.preventDefault(); speak(input.value); input.focus(); });
viewport.addEventListener('pointermove', updatePointer);
window.addEventListener('resize', () => {
  if (!camera || !renderer) return;
  camera.aspect = viewport.clientWidth / viewport.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(viewport.clientWidth, viewport.clientHeight);
});

async function load() {
  setupScene();
  try { await setSkin('endo'); animate(); }
  catch (loadError) {
    loading.remove();
    errorBox.hidden = false;
    errorBox.textContent = `Could not load S-800-bust.glb. Serve this folder over HTTP. Details: ${loadError.message}`;
    console.error(loadError);
  }
}

load();
