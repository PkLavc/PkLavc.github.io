(function () {
  'use strict';

  // Articles rendered from the private blog do not all load /js/index.js.
  // Give them the same existing ad placements, without duplicating the
  // site's campaign configuration or loading advertising on blog landings.
  if (!document.querySelector('.blog-shell .blog-columns .blog-article')) return;

  if (!document.getElementById('pklavc-ads-style')) {
    var style = document.createElement('link');
    style.id = 'pklavc-ads-style';
    style.rel = 'stylesheet';
    style.href = '/ads/ads.css';
    document.head.appendChild(style);
  }

  function loadAds() {
    if (document.getElementById('pklavc-ads-runtime')) return;
    var runtime = document.createElement('script');
    runtime.id = 'pklavc-ads-runtime';
    runtime.src = '/ads/ads.js';
    runtime.async = true;
    document.head.appendChild(runtime);
  }

  if (window.PKLAVC_BLOG_ADS) {
    loadAds();
    return;
  }
  var config = document.getElementById('pklavc-ads-config');
  if (config) {
    config.addEventListener('load', loadAds, { once: true });
    return;
  }
  config = document.createElement('script');
  config.id = 'pklavc-ads-config';
  config.src = '/ads/config.js';
  config.async = true;
  config.addEventListener('load', loadAds, { once: true });
  document.head.appendChild(config);
}());
