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

  if (prefersLightExperience() || !window.WebGLRenderingContext) {
    window.PkLavcBlogHorizonReady = Promise.resolve(false);
    return;
  }

  // Three.js is the only library this scene actually needs. The previous loader
  // waited for seven unused post-processing scripts before the first terrain frame.
  window.PkLavcBlogHorizonReady = loadScript('/blog/assets/js/vendor/three/three.min.js?v=9274bbcec8')
    .then(function () { return true; })
    .catch(function () { return false; });
}());
