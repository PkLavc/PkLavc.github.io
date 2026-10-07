(function () {
  'use strict';

  function prefersLightExperience() {
    var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    var lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 1;
    var saveData = connection && (connection.saveData || /^(slow-2g|2g)$/.test(connection.effectiveType || ''));
    return lowMemory || saveData;
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

  var desktopDependencies = [
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
  var mobileExperience = window.matchMedia && (
    window.matchMedia('(max-width: 760px)').matches ||
    window.matchMedia('(pointer: coarse)').matches
  );
  var dependencies = mobileExperience
    ? ['/js/vendor/three/three.min.js']
    : desktopDependencies;

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
