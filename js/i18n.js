(function() {
  var STORAGE_KEY = 'pklavc.preferredLanguage';
  var SUPPORTED_LOCALES = ['en', 'pt', 'es'];
  var LOCALE_PREFIXES = { pt: true, es: true };

  var SECTION_TO_LOCALIZED = {
    pt: {
      about: 'sobre',
      projects: 'projetos',
      visitors: 'visitantes',
      blog: 'blog',
      collections: 'colecoes',
      stacks: 'stacks',
      credits: 'creditos',
    },
    es: {
      about: 'sobre',
      projects: 'proyectos',
      visitors: 'visitantes',
      blog: 'blog',
      collections: 'colecciones',
      stacks: 'stacks',
      credits: 'creditos',
    }
  };

  var LOCALIZED_TO_SECTION = {
    pt: {
      sobre: 'about',
      projetos: 'projects',
      visitantes: 'visitors',
      blog: 'blog',
      colecoes: 'collections',
      stacks: 'stacks',
      creditos: 'credits',
    },
    es: {
      sobre: 'about',
      proyectos: 'projects',
      visitantes: 'visitors',
      blog: 'blog',
      colecciones: 'collections',
      stacks: 'stacks',
      creditos: 'credits',
    }
  };

  var SLUG_TO_LOCALIZED = {
    pt: {
      collections: {
        'python-projects': 'projetos-python',
        'javascript-projects': 'projetos-javascript',
        'automation-projects': 'projetos-automacao',
        'api-integration-projects': 'projetos-integracao-api'
      },
      stacks: {
        'python-engineer': 'engenheiro-python',
        'javascript-developer': 'desenvolvedor-javascript',
        'nodejs-backend': 'backend-nodejs',
        'zoho-deluge-developer': 'desenvolvedor-zoho-deluge',
        'api-integration-engineer': 'engenheiro-integracao-api',
        'backend-automation': 'automacao-backend'
      },
      projects: {
        'backend-python': 'backend-python',
        'ai-engineer': 'engenheiro-ia',
        'llm-rag': 'llm-rag',
        'api-integrations': 'integracoes-api',
        'python-automation': 'automacao-python'
      }
    },
    es: {
      collections: {
        'python-projects': 'proyectos-python',
        'javascript-projects': 'proyectos-javascript',
        'automation-projects': 'proyectos-automatizacion',
        'api-integration-projects': 'proyectos-integracion-api'
      },
      stacks: {
        'python-engineer': 'ingeniero-python',
        'javascript-developer': 'desarrollador-javascript',
        'nodejs-backend': 'backend-nodejs',
        'zoho-deluge-developer': 'desarrollador-zoho-deluge',
        'api-integration-engineer': 'ingeniero-integracion-api',
        'backend-automation': 'automatizacion-backend'
      },
      projects: {
        'backend-python': 'backend-python',
        'ai-engineer': 'ingeniero-ia',
        'llm-rag': 'llm-rag',
        'api-integrations': 'integraciones-api',
        'python-automation': 'automatizacion-python'
      }
    }
  };

  var LOCALIZED_TO_SLUG = buildReverseSlugMaps();
  var routeExistenceChecks = Object.create(null);

  function buildReverseSlugMaps() {
    var reversed = {};

    Object.keys(SLUG_TO_LOCALIZED).forEach(function(locale) {
      reversed[locale] = {};

      Object.keys(SLUG_TO_LOCALIZED[locale]).forEach(function(section) {
        reversed[locale][section] = {};

        Object.keys(SLUG_TO_LOCALIZED[locale][section]).forEach(function(slug) {
          reversed[locale][section][SLUG_TO_LOCALIZED[locale][section][slug]] = slug;
        });
      });
    });

    return reversed;
  }

  function normalizePath(path) {
    var normalized = path || '/';

    if (!normalized.startsWith('/')) {
      normalized = '/' + normalized;
    }

    normalized = normalized.replace(/\/index\.html$/i, '/');

    if (!/\.[a-z0-9]+$/i.test(normalized) && !normalized.endsWith('/')) {
      normalized += '/';
    }

    return normalized;
  }

  function splitPath(path) {
    return normalizePath(path)
      .replace(/^\/+|\/+$/g, '')
      .split('/')
      .filter(Boolean);
  }

  function getLanguageFromPath(path) {
    var segments = splitPath(path);
    if (segments[0] === 'blog' && (segments[1] === 'pt' || segments[1] === 'es')) return segments[1];
    if (segments[0] === 'store' && (segments[1] === 'pt' || segments[1] === 'es')) return segments[1];
    var firstSegment = segments[0];
    return LOCALE_PREFIXES[firstSegment] ? firstSegment : 'en';
  }

  function isSupportedLocale(locale) {
    return SUPPORTED_LOCALES.indexOf(locale) !== -1;
  }

  function getEnglishRoute(path) {
    var segments = splitPath(path);
    if (segments[0] === 'blog' && (segments[1] === 'pt' || segments[1] === 'es')) {
      segments.splice(1, 1);
      return '/' + segments.join('/') + '/';
    }
    if (segments[0] === 'store' && (segments[1] === 'pt' || segments[1] === 'es')) {
      segments.splice(1, 1);
      return '/' + segments.join('/') + '/';
    }
    var locale = LOCALE_PREFIXES[segments[0]] ? segments.shift() : 'en';

    if (!segments.length) {
      return '/';
    }

    if (locale !== 'en') {
      var localizedSection = segments[0];
      var section = (LOCALIZED_TO_SECTION[locale] && LOCALIZED_TO_SECTION[locale][localizedSection]) || localizedSection;
      segments[0] = section;

      if (segments.length > 1 && LOCALIZED_TO_SLUG[locale] && LOCALIZED_TO_SLUG[locale][section]) {
        segments[1] = LOCALIZED_TO_SLUG[locale][section][segments[1]] || segments[1];
      }
    }

    if (segments.length === 1 && segments[0] === 'ia') {
      return '/ia/';
    }

    return '/' + segments.join('/') + '/';
  }

  function getLocalizedRoute(englishRoute, locale) {
    var route = getEnglishRoute(englishRoute);
    var segments = splitPath(route);

    if (segments[0] === 'blog' && (locale === 'pt' || locale === 'es')) {
      return '/blog/' + locale + (segments.length > 1 ? '/' + segments.slice(1).join('/') : '') + '/';
    }
    if (segments[0] === 'store') {
      return locale === 'en' ? '/store/' : '/store/' + locale + '/';
    }

    // Skylet uses the same final /ia slug in every localized route.
    if (route === '/ia/') {
      return locale === 'en' ? '/ia/' : '/' + locale + '/ia/';
    }

    if (locale === 'en') {
      return route;
    }

    if (!segments.length) {
      return '/' + locale + '/';
    }

    var section = segments[0];
    segments[0] = (SECTION_TO_LOCALIZED[locale] && SECTION_TO_LOCALIZED[locale][section]) || section;

    if (segments.length > 1 && SLUG_TO_LOCALIZED[locale] && SLUG_TO_LOCALIZED[locale][section]) {
      segments[1] = SLUG_TO_LOCALIZED[locale][section][segments[1]] || segments[1];
    }

    return '/' + locale + '/' + segments.join('/') + '/';
  }

  function getLanguageFallback(englishRoute, locale) {
    var route = getEnglishRoute(englishRoute);
    if (route === '/blog/' || route.indexOf('/blog/') === 0) {
      return locale === 'en' ? '/blog/' : '/blog/' + locale + '/';
    }
    if (route === '/store/' || route.indexOf('/store/') === 0) {
      return locale === 'en' ? '/store/' : '/store/' + locale + '/';
    }
    return locale === 'en' ? '/' : '/' + locale + '/';
  }

  function pageExists(path) {
    var normalized = normalizePath(path);
    if (!routeExistenceChecks[normalized]) {
      routeExistenceChecks[normalized] = Promise.resolve()
        .then(function() {
          if (typeof window.fetch !== 'function') return false;
          return window.fetch(normalized, {
            method: 'HEAD',
            credentials: 'same-origin',
            cache: 'force-cache'
          }).then(function(response) {
            return Boolean(response && response.ok);
          });
        })
        .catch(function() {
          return false;
        });
    }
    return routeExistenceChecks[normalized];
  }

  function resolveLocalizedRoute(englishRoute, locale) {
    var targetLocale = normalizeLocale(locale);
    var candidate = getLocalizedRoute(englishRoute, targetLocale);
    var fallback = getLanguageFallback(englishRoute, targetLocale);
    if (candidate.indexOf('/blog/en/') === 0) candidate = fallback;
    if (candidate === fallback) return Promise.resolve(fallback);
    return pageExists(candidate).then(function(exists) {
      return exists ? candidate : fallback;
    });
  }

  function addCurrentQueryAndHash(path) {
    return path + window.location.search + window.location.hash;
  }

  function normalizeLocale(locale) {
    if (!locale) {
      return 'en';
    }

    var value = String(locale).toLowerCase().split('-')[0];
    return isSupportedLocale(value) ? value : 'en';
  }

  function getStoredLanguage() {
    try {
      return normalizeLocale(window.localStorage && window.localStorage.getItem(STORAGE_KEY));
    } catch (error) {
      return 'en';
    }
  }

  function setStoredLanguage(locale) {
    if (!isSupportedLocale(locale)) {
      return;
    }

    try {
      if (window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, locale);
      }
    } catch (error) {
      // Preference storage is optional; navigation still works without it.
    }
  }

  function getBrowserLanguage() {
    var languages = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || navigator.userLanguage || ''];

    for (var index = 0; index < languages.length; index += 1) {
      var locale = normalizeLocale(languages[index]);

      if (locale === 'pt' || locale === 'es') {
        return locale;
      }
    }

    return 'en';
  }

  function getPreferredLanguage() {
    var stored = getStoredLanguage();

    if (stored !== 'en') {
      return stored;
    }

    try {
      if (window.localStorage && window.localStorage.getItem(STORAGE_KEY)) {
        return stored;
      }
    } catch (error) {
      return getBrowserLanguage();
    }

    return getBrowserLanguage();
  }

  function buildCurrentPageRoute(locale) {
    return getLocalizedRoute(getEnglishRoute(window.location.pathname), locale);
  }

  function redirectToPreferredLanguage() {
    var currentLanguage = getLanguageFromPath(window.location.pathname);

    if (currentLanguage !== 'en') {
      setStoredLanguage(currentLanguage);
      return;
    }

    var preferredLanguage = getPreferredLanguage();

    if (preferredLanguage === 'en') {
      return;
    }

    var currentPath = normalizePath(window.location.pathname);
    var targetPath = buildCurrentPageRoute(preferredLanguage);
    if (targetPath === currentPath) return;
    resolveLocalizedRoute(getEnglishRoute(currentPath), preferredLanguage).then(function(existingPath) {
      if (existingPath !== currentPath) {
        window.location.replace(addCurrentQueryAndHash(existingPath));
      }
    });
  }

  redirectToPreferredLanguage();

  window.PkLavcI18n = {
    getCurrentLanguage: function() {
      return getLanguageFromPath(window.location.pathname);
    },
    getEnglishRoute: getEnglishRoute,
    getLocalizedRoute: getLocalizedRoute,
    resolveLocalizedRoute: resolveLocalizedRoute,
    setStoredLanguage: setStoredLanguage
  };

  }());
