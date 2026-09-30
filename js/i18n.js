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
    },
    es: {
      about: 'sobre',
      projects: 'proyectos',
      visitors: 'visitantes',
      blog: 'blog',
      collections: 'colecciones',
      stacks: 'stacks',
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
    },
    es: {
      sobre: 'about',
      proyectos: 'projects',
      visitantes: 'visitors',
      blog: 'blog',
      colecciones: 'collections',
      stacks: 'stacks',
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

  var NAV_LABELS = {
    en: {
      home: 'HOME',
      about: 'ABOUT',
      projects: 'PROJECTS',
      visitors: 'VISIT MAP',
      blog: 'BLOG',
      navigation: 'Primary navigation',
      languageSettings: 'Language settings'
    },
    pt: {
      home: 'IN\u00cdCIO',
      about: 'SOBRE',
      projects: 'PROJETOS',
      visitors: 'MAPA DE VISITAS',
      blog: 'BLOG',
      navigation: 'Navega\u00e7\u00e3o principal',
      languageSettings: 'Configura\u00e7\u00f5es de idioma'
    },
    es: {
      home: 'INICIO',
      about: 'SOBRE',
      projects: 'PROYECTOS',
      visitors: 'MAPA DE VISITAS',
      blog: 'BLOG',
      navigation: 'Navegaci\u00f3n principal',
      languageSettings: 'Configuraci\u00f3n de idioma'
    }
  };

  var LANGUAGE_OPTIONS = [
    { locale: 'en', label: 'English' },
    { locale: 'es', label: 'Espa\u00f1ol' },
    { locale: 'pt', label: 'Portugu\u00eas' }
  ];

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
    var firstSegment = segments[0];
    return LOCALE_PREFIXES[firstSegment] ? firstSegment : 'en';
  }

  function isSupportedLocale(locale) {
    return SUPPORTED_LOCALES.indexOf(locale) !== -1;
  }

  function getEnglishRoute(path) {
    var segments = splitPath(path);
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
      return '/' + locale + '/blog' + (segments.length > 1 ? '/' + segments.slice(1).join('/') : '') + '/';
    }

    // Skylet uses the same final /ia slug in every localized route.