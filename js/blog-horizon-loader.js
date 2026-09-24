(function () {
  'use strict';

  function prefersLightExperience() {
    var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var touchDevice = window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches;
    var narrowScreen = window.matchMedia && window.matchMedia('(max-width: 760px)').matches;
    var lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 2;
    var lowCpu = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 2;
    var saveData = connection && (connection.saveData || /^(slow-2g|2g|3g)$/.test(connection.effectiveType || ''));
    return reducedMotion || touchDevice || narrowScreen || lowMemory || lowCpu || saveData;
  }

  function loadScript(source) {
    return new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = source;
      script.async = false;
      script.onload = resolve;
      script.onerror = function () { reject(new Error('Unable to load ' + source)); };
      document.head.appendChild(script);
    });
  }

  var dependencies = [
    '/js/vendor/three/three.min.js',
    '/js/vendor/three/shaders/CopyShader.js',
    '/js/vendor/three/shaders/LuminosityHighPassShader.js',
    '/js/vendor/three/postprocessing/Pass.js',
    '/js/vendor/three/postprocessing/ShaderPass.js',
    '/js/vendor/three/postprocessing/MaskPass.js',
    '/js/vendor/three/postprocessing/EffectComposer.js',
    '/js/vendor/three/postprocessing/UnrealBloomPass.js',
    '/js/vendor/gsap/ScrollTrigger.min.js'
  ];

  if (prefersLightExperience() || !window.WebGLRenderingContext) {
    window.PkLavcBlogHorizonReady = Promise.resolve(false);
    return;
  }

  var startLoading = function () {
    return dependencies.reduce(function (chain, source) {
      return chain.then(function () { return loadScript(source); });
    }, Promise.resolve()).then(function () { return true; }).catch(function () { return false; });
  };

  window.PkLavcBlogHorizonReady = new Promise(function (resolve) {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(function () { startLoading().then(resolve); }, { timeout: 1200 });
    } else {
      window.setTimeout(function () { startLoading().then(resolve); }, 160);
    }
  });
}());
