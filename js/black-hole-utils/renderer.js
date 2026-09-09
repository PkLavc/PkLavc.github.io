const SHADER_ROOT = '/js/black-hole-utils/shaders/';
const ASSET_VERSION = '20260909d';
const CLEAR = { r: 0, g: 0, b: 0, a: 1 };
const BLURS = [
  { direction: [1, 0], radius: 1 },
  { direction: [0, 1], radius: 1 },
  { direction: [1, 0], radius: 2.4 },
  { direction: [0, 1], radius: 2.4 }
];

const FULLSCREEN_VERTEX = `
struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
}

@vertex fn vs_main(@builtin(vertex_index) index: u32) -> VertexOutput {
  let positions = array<vec2f, 3>(
    vec2f(-1.0, -1.0),
    vec2f(3.0, -1.0),
    vec2f(-1.0, 3.0)
  );
  let position = positions[index];
  var output: VertexOutput;
  output.position = vec4f(position, 0.0, 1.0);
  output.uv = vec2f((position.x + 1.0) * 0.5, 1.0 - (position.y + 1.0) * 0.5);
  return output;
}
`;

async function loadShaders() {
  const names = ['black-hole.wgsl', 'bright-pass.wgsl', 'blur.wgsl', 'composite.wgsl'];
  const sources = await Promise.all(names.map(async name => {
    const response = await fetch(SHADER_ROOT + name + '?v=' + ASSET_VERSION, { credentials: 'same-origin', cache: 'no-cache' });
    if (!response.ok) throw new Error(`Unable to load ${name}: ${response.status}`);
    return response.text();
  }));
  return { scene: sources[0], bright: sources[1], blur: sources[2], composite: sources[3] };
}

function createPipeline(device, fragmentSource, format, label) {
  const module = device.createShaderModule({
    label: `${label} shader`,
    code: FULLSCREEN_VERTEX + '\n' + fragmentSource
  });
  return device.createRenderPipeline({
    label: `${label} pipeline`,
    layout: 'auto',
    vertex: { module, entryPoint: 'vs_main' },
    fragment: { module, entryPoint: 'fs_main', targets: [{ format }] },
    primitive: { topology: 'triangle-list' }
  });
}

function makeTexture(device, width, height, format, label) {
  return device.createTexture({
    label,
    size: { width, height, depthOrArrayLayers: 1 },
    format,
    usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING
  });
}

