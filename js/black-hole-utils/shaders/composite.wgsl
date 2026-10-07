@group(0) @binding(0) var scene: texture_2d<f32>;
@group(0) @binding(1) var bloom: texture_2d<f32>;
@group(0) @binding(2) var samp: sampler;

fn aces(x: vec3f) -> vec3f {
  let a = 2.51;
  let b = 0.03;
  let c = 2.43;
  let d = 0.59;
  let e = 0.14;
  return clamp((x * (a * x + vec3f(b))) / (x * (c * x + vec3f(d)) + vec3f(e)), vec3f(0.0), vec3f(1.0));
}

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let hdrScene = textureSampleLevel(scene, samp, uv, 0.0).rgb;
  let hdrBloom = textureSampleLevel(bloom, samp, uv, 0.0).rgb;
  var color = hdrScene + hdrBloom * 0.9;

  color *= 1.15;
  color = aces(color);

  // Subtle cinematic vignette.
  let centered = uv - vec2f(0.5);
  let vignette = 1.0 - smoothstep(0.55, 1.15, length(centered) * 1.6);
  color *= mix(0.72, 1.0, vignette);

  color = pow(color, vec3f(1.0 / 2.2));
  // Preserve black only inside the event horizon. Every channel outside it is
  // clamped to the exact page background so stars and the disk cannot create
  // black halos against the page.
  let coreDistance = length(vec2f(centered.x, centered.y * 0.50));
  let coreAlpha = 1.0 - smoothstep(0.086, 0.092, coreDistance);
  let pageBackground = vec3f(0.090196, 0.090196, 0.090196);
  let brightness = max(color.r, max(color.g, color.b));
  let visibleLight = smoothstep(0.16, 0.28, brightness);
  let haloFreeColor = mix(pageBackground, max(color, pageBackground), visibleLight);
  return vec4f(mix(haloFreeColor, color, coreAlpha), 1.0);
}
