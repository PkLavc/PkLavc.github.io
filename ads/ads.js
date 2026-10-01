(function () {
  'use strict';

  function detectPageContext(pathname) {
    var path = String(pathname || '/').replace(/\/index\.html$/i, '/');
    var blog = /^\/blog\/(?:(en|pt|es)\/)?([^/]+)\/?$/.exec(path);
    if (blog && blog[2] && blog[2] !== 'index.html') return { type: 'blog', locale: blog[1] || 'en' };
    var legacyBlog = /^\/(pt|es)\/blog\/([^/]+)\/?$/.exec(path);
    if (legacyBlog && legacyBlog[2]) return { type: 'blog', locale: legacyBlog[1] };
    var store = /^\/store(?:\/(pt|es))?\/?$/.exec(path);
    if (store) return { type: 'store', locale: store[1] || 'en' };
    if (/^\/projects(?:\/|$)/.test(path)) return { type: 'project', locale: 'en' };
    if (/^\/pt\/projetos(?:\/|$)/.test(path)) return { type: 'project', locale: 'pt' };
    if (/^\/es\/proyectos(?:\/|$)/.test(path)) return { type: 'project', locale: 'es' };
    return null;
  }

  var pageContext = detectPageContext(window.location.pathname);
  if (!pageContext) return;

  var config = window.PKLAVC_BLOG_ADS;
  if (!config || !config.placements || !config.campaigns) return;

  var locale = pageContext.locale;
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
    var everyRows = localized && own(localized, 'everyRows') ? localized.everyRows : rule.everyRows;
    return { ids: ids, rotateEverySeconds: Number(seconds) || 0, everyRows: Math.max(1, Number(everyRows) || 10) };
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
    var fallbackPlacements = {
      'project-sidebar': 'sidebar',
      'project-bottom': 'bottom',
      'store-sidebar': 'sidebar',
      'store-rows': 'inline',
      'store-bottom': 'bottom'
    };
    var copy = creative && (creative[placement] || creative[fallbackPlacements[placement]]);
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

  function rotatePlacement(item, placement, geo) {
    if (!item) return;
    rotateImages(item.ad, item.selection.ids, item.selection.rotateEverySeconds, placement, geo);
  }

  function placeBlogAds(geo) {
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

    rotatePlacement(side, 'sidebar', geo);
    rotatePlacement(inline, 'inline', geo);
    rotatePlacement(bottom, 'bottom', geo);
    rotatePlacement(mobile, 'mobile', geo);
    article.dataset.blogAdsReady = 'true';
  }

  function projectContentAnchor() {
    return document.querySelector('.full-readme-container, .blog-columns, .project-visual-container, .project-hero, main');
  }

  function positionProjectSidebar(ad) {
    var anchor = projectContentAnchor();
    if (!anchor) return;
    function update() {
      var bounds = anchor.getBoundingClientRect();
      var available = Math.max(0, bounds.left - 18);
      var width = Math.min(250, available - 18);
      if (window.innerWidth < 1180 || width < 170) {
        ad.hidden = true;
        return;
      }
      ad.hidden = false;
      ad.style.width = Math.floor(width) + 'px';
      ad.style.left = Math.max(16, Math.floor(bounds.left - width - 18)) + 'px';
    }
    update();
    window.addEventListener('resize', update, { passive: true });
  }

  function placeProjectAds(geo) {
    var main = document.querySelector('main');
    if (!main || document.body.dataset.projectAdsReady === 'true') return;
    var side = placementAd('project-sidebar', geo);
    var bottom = placementAd('project-bottom', geo);
    var footer = document.querySelector('footer');

    if (side) {
      document.body.appendChild(side.ad);
      positionProjectSidebar(side.ad);
      rotatePlacement(side, 'project-sidebar', geo);
    }
    if (bottom) {
      if (footer) footer.insertAdjacentElement('beforebegin', bottom.ad);
      else main.insertAdjacentElement('afterend', bottom.ad);
      rotatePlacement(bottom, 'project-bottom', geo);
    }
    document.body.dataset.projectAdsReady = 'true';
  }

  function ensureStoreSidebarColumn(aside) {
    if (!aside) return null;
    if (aside.parentElement && aside.parentElement.classList.contains('store-sidebar-column')) return aside.parentElement;
    var column = document.createElement('div');
    column.className = 'store-sidebar-column';
    aside.parentNode.insertBefore(column, aside);
    column.appendChild(aside);
    return column;
  }

  function actualStoreColumns(grid) {
    var template = window.getComputedStyle ? getComputedStyle(grid).gridTemplateColumns : '';
    var columns = template && template !== 'none' ? template.trim().split(/\s+/).length : 0;
    return columns > 0 ? columns : Math.max(1, Number(grid.dataset.columns) || 3);
  }

  function placeStoreAds(geo) {
    var grid = document.querySelector('[data-store-grid]');
    var filters = document.querySelector('.filter-sidebar');
    var footer = document.querySelector('.store-footer, footer');
    if (!grid || document.body.dataset.storeAdsReady === 'true') return;

    var side = placementAd('store-sidebar', geo);
    var bottom = placementAd('store-bottom', geo);
    var column = ensureStoreSidebarColumn(filters);

    if (side && column) {
      column.appendChild(side.ad);
      rotatePlacement(side, 'store-sidebar', geo);
    }
    if (bottom) {
      if (footer) footer.insertAdjacentElement('beforebegin', bottom.ad);
      else grid.closest('main').insertAdjacentElement('afterend', bottom.ad);
      rotatePlacement(bottom, 'store-bottom', geo);
    }

    var refreshTimer = 0;
    function refreshRowAds() {
      refreshTimer = 0;
      grid.querySelectorAll('.pklavc-ad--store-rows').forEach(function (ad) { ad.remove(); });
      var selection = placementSelection('store-rows', geo);
      if (!selection || !selection.ids.length) return;

      var visibleCards = Array.prototype.filter.call(grid.querySelectorAll('.store-card'), function (card) {
        return !card.classList.contains('is-filtered-out') && !card.hidden;
      });
      var columns = actualStoreColumns(grid);
      var interval = Math.max(1, selection.everyRows * columns);

      for (var index = interval; index < visibleCards.length; index += interval) {
        var rowAd = placementAd('store-rows', geo);
        if (!rowAd) continue;
        visibleCards[index - 1].insertAdjacentElement('afterend', rowAd.ad);
        rotatePlacement(rowAd, 'store-rows', geo);
      }
    }

    function scheduleRowAds() {
      if (refreshTimer) clearTimeout(refreshTimer);
      refreshTimer = setTimeout(refreshRowAds, 0);
    }

    ['input', 'change', 'click'].forEach(function (eventName) {
      document.addEventListener(eventName, function (event) {
        var target = event.target;
        if (!target || !target.closest) return;
        if (target.closest('[data-store-search], [data-currency], [data-min-price], [data-max-price], [data-filter-key], [data-in-stock], [data-clear-filters], [data-sort], [data-columns]')) {
          scheduleRowAds();
        }
      });
    });
    window.addEventListener('resize', scheduleRowAds, { passive: true });
    refreshRowAds();
    document.body.dataset.storeAdsReady = 'true';
  }

  function init() {
    window.PKLAVC_BLOG_ADS_READY = getGeo().then(function (geo) {
      if (pageContext.type === 'blog') placeBlogAds(geo);
      if (pageContext.type === 'project') placeProjectAds(geo);
      if (pageContext.type === 'store') placeStoreAds(geo);
      return geo;
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
}());
