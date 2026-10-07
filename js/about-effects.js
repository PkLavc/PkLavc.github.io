(function () {
  'use strict';
  function init() {
    if (!window.PkLavcInteractiveGlobe) { return; }
    var language = (document.documentElement.lang || 'en').toLowerCase().split('-')[0];
    var labels = language === 'pt'
      ? { US: 'Estados Unidos', BR: 'Brasil', CN: 'China', SG: 'Singapura', IN: 'Índia', GB: 'Reino Unido', ES: 'Espanha', CA: 'Canadá' }
      : language === 'es'
        ? { US: 'Estados Unidos', BR: 'Brasil', CN: 'China', SG: 'Singapur', IN: 'India', GB: 'Reino Unido', ES: 'España', CA: 'Canadá' }
        : { US: 'United States', BR: 'Brazil', CN: 'China', SG: 'Singapore', IN: 'India', GB: 'United Kingdom', ES: 'Spain', CA: 'Canada' };
    document.querySelectorAll('[data-about-globe]').forEach(function (element) {
      window.PkLavcInteractiveGlobe.mount(element, {
        dotCount: 1200,
        selene: true,
        markers: [
          { code: 'US', label: labels.US, lat: 38, lng: -97, value: 7 },
          { code: 'BR', label: labels.BR, lat: -14, lng: -52, value: 7 },
          { code: 'CN', label: labels.CN, lat: 35, lng: 103, value: 6 },
          { code: 'SG', label: labels.SG, lat: 1.35, lng: 103.82, value: 6 },
          { code: 'IN', label: labels.IN, lat: 20.6, lng: 78.96, value: 6 },
          { code: 'GB', label: labels.GB, lat: 55, lng: -3, value: 6 },
          { code: 'ES', label: labels.ES, lat: 40, lng: -4, value: 6 },
          { code: 'CA', label: labels.CA, lat: 56, lng: -106, value: 6 }
        ]
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
}());
