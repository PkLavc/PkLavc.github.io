(function () {
  'use strict';

  var postRoute = /^\/(?:pt\/|es\/)?blog\/([^/]+)(?:\/index\.html|\/)?$/.exec(window.location.pathname);
  if (!postRoute || postRoute[1] === 'index.html') return;

  var config = window.PKLAVC_BLOG_ADS;
  if (!config || !config.placements || !config.campaigns) return;

  var locale = /^\/pt\/blog\//.test(location.pathname) ? 'pt' :
    /^\/es\/blog\//.test(location.pathname) ? 'es' : 'en';
  var labels = {
    en: 'Advertisement',
    pt: 'Publicidade',
    es: 'Publicidad'
  };
  var scriptLoads = {};

  function safeUrl(value) {
    if (typeof value !== 'string' || !value.trim()) return '';
    try {
      var url = new URL(value, window.location.href);
      return url.protocol === 'https:' || (url.origin === window.location.origin && url.protocol === 'http:') ? url.href : '';
    } catch (_) {
      return '';
    }
  }

  function normalizeGeo(value) {
    var country = String(value && value.country || '').toUpperCase();
    var region = String(value && value.region || '').toUpperCase();
    return {
      country: /^[A-Z]{2}$/.test(country) ? country : '',
      region: /^[A-Z0-9-]{1,24}$/.test(region) ? region : ''
    };
  }

  function getGeo() {
    var cacheKey = 'pklavc.blogAds.geo';
    try {
      var cached = JSON.parse(sessionStorage.getItem(cacheKey) || 'null');
      if (cached && Date.now() - cached.at < 30 * 60 * 1000) return Promise.resolve(normalizeGeo(cached));
    } catch (_) { /* Storage is optional. */ }

    if (!config.geoEndpoint || typeof fetch !== 'function') return Promise.resolve(normalizeGeo(null));
    var controller = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = controller && setTimeout(function () { controller.abort(); }, config.geoTimeoutMs || 1500);
    return fetch(config.geoEndpoint, {
      mode: 'cors', credentials: 'omit', cache: 'no-store',
      signal: controller ? controller.signal : undefined
    }).then(function (response) {
      if (!response.ok) throw new Error('geo_unavailable');
      return response.json();
    }).then(function (payload) {
      var geo = normalizeGeo(payload);
      try { sessionStorage.setItem(cacheKey, JSON.stringify({ country: geo.country, region: geo.region, at: Date.now() })); }
      catch (_) { /* Storage is optional. */ }
      return geo;
    }).catch(function () {
      return normalizeGeo(null);
    }).finally(function () {
      if (timer) clearTimeout(timer);
    });
  }

  function own(object, key) {
    return object && Object.prototype.hasOwnProperty.call(object, key);
  }

  function matchCampaigns(rule, geo) {
    var regionKey = geo.country && geo.region ? geo.country + '-' + geo.region : '';
    if (regionKey && own(rule.regions, regionKey)) return rule.regions[regionKey];
    if (geo.country && own(rule.countries, geo.country)) return rule.countries[geo.country];
    if (own(rule, 'default')) return rule.default;
    return undefined;
  }

  function placementSelection(placement, geo) {
    var rule = config.placements[placement];
    if (!rule || rule.enabled === false) return null;
    var localized = rule.locales && rule.locales[locale];
    if (localized === false || (localized && localized.enabled === false)) return null;
    var selected = localized && matchCampaigns(localized, geo);
    if (selected === undefined) selected = matchCampaigns(rule, geo);
    var ids = (Array.isArray(selected) ? selected : [selected]).filter(function (id, index, list) {
      return typeof id === 'string' && id.length > 0 && list.indexOf(id) === index;
    });
    var seconds = localized && own(localized, 'rotateEverySeconds') ? localized.rotateEverySeconds : rule.rotateEverySeconds;
    return { ids: ids, rotateEverySeconds: Number(seconds) || 0 };
  }

  function createShell(placement, campaign) {
    var shell = document.createElement('aside');
    shell.className = 'pklavc-ad pklavc-ad--' + placement;
    shell.dataset.adPlacement = placement;
    shell.dataset.adType = campaign.type;
    shell.setAttribute('aria-label', labels[locale]);
    var label = document.createElement('span');
    label.className = 'pklavc-ad__label';
    label.textContent = labels[locale];
    shell.appendChild(label);
    return shell;
  }

  function imageAd(campaign, placement) {
    var creative = campaign.locales && campaign.locales[locale];
    var copy = creative && creative[placement];
    if (!creative || !copy) return null;
    var imageUrl = safeUrl(creative.image);
    var destination = safeUrl(copy.href);
    if (!imageUrl || !destination) return null;

    var shell = createShell(placement, campaign);
    var link = document.createElement('a');
    link.className = 'pklavc-ad__link';
    link.href = destination;
    if (new URL(destination).origin !== window.location.origin) {
      link.target = '_blank';
      link.rel = 'sponsored noopener noreferrer';
    }
    var image = document.createElement('img');
    image.className = 'pklavc-ad__image';
    image.src = imageUrl;
    image.alt = creative.imageAlt || '';
    image.loading = 'lazy';
    image.width = 800;
    image.height = 480;
    var text = document.createElement('span');
    text.className = 'pklavc-ad__text';
    var title = document.createElement('strong');
    title.textContent = copy.title;
    var body = document.createElement('span');
    body.textContent = copy.body;
    var cta = document.createElement('span');
    cta.className = 'pklavc-ad__cta';
    cta.textContent = copy.cta + ' →';
    text.append(title, body, cta);
    link.append(image, text);
    shell.appendChild(link);
    return shell;
  }

  function whenVisible(element, callback) {
    if (!('IntersectionObserver' in window)) { callback(); return; }
    var observer = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      callback();
    }, { rootMargin: '300px' });
    observer.observe(element);
  }

  function loadScript(src) {
    if (!scriptLoads[src]) {
      scriptLoads[src] = new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.async = true;
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
    return scriptLoads[src];
  }

  function adsenseAd(campaign, placement) {
    var saved = window.PKLAVC_ADSENSE_CONFIG || {};
    var client = campaign.clientId || saved.clientId || '';
    var slot = campaign.slots && campaign.slots[placement] || saved.blogSlotId || '';
    if (!/^ca-pub-\d+$/.test(client) || !/^\d+$/.test(slot)) return null;
    var shell = createShell(placement, campaign);
    var ins = document.createElement('ins');
    ins.className = 'adsbygoogle pklavc-ad__network';
    ins.style.display = 'block';
    ins.dataset.adClient = client;
    ins.dataset.adSlot = slot;
    ins.dataset.adFormat = campaign.format || 'auto';
    ins.dataset.fullWidthResponsive = 'true';
    shell.appendChild(ins);
    whenVisible(shell, function () {
      loadScript('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + encodeURIComponent(client))
        .then(function () {
          window.adsbygoogle = window.adsbygoogle || [];
          window.adsbygoogle.push({});
        }).catch(function () { shell.remove(); });
    });
    return shell;
  }

  function iframeAd(campaign, placement) {
    var source = campaign.sources && (campaign.sources[placement] || campaign.sources.default);
    var url = safeUrl(source);
    if (!url) return null;
    var shell = createShell(placement, campaign);
    var frame = document.createElement('iframe');
    frame.className = 'pklavc-ad__network';
    frame.title = campaign.title || labels[locale];
    frame.loading = 'lazy';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    if (campaign.sandbox) frame.setAttribute('sandbox', campaign.sandbox);
    shell.appendChild(frame);
    whenVisible(shell, function () { frame.src = url; });
    return shell;
  }

  function customAd(campaign, placement, geo) {
    if (typeof campaign.render !== 'function') return null;
    var shell = createShell(placement, campaign);
    var mount = document.createElement('div');
    mount.className = 'pklavc-ad__network';
    shell.appendChild(mount);
    whenVisible(shell, function () {
      var script = safeUrl(campaign.scriptUrl);
      var ready = script ? loadScript(script) : Promise.resolve();
      ready.then(function () {
        campaign.render(mount, { placement: placement, locale: locale, geo: geo });
      }).catch(function () { shell.remove(); });
    });
    return shell;
  }

  function createAd(id, placement, geo) {
    var campaign = config.campaigns[id];
    if (!campaign) return null;
    var ad = null;
    if (campaign.type === 'image') ad = imageAd(campaign, placement);
    if (campaign.type === 'adsense') ad = adsenseAd(campaign, placement);
    if (campaign.type === 'iframe') ad = iframeAd(campaign, placement);
    if (campaign.type === 'custom') ad = customAd(campaign, placement, geo);
    if (ad) ad.dataset.adCampaign = id;
    return ad;
  }

  function preloadImage(ad) {
    return new Promise(function (resolve) {
      var nextImage = ad.querySelector('img');
      var preload = new Image();
      var timer = setTimeout(function () { finish(false); }, 8000);
      function finish(loaded) {
        clearTimeout(timer);
        preload.onload = null;
        preload.onerror = null;
        resolve(loaded);
      }
      preload.onload = function () { finish(true); };
      preload.onerror = function () { finish(false); };
      preload.src = nextImage.src;
      if (preload.complete) finish(preload.naturalWidth > 0);
    });
  }

  function rotateImages(ad, ids, seconds, placement, geo) {
    // AdSense and third-party units must not be automatically refreshed.
    if (!Number.isFinite(seconds) || seconds < 2 ||
        !ids.every(function (id) { return config.campaigns[id] && config.campaigns[id].type === 'image'; })) return;
    ids = ids.filter(function (id) {
      var creative = config.campaigns[id].locales && config.campaigns[id].locales[locale];
      var copy = creative && creative[placement];
      return creative && copy && safeUrl(creative.image) && safeUrl(copy.href);
    });
    if (ids.length < 2) return;
    var current = ad;
    var index = ids.indexOf(ad.dataset.adCampaign);
    var busy = false;
    var timer = setInterval(function () {
      if (!current.isConnected) { clearInterval(timer); return; }
      if (busy || document.hidden || current.contains(document.activeElement)) return;
      var bounds = current.getBoundingClientRect();
      if (!bounds.width || !bounds.height || bounds.bottom <= 0 || bounds.top >= window.innerHeight) return;
      var nextIndex = (index + 1) % ids.length;
      var next = createAd(ids[nextIndex], placement, geo);
      if (!next) { index = nextIndex; return; }
      busy = true;
      preloadImage(next).then(function (loaded) {
        if (loaded && current.isConnected) {
          current.replaceWith(next);
          current = next;
          index = nextIndex;
        }
      }).finally(function () { busy = false; });
    }, seconds * 1000);
  }

  function placementAd(placement, geo) {
    var selection = placementSelection(placement, geo);
    if (!selection || !selection.ids.length) return null;
    for (var i = 0; i < selection.ids.length; i += 1) {
      var ad = createAd(selection.ids[i], placement, geo);
      if (ad) return { ad: ad, selection: selection };
    }
    return null;
  }

  function placeAds(geo) {
    var article = document.querySelector('.blog-article');
    var sidebar = document.querySelector('.blog-columns > aside.blog-article-grid');
    var columns = document.querySelector('.blog-columns');
    if (!article || !columns || article.dataset.blogAdsReady === 'true') return;

    var paragraphs = article.querySelectorAll(':scope > p');
    var side = sidebar && placementAd('sidebar', geo);
    var inline = placementAd('inline', geo);
    var bottom = placementAd('bottom', geo);
    var mobile = placementAd('mobile', geo);

    if (side) {
      if (sidebar.firstElementChild) sidebar.firstElementChild.insertAdjacentElement('afterend', side.ad);
      else sidebar.appendChild(side.ad);
    }
    if (inline) {
      if (paragraphs.length) paragraphs[Math.min(4, paragraphs.length - 1)].insertAdjacentElement('afterend', inline.ad);
      else article.appendChild(inline.ad);
    }
    if (mobile) {
      if (paragraphs.length) paragraphs[Math.min(1, paragraphs.length - 1)].insertAdjacentElement('afterend', mobile.ad);
      else article.prepend(mobile.ad);
    }
    if (bottom) columns.insertAdjacentElement('afterend', bottom.ad);
    [side, inline, bottom, mobile].forEach(function (item, index) {
      if (!item) return;
      rotateImages(item.ad, item.selection.ids, item.selection.rotateEverySeconds,
        ['sidebar', 'inline', 'bottom', 'mobile'][index], geo);
    });
    article.dataset.blogAdsReady = 'true';
  }

  function init() {
    window.PKLAVC_BLOG_ADS_READY = getGeo().then(function (geo) {
      placeAds(geo);
      return geo;
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
}());