function installOrbitInput(canvas) {
  let yaw = 0;
  let pitch = 0.05;
  let targetYaw = 0;
  let targetPitch = 0.05;
  let activePointer;
  const previousTouchAction = canvas.style.touchAction;
  canvas.style.touchAction = 'none';

  const move = event => {
    if (!event.isPrimary || (activePointer !== undefined && event.pointerId !== activePointer)) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / Math.max(1, rect.width)));
    const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / Math.max(1, rect.height)));
    targetYaw = (0.5 - x) * Math.PI * 1.4;
    targetPitch = Math.max(-Math.PI * 0.42, Math.min(Math.PI * 0.42, (y - 0.5) * Math.PI * 0.7));
  };
  const down = event => {
    if (!event.isPrimary || activePointer !== undefined) return;
    activePointer = event.pointerId;
    canvas.setPointerCapture?.(event.pointerId);
    move(event);
  };
  const end = event => {
    if (event.pointerId !== activePointer) return;
    if (canvas.hasPointerCapture?.(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    activePointer = undefined;
  };
  canvas.addEventListener('pointerdown', down);
  canvas.addEventListener('pointermove', move);
  canvas.addEventListener('pointerup', end);
  canvas.addEventListener('pointercancel', end);

  return {
    update() {
      yaw += (targetYaw - yaw) * 0.12;
      pitch += (targetPitch - pitch) * 0.12;
      return [yaw, pitch];
    },
    dispose() {
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', end);
      canvas.removeEventListener('pointercancel', end);
      canvas.style.touchAction = previousTouchAction;
    }
  };
}

export function createRenderer({ canvas }) {
  let disposed = false;
  let device;
  let context;
  let observer;
  let animationFrame = 0;
  let resizeFrame = 0;
  let resources;
  let pipelines;
  let sceneUniform;
  let sampler;
  let input;
  let startTime = performance.now();
  let canvasFormat;

  function disposeTargets() {
    if (!resources) return;
    resources.blurUniforms.forEach(buffer => buffer.destroy());
    resources.scene.destroy();
    resources.bloomA.destroy();
    resources.bloomB.destroy();
    resources = undefined;
  }

  function createBindings(width, height) {
    disposeTargets();
    const bloomHeight = Math.min(360, height);
    const bloomWidth = Math.max(1, Math.round(bloomHeight * width / height));
    const scene = makeTexture(device, width, height, 'rgba16float', 'black hole scene');
    const bloomA = makeTexture(device, bloomWidth, bloomHeight, 'rgba16float', 'black hole bloom A');
    const bloomB = makeTexture(device, bloomWidth, bloomHeight, 'rgba16float', 'black hole bloom B');
    const sceneBindGroup = device.createBindGroup({
      layout: pipelines.scene.getBindGroupLayout(0),
      entries: [{ binding: 0, resource: { buffer: sceneUniform } }]
    });
    const brightBindGroup = device.createBindGroup({
      layout: pipelines.bright.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: scene.createView() },
        { binding: 1, resource: sampler }
      ]
    });
    const blurUniforms = BLURS.map((blur, index) => {
      const buffer = device.createBuffer({
        label: `black hole blur ${index} uniforms`,
        size: 32,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
      });
      device.queue.writeBuffer(buffer, 0, new Float32Array([
        1 / bloomWidth, 1 / bloomHeight,
        blur.direction[0], blur.direction[1],
        blur.radius, 0, 0, 0
      ]));
      return buffer;
    });
    const blurBindGroups = BLURS.map((blur, index) => device.createBindGroup({
      layout: pipelines.blur.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: (index % 2 === 0 ? bloomA : bloomB).createView() },
        { binding: 1, resource: sampler },
        { binding: 2, resource: { buffer: blurUniforms[index] } }
      ]
    }));
    const compositeBindGroup = device.createBindGroup({
      layout: pipelines.composite.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: scene.createView() },
        { binding: 1, resource: bloomA.createView() },
        { binding: 2, resource: sampler }
      ]
    });
    resources = {
      width, height, scene, bloomA, bloomB, sceneBindGroup, brightBindGroup,
      blurUniforms, blurBindGroups, compositeBindGroup
    };
  }

  function resize() {
    resizeFrame = 0;
    if (disposed || !device || !pipelines) return;
    const widthCss = canvas.clientWidth;
    const heightCss = canvas.clientHeight;
    if (widthCss <= 0 || heightCss <= 0) return;
    const dpr = Math.min(1.6, Math.max(1, window.devicePixelRatio || 1));
    const width = Math.max(1, Math.round(widthCss * dpr));
    const height = Math.max(1, Math.round(heightCss * dpr));
    if (resources && resources.width === width && resources.height === height) return;
    canvas.width = width;
    canvas.height = height;
    createBindings(width, height);
  }

  function requestResize() {
    if (!resizeFrame) resizeFrame = requestAnimationFrame(resize);
  }

  function drawPass(encoder, targetView, pipeline, bindGroup) {
    const pass = encoder.beginRenderPass({
      colorAttachments: [{ view: targetView, clearValue: CLEAR, loadOp: 'clear', storeOp: 'store' }]
    });
    pass.setPipeline(pipeline);
    pass.setBindGroup(0, bindGroup);
    pass.draw(3);
    pass.end();
  }

  function render(now) {
    if (disposed || !resources) return;
    const orbit = input.update();
    device.queue.writeBuffer(sceneUniform, 0, new Float32Array([
      resources.width, resources.height, orbit[0], orbit[1], (now - startTime) / 1000, 0, 0, 0
    ]));
    const encoder = device.createCommandEncoder({ label: 'black hole frame' });
    drawPass(encoder, resources.scene.createView(), pipelines.scene, resources.sceneBindGroup);
    drawPass(encoder, resources.bloomA.createView(), pipelines.bright, resources.brightBindGroup);
    BLURS.forEach((blur, index) => {
      const destination = index % 2 === 0 ? resources.bloomB : resources.bloomA;
      drawPass(encoder, destination.createView(), pipelines.blur, resources.blurBindGroups[index]);
    });
    drawPass(encoder, context.getCurrentTexture().createView(), pipelines.composite, resources.compositeBindGroup);
    device.queue.submit([encoder.finish()]);
    animationFrame = requestAnimationFrame(render);
  }

  async function initialize() {
    if (!navigator.gpu) throw new Error('WebGPU is unavailable');
    const [shaderSources, adapter] = await Promise.all([loadShaders(), navigator.gpu.requestAdapter()]);
    if (!adapter) throw new Error('No WebGPU adapter was found');
    device = await adapter.requestDevice();
    if (disposed) { device.destroy(); return; }
    context = canvas.getContext('webgpu');
    if (!context) throw new Error('WebGPU canvas context is unavailable');
    canvasFormat = navigator.gpu.getPreferredCanvasFormat();
    context.configure({ device, format: canvasFormat, alphaMode: 'premultiplied' });
    sceneUniform = device.createBuffer({
      label: 'black hole scene uniforms',
      size: 32,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });
    sampler = device.createSampler({ minFilter: 'linear', magFilter: 'linear' });
    pipelines = {
      scene: createPipeline(device, shaderSources.scene, 'rgba16float', 'black hole scene'),
      bright: createPipeline(device, shaderSources.bright, 'rgba16float', 'black hole bright pass'),
      blur: createPipeline(device, shaderSources.blur, 'rgba16float', 'black hole blur'),
      composite: createPipeline(device, shaderSources.composite, canvasFormat, 'black hole composite')
    };
    input = installOrbitInput(canvas);
    observer = typeof ResizeObserver === 'function' ? new ResizeObserver(requestResize) : undefined;
    observer?.observe(canvas);
    resize();
    startTime = performance.now();
    animationFrame = requestAnimationFrame(render);
  }

  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(animationFrame);
    cancelAnimationFrame(resizeFrame);
    observer?.disconnect();
    input?.dispose();
    disposeTargets();
    sceneUniform?.destroy();
    context?.unconfigure();
    device?.destroy();
  }

  const ready = initialize().catch(error => {
    dispose();
    throw error;
  });
  return { ready, resize: requestResize, dispose };
}
