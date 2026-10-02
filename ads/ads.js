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
      if (typeof id !== 'string' || !id.length || list.indexOf(id) !== index) return false;
      if (pageContext.type === 'blog' && id === 'pklavc_blog') return false;
      if (pageContext.type === 'store' && id === 'pklavc_store') return false;
      return true;
    });
    var seconds = localized && own(localized, 'rotateEverySeconds') ? localized.rotateEverySeconds : rule.rotateEverySeconds;
    var everyRows = localized && own(localized, 'everyRows') ? localized.everyRows : rule.everyRows;
    return { ids: ids, rotateEverySeconds: Number(seconds) || 0, everyRows: Math.max(1, Number(everyRows) || 10) };
  }

  function createShell(placement, campaign) {
    var shell = document.createElement('aside');
    shell.className = 'pklavc-ad pklavc-ad--' + placement;
    if (campaign.style) {
      shell.classList.add('pklavc-ad--style-' + String(campaign.style).replace(/[^a-z0-9_-]/gi, '').toLowerCase());
    }
    shell.dataset.adPlacement = placement;
    shell.dataset.adType = campaign.type;
    shell.setAttribute('aria-label', labels[locale]);
    var label = document.createElement('span');
    label.className = 'pklavc-ad__label';
    label.textContent = labels[locale];
    shell.appendChild(label);
    return shell;
  }

  function primeVideoAd(campaign, placement, creative, copy, destination) {
    var shell = createShell(placement, campaign);
    var link = document.createElement('a');
    link.className = 'pklavc-ad__link pklavc-prime';
    link.href = destination;
    if (new URL(destination).origin !== window.location.origin) {
      link.target = '_blank';
      link.rel = 'sponsored noopener noreferrer';
    }

    var words = {
      en: {
        offerTop: '30 DAYS',
        offerBottom: 'FREE',
        eligible: 'For eligible new subscribers',
        terms: 'Terms apply.',
        movies: 'MOVIES',
        series: 'SERIES',
        originals: 'ORIGINALS'
      },
      pt: {
        offerTop: '30 DIAS',
        offerBottom: 'GRÁTIS',
        eligible: 'Para novos assinantes elegíveis',
        terms: 'Termos se aplicam.',
        movies: 'FILMES',
        series: 'SÉRIES',
        originals: 'ORIGINAIS'
      },
      es: {
        offerTop: '30 DÍAS',
        offerBottom: 'GRATIS',
        eligible: 'Para nuevos suscriptores elegibles',
        terms: 'Se aplican términos.',
        movies: 'PELÍCULAS',
        series: 'SERIES',
        originals: 'ORIGINALES'
      }
    }[locale] || null;

    if (!words) return null;

    var creativeRoot = document.createElement('span');
    creativeRoot.className = 'pklavc-prime__creative';
    creativeRoot.innerHTML =
      '<span class="pklavc-prime__copy">' +
        '<span class="pklavc-prime__logo" aria-label="Prime Video">' +
          '<span class="pklavc-prime__logo-prime">prime</span> <span class="pklavc-prime__logo-video">video</span>' +
          '<span class="pklavc-prime__smile" aria-hidden="true"></span>' +
        '</span>' +
        '<span class="pklavc-prime__headline"><b>' + words.offerTop + '</b><strong>' + words.offerBottom + '</strong></span>' +
        '<span class="pklavc-prime__service">Prime Video</span>' +
        '<span class="pklavc-prime__eligible">' + words.eligible + '</span>' +
        '<span class="pklavc-prime__cta"><span class="pklavc-prime__cta-play" aria-hidden="true">▶</span>' + copy.cta + '<span aria-hidden="true">›</span></span>' +
        '<span class="pklavc-prime__terms">' + words.terms + '</span>' +
      '</span>' +
      '<span class="pklavc-prime__visual" aria-hidden="true">' +
        '<span class="pklavc-prime__arc pklavc-prime__arc--one"></span>' +
        '<span class="pklavc-prime__arc pklavc-prime__arc--two"></span>' +
        '<span class="pklavc-prime__screen">' +
          '<span class="pklavc-prime__tile pklavc-prime__tile--1"><i></i><b>' + words.movies + '</b></span>' +
          '<span class="pklavc-prime__tile pklavc-prime__tile--2"><i></i><b>' + words.series + '</b></span>' +
          '<span class="pklavc-prime__tile pklavc-prime__tile--3"><i></i><b>' + words.originals + '</b></span>' +
          '<span class="pklavc-prime__tile pklavc-prime__tile--4"><i></i></span>' +
          '<span class="pklavc-prime__play">▶</span>' +
        '</span>' +
        '<span class="pklavc-prime__popcorn">' +
          '<i></i><i></i><i></i><i></i><i></i><i></i>' +
        '</span>' +
        '<span class="pklavc-prime__remote"><i></i><i></i><i></i><i></i></span>' +
      '</span>';

    link.appendChild(creativeRoot);
    shell.appendChild(link);
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
    var destination = safeUrl(copy.href);
    if (!destination) return null;

    if (campaign.style === 'prime-video') {
      return primeVideoAd(campaign, placement, creative, copy, destination);
    }

    var imageUrl = safeUrl(creative.image);
    if (!imageUrl) return null;

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
    image.loading = campaign.style === 'macca' ? 'eager' : 'lazy';
    image.decoding = 'async';
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
      var campaign = config.campaigns[id];
      var creative = campaign.locales && campaign.locales[locale];
      var fallbackPlacements = {
        'store-sidebar': 'sidebar',
        'store-rows': 'inline',
        'store-bottom': 'bottom'
      };
      var copy = creative && (creative[placement] || creative[fallbackPlacements[placement]]);
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

  function placementAd(placement, geo, startIndex) {
    var selection = placementSelection(placement, geo);
    if (!selection || !selection.ids.length) return null;
    var offset = Math.max(0, Number(startIndex) || 0) % selection.ids.length;
    for (var i = 0; i < selection.ids.length; i += 1) {
      var campaignId = selection.ids[(offset + i) % selection.ids.length];
      var ad = createAd(campaignId, placement, geo);
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
    var mainColumn = sidebar && sidebar.previousElementSibling;
    if (!article || !columns || article.dataset.blogAdsReady === 'true') return;

    var paragraphs = article.querySelectorAll(':scope > p, :scope > section > p');
    var inline = placementAd('inline', geo, 0);
    var bottom = placementAd('bottom', geo, 1);
    var mobile = placementAd('mobile', geo, 2);

    if (inline) {
      if (paragraphs.length) paragraphs[Math.min(4, paragraphs.length - 1)].insertAdjacentElement('afterend', inline.ad);
      else article.appendChild(inline.ad);
    }
    if (mobile) {
      if (paragraphs.length) paragraphs[Math.min(1, paragraphs.length - 1)].insertAdjacentElement('afterend', mobile.ad);
      else article.prepend(mobile.ad);
    }
    if (bottom) columns.insertAdjacentElement('afterend', bottom.ad);

    rotatePlacement(inline, 'inline', geo);
    rotatePlacement(bottom, 'bottom', geo);
    rotatePlacement(mobile, 'mobile', geo);

    var sidebarTimer = 0;
    var sidebarAds = null;

    if (sidebar) {
      sidebar.querySelectorAll('.pklavc-ad--sidebar, .blog-sidebar-ads').forEach(function (node) { node.remove(); });
      sidebarAds = document.createElement('div');
      sidebarAds.className = 'blog-sidebar-ads';
      sidebar.appendChild(sidebarAds);
    }

    function refreshSidebarAds() {
      sidebarTimer = 0;
      if (!sidebar || !sidebarAds || !mainColumn) return;

      var cards = Array.prototype.filter.call(sidebar.children, function (child) {
        return child !== sidebarAds && child.classList && child.classList.contains('blog-sidebar-card');
      });
      var cardsHeight = cards.reduce(function (sum, card) {
        return sum + card.getBoundingClientRect().height;
      }, 0);
      var gaps = Math.max(0, cards.length - 1) * 18;
      var mainHeight = Math.max(mainColumn.scrollHeight, mainColumn.getBoundingClientRect().height);
      var available = Math.max(0, Math.floor(mainHeight - cardsHeight - gaps - 18));
      var gap = 12;

      sidebarAds.replaceChildren();
      var used = 0;
      var slot = 0;
      var sidebarSelection = placementSelection('sidebar', geo);
      var sidebarCampaigns = sidebarSelection ? sidebarSelection.ids : [];

      // A sidebar rail shows each campaign at most once. Page/inline placements
      // may still use the same campaign independently.
      while (slot < sidebarCampaigns.length && used < available) {
        var sideAd = createAd(sidebarCampaigns[slot], 'sidebar', geo);
        slot += 1;
        if (!sideAd) continue;

        sidebarAds.appendChild(sideAd);
        var height = Math.ceil(sideAd.getBoundingClientRect().height || 160);
        var nextUsed = used + (used ? gap : 0) + height;

        if (used && nextUsed > available) {
          sideAd.remove();
          break;
        }

        used = nextUsed;
      }
    }

    function scheduleSidebarAds() {
      if (sidebarTimer) clearTimeout(sidebarTimer);
      sidebarTimer = setTimeout(refreshSidebarAds, 70);
    }

    if (sidebarAds) {
      refreshSidebarAds();
      requestAnimationFrame(refreshSidebarAds);
      setTimeout(refreshSidebarAds, 350);
      window.addEventListener('resize', scheduleSidebarAds, { passive: true });
      window.addEventListener('load', scheduleSidebarAds, { once: true });
      if ('ResizeObserver' in window) {
        var blogSidebarObserver = new ResizeObserver(scheduleSidebarAds);
        blogSidebarObserver.observe(mainColumn);
        sidebar.querySelectorAll('.blog-sidebar-card').forEach(function (card) {
          blogSidebarObserver.observe(card);
        });
      }
    }

    article.dataset.blogAdsReady = 'true';
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
    var results = grid && grid.closest('.store-results');
    if (!grid || !results || document.body.dataset.storeAdsReady === 'true') return;

    var column = ensureStoreSidebarColumn(filters);
    var sidebarAds = null;
    if (column) {
      sidebarAds = document.createElement('div');
      sidebarAds.className = 'store-sidebar-ads';
      column.appendChild(sidebarAds);
    }

    // Bottom advertising belongs to the results column, not the whole page.
    var bottom = placementAd('store-bottom', geo, 2);
    if (bottom) {
      results.appendChild(bottom.ad);
      results.classList.add('store-results--has-bottom-ad');
      rotatePlacement(bottom, 'store-bottom', geo);
    }

    var sidebarTimer = 0;
    function refreshSidebarAds() {
      sidebarTimer = 0;
      if (!sidebarAds || !column || !filters || !results) return;

      // On mobile the Store uses only row ads (every 10 rows) and the final ad.
      if (window.matchMedia && window.matchMedia('(max-width: 760px)').matches) {
        sidebarAds.replaceChildren();
        sidebarAds.style.top = '';
        return;
      }

      var columnHeight = Math.max(column.getBoundingClientRect().height, results.getBoundingClientRect().height);
      var filtersHeight = Math.ceil(filters.getBoundingClientRect().height);
      var gap = 12;
      var top = filtersHeight + gap;
      var available = Math.max(0, Math.floor(columnHeight - top));

      sidebarAds.style.top = top + 'px';
      sidebarAds.replaceChildren();

      var used = 0;
      var slot = 0;
      var sidebarSelection = placementSelection('store-sidebar', geo);
      var sidebarCampaigns = sidebarSelection ? sidebarSelection.ids : [];

      // Keep the Store rail unique as well: no campaign is repeated inside
      // the same sidebar, regardless of the available vertical space.
      while (slot < sidebarCampaigns.length && used < available) {
        var sideAd = createAd(sidebarCampaigns[slot], 'store-sidebar', geo);
        slot += 1;
        if (!sideAd) continue;

        sidebarAds.appendChild(sideAd);
        var height = Math.ceil(sideAd.getBoundingClientRect().height || 160);
        var nextUsed = used + (used ? gap : 0) + height;

        if (used && nextUsed > available) {
          sideAd.remove();
          break;
        }

        used = nextUsed;
      }
    }

    var rowTimer = 0;
    function refreshRowAds() {
      rowTimer = 0;
      grid.querySelectorAll('.pklavc-ad--store-rows').forEach(function (ad) { ad.remove(); });
      var selection = placementSelection('store-rows', geo);
      if (!selection || !selection.ids.length) {
        refreshSidebarAds();
        return;
      }

      var visibleCards = Array.prototype.filter.call(grid.querySelectorAll('.store-card'), function (card) {
        return !card.classList.contains('is-filtered-out') && !card.hidden;
      });
      var columns = actualStoreColumns(grid);
      var interval = Math.max(1, selection.everyRows * columns);
      var adIndex = 0;

      for (var index = interval; index < visibleCards.length; index += interval) {
        var rowAd = placementAd('store-rows', geo, adIndex++);
        if (!rowAd) continue;
        visibleCards[index - 1].insertAdjacentElement('afterend', rowAd.ad);
        rotatePlacement(rowAd, 'store-rows', geo);
      }

      requestAnimationFrame(refreshSidebarAds);
    }

    function scheduleStoreAds() {
      if (rowTimer) clearTimeout(rowTimer);
      if (sidebarTimer) clearTimeout(sidebarTimer);
      rowTimer = setTimeout(refreshRowAds, 30);
      sidebarTimer = setTimeout(refreshSidebarAds, 80);
    }

    ['input', 'change', 'click'].forEach(function (eventName) {
      document.addEventListener(eventName, function (event) {
        var target = event.target;
        if (!target || !target.closest) return;
        if (target.closest('[data-store-search], [data-currency], [data-min-price], [data-max-price], [data-filter-key], [data-in-stock], [data-clear-filters], [data-sort], [data-columns]')) {
          scheduleStoreAds();
        }
      });
    });

    document.addEventListener('store:products-rendered', scheduleStoreAds);
    window.addEventListener('resize', scheduleStoreAds, { passive: true });
    window.addEventListener('load', scheduleStoreAds, { once: true });

    if ('ResizeObserver' in window) {
      var resizeObserver = new ResizeObserver(scheduleStoreAds);
      resizeObserver.observe(results);
      if (filters) resizeObserver.observe(filters);
    }

    refreshRowAds();
    requestAnimationFrame(refreshSidebarAds);
    setTimeout(refreshSidebarAds, 350);
    document.body.dataset.storeAdsReady = 'true';
  }

  function init() {
    window.PKLAVC_BLOG_ADS_READY = getGeo().then(function (geo) {
      if (pageContext.type === 'blog') placeBlogAds(geo);
      if (pageContext.type === 'store') placeStoreAds(geo);
      return geo;
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
}());
