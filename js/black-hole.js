import { createRenderer } from '/js/black-hole-utils/renderer.js?v=20260909d';

const renderers = [];

function smoothstep(edge0, edge1, value) {
  const amount = Math.max(0, Math.min(1, (value - edge0) / (edge1 - edge0)));
  return amount * amount * (3 - 2 * amount);
}

async function drawLocalFallback(canvas) {
  const image = new Image();
  image.src = '/images/effects/black-hole-fallback.png';
  await image.decode();
  const width = Math.max(1, Math.round(canvas.clientWidth * Math.min(window.devicePixelRatio || 1, 1.6)));
  const height = Math.max(1, Math.round(canvas.clientHeight * Math.min(window.devicePixelRatio || 1, 1.6)));
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) return;
  context.clearRect(0, 0, width, height);
  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
  const pixels = context.getImageData(0, 0, width, height);
  for (let index = 0; index < pixels.data.length; index += 4) {
    const pixel = index / 4;
    const x = pixel % width;
    const y = Math.floor(pixel / width);
    const centeredX = x / width - 0.5;
    const centeredY = y / height - 0.5;
    const coreDistance = Math.hypot(centeredX, centeredY * 0.50);
    const coreAlpha = 1 - smoothstep(0.086, 0.092, coreDistance);
    const visibleLight = smoothstep(0.16, 0.28, Math.max(pixels.data[index], pixels.data[index + 1], pixels.data[index + 2]) / 255);
    const outsideRed = 23 * (1 - visibleLight) + Math.max(23, pixels.data[index]) * visibleLight;
    const outsideGreen = 23 * (1 - visibleLight) + Math.max(23, pixels.data[index + 1]) * visibleLight;
    const outsideBlue = 23 * (1 - visibleLight) + Math.max(23, pixels.data[index + 2]) * visibleLight;
    pixels.data[index] = Math.round(outsideRed * (1 - coreAlpha) + pixels.data[index] * coreAlpha);
    pixels.data[index + 1] = Math.round(outsideGreen * (1 - coreAlpha) + pixels.data[index + 1] * coreAlpha);
    pixels.data[index + 2] = Math.round(outsideBlue * (1 - coreAlpha) + pixels.data[index + 2] * coreAlpha);
    pixels.data[index + 3] = 255;
  }
  context.putImageData(pixels, 0, 0);
  canvas.classList.add('is-ready');
}

document.querySelectorAll('[data-black-hole-canvas]').forEach(canvas => {
  const renderer = createRenderer({ canvas });
  renderers.push(renderer);
  renderer.ready.then(() => {
    canvas.classList.add('is-ready');
  }).catch(error => {
    canvas.classList.add('uses-fallback');
    canvas.dataset.blackHoleError = error && error.message ? error.message : 'Black hole renderer failed';
    drawLocalFallback(canvas).catch(() => {});
  });
});

window.addEventListener('pagehide', () => {
  renderers.forEach(renderer => renderer.dispose());
}, { once: true });
