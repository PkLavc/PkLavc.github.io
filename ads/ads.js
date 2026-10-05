(function () {
  'use strict';

  function detectPageContext(pathname) {
    var path = String(pathname || '/').replace(/\/index\.html$/i, '/');
    var blogHome = /^\/blog\/(?:(en|pt|es)\/)?$/.exec(path);
    if (blogHome) return { type: 'blog-index', locale: blogHome[1] || 'en' };
    var legacyBlogHome = /^\/(pt|es)\/blog\/$/.exec(path);
    if (legacyBlogHome) return { type: 'blog-index', locale: legacyBlogHome[1] };
    var blog = /^\/blog\/(?:(en|pt|es)\/)?([^/]+)\/?$/.exec(path);
    if (blog && blog[2] && blog[2] !== 'index.html') return { type: 'blog', locale: blog[1] || 'en' };
    var legacyBlog = /^\/(pt|es)\/blog\/([^/]+)\/?$/.exec(path);
    if (legacyBlog && legacyBlog[2]) return { type: 'blog', locale: legacyBlog[1] };
    var store = /^\/store(?:\/(pt|es))?\/?$/.exec(path);
    if (store) return { type: 'store', locale: store[1] || 'en' };
    return null;
  }

  var testPreview = window.PKLAVC_ADS_TEST_PREVIEW === true;
  var pageContext = detectPageContext(window.location.pathname);
  if (!pageContext && testPreview) {
    var previewLanguage = String(document.documentElement.lang || 'en').toLowerCase();
    pageContext = {
      type: 'store',
      locale: previewLanguage.indexOf('pt') === 0 ? 'pt' : previewLanguage.indexOf('es') === 0 ? 'es' : 'en',
      testPreview: true
    };
  }
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
      if ((pageContext.type === 'blog' || pageContext.type === 'blog-index') && id === 'pklavc_blog') return false;
      if (id === 'shopee' && locale !== 'pt' && geo.country !== 'BR') return false;
      if (pageContext.type === 'store' && id === 'pklavc_store' && !pageContext.testPreview) return false;
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
    var lineupImage = safeUrl(campaign.lineupImage);
    if (!lineupImage) return null;

    var creativeRoot = document.createElement('span');
    creativeRoot.className = 'pklavc-prime__creative';
    creativeRoot.innerHTML =
      '<span class="pklavc-prime__copy">' +
        '<span class="pklavc-prime__brand" role="img" aria-label="' + (campaign.brandLogoAlt || 'Amazon') + '"></span>' +
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
          '<span class="pklavc-prime__media-wall"><img class="pklavc-prime__lineup" src="' + lineupImage + '" alt="" loading="lazy" decoding="async"></span>' +
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

  function pklavcShowcaseVisual(style) {
    if (style === 'pklavc-store') {
      return '<span class="pklavc-showcase__scene pklavc-store-scene">' +
        '<span class="pklavc-store-scene__halo"></span>' +
        '<span class="pklavc-store-scene__laptop"><i></i><b>PK</b></span>' +
        '<span class="pklavc-store-scene__bag"><i></i><b>STORE</b></span>' +
        '<span class="pklavc-store-scene__headset"><i></i></span>' +
        '<span class="pklavc-store-scene__controller"><i></i><i></i><i></i><i></i></span>' +
        '<span class="pklavc-showcase__spark pklavc-showcase__spark--one"></span>' +
        '<span class="pklavc-showcase__spark pklavc-showcase__spark--two"></span>' +
      '</span>';
    }
    if (style === 'pklavc-projects') {
      return '<span class="pklavc-showcase__scene pklavc-projects-scene">' +
        '<span class="pklavc-projects-scene__grid"></span>' +
        '<span class="pklavc-projects-scene__window">' +
          '<span class="pklavc-projects-scene__bar"><i></i><i></i><i></i></span>' +
          '<span class="pklavc-projects-scene__node pklavc-projects-scene__node--api"><b>API</b><i></i></span>' +
          '<span class="pklavc-projects-scene__node pklavc-projects-scene__node--ai"><b>AI</b><i></i></span>' +
          '<span class="pklavc-projects-scene__node pklavc-projects-scene__node--cloud"><b>☁</b><i></i></span>' +
          '<span class="pklavc-projects-scene__route pklavc-projects-scene__route--one"></span>' +
          '<span class="pklavc-projects-scene__route pklavc-projects-scene__route--two"></span>' +
        '</span>' +
        '<span class="pklavc-projects-scene__bracket">{ }</span>' +
      '</span>';
    }
    return '<span class="pklavc-showcase__scene pklavc-blog-scene">' +
      '<span class="pklavc-blog-scene__orbit"></span>' +
      '<span class="pklavc-blog-scene__page">' +
        '<span class="pklavc-blog-scene__bar"><i></i><i></i><i></i></span>' +
        '<span class="pklavc-blog-scene__kicker">PKLAVC / BLOG</span>' +
        '<span class="pklavc-blog-scene__title"></span>' +
        '<span class="pklavc-blog-scene__line pklavc-blog-scene__line--one"></span>' +
        '<span class="pklavc-blog-scene__line pklavc-blog-scene__line--two"></span>' +
        '<span class="pklavc-blog-scene__line pklavc-blog-scene__line--three"></span>' +
        '<span class="pklavc-blog-scene__code">&lt;/&gt;</span>' +
      '</span>' +
      '<span class="pklavc-blog-scene__pen"></span>' +
      '<span class="pklavc-blog-scene__chip">AI</span>' +
    '</span>';
  }

  function shopeeAd(campaign, placement, creative, copy, destination) {
    var shell = createShell(placement, campaign);
    var link = document.createElement('a');
    link.className = 'pklavc-ad__link pklavc-shopee';
    link.href = destination;
    if (new URL(destination).origin !== window.location.origin) {
      link.target = '_blank';
      link.rel = 'sponsored noopener noreferrer';
    }

    var creativeRoot = document.createElement('span');
    creativeRoot.className = 'pklavc-shopee__creative';
    creativeRoot.innerHTML =
      '<span class="pklavc-shopee__copy">' +
        '<span class="pklavc-shopee__eyebrow"><b>SHOPEE</b><i>OFERTAS</i></span>' +
        '<strong class="pklavc-shopee__headline"></strong>' +
        '<span class="pklavc-shopee__body"></span>' +
        '<span class="pklavc-shopee__cta"><span></span><i aria-hidden="true">→</i></span>' +
      '</span>' +
      '<span class="pklavc-shopee__visual" aria-hidden="true">' +
        '<span class="pklavc-shopee__rays"></span>' +
        '<span class="pklavc-shopee__bag"><i></i><b>S</b></span>' +
        '<span class="pklavc-shopee__parcel pklavc-shopee__parcel--one"></span>' +
        '<span class="pklavc-shopee__parcel pklavc-shopee__parcel--two"></span>' +
        '<span class="pklavc-shopee__spark pklavc-shopee__spark--one"></span>' +
        '<span class="pklavc-shopee__spark pklavc-shopee__spark--two"></span>' +
      '</span>';
    creativeRoot.querySelector('.pklavc-shopee__headline').textContent = copy.title;
    creativeRoot.querySelector('.pklavc-shopee__body').textContent = copy.body;
    creativeRoot.querySelector('.pklavc-shopee__cta span').textContent = copy.cta;
    link.appendChild(creativeRoot);
    shell.appendChild(link);
    return shell;
  }

  function pklavcShowcaseAd(campaign, placement, creative, copy, destination) {
    var style = campaign.style;
    var shell = createShell(placement, campaign);
    var link = document.createElement('a');
    link.className = 'pklavc-ad__link pklavc-showcase';
    link.href = destination;
    if (new URL(destination).origin !== window.location.origin) {
      link.target = '_blank';
      link.rel = 'sponsored noopener noreferrer';
    }

    var eyebrow = {
      'pklavc-blog': { en: 'ENGINEERING NOTES', pt: 'NOTAS DE ENGENHARIA', es: 'NOTAS DE INGENIERÍA' },
      'pklavc-store': { en: 'CURATED GEAR', pt: 'SELEÇÃO PKLAVC', es: 'SELECCIÓN PKLAVC' },
      'pklavc-projects': { en: 'BUILT IN PRACTICE', pt: 'FEITO NA PRÁTICA', es: 'HECHO EN LA PRÁCTICA' }
    }[style][locale];

    var creativeRoot = document.createElement('span');
    creativeRoot.className = 'pklavc-showcase__creative';
    creativeRoot.innerHTML =
      '<span class="pklavc-showcase__copy">' +
        '<span class="pklavc-showcase__eyebrow"></span>' +
        '<strong class="pklavc-showcase__headline"></strong>' +
        '<span class="pklavc-showcase__body"></span>' +
        '<span class="pklavc-showcase__cta"><span></span><i aria-hidden="true">→</i></span>' +
      '</span>' +
      '<span class="pklavc-showcase__visual" aria-hidden="true">' + pklavcShowcaseVisual(style) + '</span>';
    creativeRoot.querySelector('.pklavc-showcase__eyebrow').textContent = eyebrow;
    creativeRoot.querySelector('.pklavc-showcase__headline').textContent = copy.title;
    creativeRoot.querySelector('.pklavc-showcase__body').textContent = copy.body;
    creativeRoot.querySelector('.pklavc-showcase__cta span').textContent = copy.cta;
    link.appendChild(creativeRoot);
    shell.appendChild(link);
    return shell;
  }

  function imageAd(campaign, placement) {
    var creative = campaign.locales && campaign.locales[locale];
    var fallbackPlacements = {
      'project-sidebar': 'sidebar',
      'project-bottom': 'bottom',
      continuous: 'inline',
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
    if (campaign.style === 'shopee') {
      return shopeeAd(campaign, placement, creative, copy, destination);
    }
    if (campaign.style === 'pklavc-blog' || campaign.style === 'pklavc-store' || campaign.style === 'pklavc-projects') {
      return pklavcShowcaseAd(campaign, placement, creative, copy, destination);
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
    if (ad) {
      ad.dataset.adCampaign = id;
      if (pageContext.testPreview) {
        ad.querySelectorAll('a').forEach(function (link) {
          link.removeAttribute('href');
          link.removeAttribute('target');
          link.removeAttribute('rel');
          link.setAttribute('aria-disabled', 'true');
        });
      }
    }
    return ad;
  }

  function preloadImage(ad) {
    return new Promise(function (resolve) {
      var nextImage = ad.querySelector('img');
      if (!nextImage) { resolve(true); return; }
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
        continuous: 'inline',
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

    var continuousAdIndex = 0;
    function hydrateContinuousAds() {
      document.querySelectorAll('[data-blog-continuous-ad]').forEach(function (slot) {
        if (slot.dataset.blogContinuousAdReady === 'true') return;
        var continuous = placementAd('continuous', geo, continuousAdIndex++);
        if (!continuous) {
          slot.remove();
          return;
        }
        slot.appendChild(continuous.ad);
        slot.dataset.blogContinuousAdReady = 'true';
        rotatePlacement(continuous, 'continuous', geo);
      });
    }

    hydrateContinuousAds();
    if ('MutationObserver' in window) {
      var continuousAdsObserver = new MutationObserver(hydrateContinuousAds);
      continuousAdsObserver.observe(document.body, { childList: true, subtree: true });
    }

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

  function placeBlogIndexAds(geo) {
    function hydrate() {
      var slots = document.querySelectorAll('[data-blog-feed-ad]');
      slots.forEach(function (slot, index) {
        if (slot.dataset.blogFeedAdReady === 'true') return;
        var feed = placementAd('feed', geo, index);
        if (!feed) {
          slot.remove();
          document.dispatchEvent(new CustomEvent('pklavc:blog-feed-ad-empty', { detail: slot }));
          return;
        }
        slot.appendChild(feed.ad);
        slot.dataset.blogFeedAdReady = 'true';
        rotatePlacement(feed, 'feed', geo);
      });
      return slots.length > 0;
    }

    // The coverflow creates its cards only after the reader reaches it. The
    // runtime normally arrives earlier, so wait once for the real card slot.
    if (hydrate() || document.documentElement.dataset.blogFeedAdsWatching === 'true') return;
    document.documentElement.dataset.blogFeedAdsWatching = 'true';
    var observer = new MutationObserver(function () {
      if (!hydrate()) return;
      observer.disconnect();
      delete document.documentElement.dataset.blogFeedAdsWatching;
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () {
      observer.disconnect();
      delete document.documentElement.dataset.blogFeedAdsWatching;
    }, 30000);
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
    var lastSidebarAdLayout = null;
    function refreshSidebarAds() {
      sidebarTimer = 0;
      if (!sidebarAds || !column || !filters || !results) return;

      // On mobile the Store uses only row ads (every 10 rows) and the final ad.
      if (window.matchMedia && window.matchMedia('(max-width: 760px)').matches) {
        if (lastSidebarAdLayout !== 'mobile') {
          sidebarAds.replaceChildren();
          sidebarAds.style.top = '';
          lastSidebarAdLayout = 'mobile';
        }
        return;
      }

      var columnHeight = Math.max(column.getBoundingClientRect().height, results.getBoundingClientRect().height);
      var filtersHeight = Math.ceil(filters.getBoundingClientRect().height);
      var gap = 12;
      var top = filtersHeight + gap;
      var available = Math.max(0, Math.floor(columnHeight - top));

      var sidebarSelection = placementSelection('store-sidebar', geo);
      var sidebarCampaigns = sidebarSelection ? sidebarSelection.ids : [];
      var maxSlots = sidebarCampaigns.length ? Math.ceil(available / 160) + 1 : 0;
      var sidebarLayout = [top, available, maxSlots, sidebarCampaigns.join(',')].join('|');

      // This function is also called by a ResizeObserver. Rebuilding an
      // unchanged rail would resize the Store again and schedule an endless
      // remove / insert cycle, which also disturbs the current scroll anchor.
      if (sidebarLayout === lastSidebarAdLayout) return;
      lastSidebarAdLayout = sidebarLayout;

      sidebarAds.style.top = top + 'px';
      sidebarAds.replaceChildren();

      var used = 0;
      var slot = 0;

      // Repeat the campaign set to use the full sidebar height, while only
      // appending ads whose measured height fits in the remaining space.
      while (slot < maxSlots && used < available) {
        var campaignId = sidebarCampaigns[slot % sidebarCampaigns.length];
        slot += 1;
        var sideAd = createAd(campaignId, 'store-sidebar', geo);
        if (!sideAd) continue;

        sidebarAds.appendChild(sideAd);
        var height = Math.ceil(sideAd.getBoundingClientRect().height || 160);
        var nextUsed = used + (used ? gap : 0) + height;

        if (nextUsed > available) {
          sideAd.remove();
          break;
        }

        used = nextUsed;
      }
    }

    var rowTimer = 0;
    var lastRowAdLayout = null;
    function refreshRowAds() {
      rowTimer = 0;
      var selection = placementSelection('store-rows', geo);
      if (!selection || !selection.ids.length) {
        if (lastRowAdLayout !== 'none') {
          grid.querySelectorAll('.pklavc-ad--store-rows').forEach(function (ad) { ad.remove(); });
          lastRowAdLayout = 'none';
        }
        refreshSidebarAds();
        return;
      }

      var visibleCards = Array.prototype.filter.call(grid.querySelectorAll('.store-card'), function (card) {
        return !card.classList.contains('is-filtered-out') && !card.hidden;
      });
      var columns = actualStoreColumns(grid);
      var interval = Math.max(1, selection.everyRows * columns);
      var slots = [];
      var adIndex = 0;

      for (var index = interval; index < visibleCards.length; index += interval) {
        slots.push({ anchor: visibleCards[index - 1], index: adIndex++ });
      }

      var layoutSignature = selection.ids.join(',') + '|' + interval + '|' + slots.map(function (slot) {
        return (slot.anchor.dataset.productId || slot.anchor.id || '') + ':' + selection.ids[slot.index % selection.ids.length];
      }).join('|');

      // ResizeObserver also fires when an ad finishes laying out. Keep the
      // existing nodes when their positions are unchanged to avoid a remove /
      // insert cycle that repeatedly shifts the product grid.
      if (layoutSignature === lastRowAdLayout) {
        requestAnimationFrame(refreshSidebarAds);
        return;
      }

      grid.querySelectorAll('.pklavc-ad--store-rows').forEach(function (ad) { ad.remove(); });
      slots.forEach(function (slot) {
        var rowAd = placementAd('store-rows', geo, slot.index);
        if (!rowAd) return;
        slot.anchor.insertAdjacentElement('afterend', rowAd.ad);
        rotatePlacement(rowAd, 'store-rows', geo);
      });
      lastRowAdLayout = layoutSignature;

      requestAnimationFrame(refreshSidebarAds);
    }

    function scheduleStoreAds() {
      if (rowTimer) clearTimeout(rowTimer);
      if (sidebarTimer) clearTimeout(sidebarTimer);
      rowTimer = setTimeout(refreshRowAds, 180);
      sidebarTimer = setTimeout(refreshSidebarAds, 80);
    }

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

  function placePreviewAds(geo) {
    var gallery = document.querySelector('[data-ad-preview-grid]');
    if (!gallery) return;

    var campaigns = Array.isArray(window.PKLAVC_ADS_TEST_CAMPAIGNS)
      ? window.PKLAVC_ADS_TEST_CAMPAIGNS
      : Object.keys(config.campaigns).filter(function (id) {
          var campaign = config.campaigns[id];
          return campaign.type === 'image' && campaign.locales && campaign.locales[locale];
        });

    campaigns.forEach(function (id) {
      var ad = createAd(id, 'store-rows', geo);
      if (ad) gallery.appendChild(ad);
    });
    document.body.dataset.adsTestReady = 'true';
  }

  function init() {
    window.PKLAVC_BLOG_ADS_READY = getGeo().then(function (geo) {
      if (pageContext.testPreview) {
        placePreviewAds(geo);
        return geo;
      }
      if (pageContext.type === 'blog') placeBlogAds(geo);
      if (pageContext.type === 'blog-index') placeBlogIndexAds(geo);
      if (pageContext.type === 'store') placeStoreAds(geo);
      return geo;
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
}());
