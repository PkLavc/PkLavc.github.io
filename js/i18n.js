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
      'skyler-assistant': 'skyler-assistant'
    },
    es: {
      about: 'sobre',
      projects: 'proyectos',
      visitors: 'visitantes',
      blog: 'blog',
      collections: 'colecciones',
      stacks: 'stacks',
      'skyler-assistant': 'skyler-assistant'
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
      'skyler-assistant': 'skyler-assistant'
    },
    es: {
      sobre: 'about',
      proyectos: 'projects',
      visitantes: 'visitors',
      blog: 'blog',
      colecciones: 'collections',
      stacks: 'stacks',
      'skyler-assistant': 'skyler-assistant'
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
    var firstSegment = splitPath(path)[0];
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

    return '/' + segments.join('/') + '/';
  }

  function getLocalizedRoute(englishRoute, locale) {
    var route = getEnglishRoute(englishRoute);
    var segments = splitPath(route);

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

    if (targetPath !== currentPath) {
      window.location.replace(targetPath + window.location.search + window.location.hash);
    }
  }

  function createNavigationLabelFragment(label) {
    var fragment = document.createDocumentFragment();

    Array.prototype.forEach.call(label, function(character) {
      var span = document.createElement('span');
      span.textContent = character;

      if (/[mia]/i.test(character)) {
        span.className = 'navigation-menu-letter-miami';
      }

      fragment.appendChild(span);
    });

    return fragment;
  }

  function renderEnhancedNavigationLabel(link, label) {
    var visibleLabel = document.createElement('span');
    var hoverLabel = document.createElement('span');

    visibleLabel.className = 'navigation-link-text';
    visibleLabel.appendChild(createNavigationLabelFragment(label));

    hoverLabel.className = 'navigation-hover-text';
    hoverLabel.setAttribute('aria-hidden', 'true');
    hoverLabel.appendChild(createNavigationLabelFragment(label));

    link.textContent = '';
    link.classList.add('is-navigation-enhanced');
    link.appendChild(visibleLabel);
    link.appendChild(hoverLabel);
  }

  function getLanguageToggleIconMarkup() {
    return [
      '<svg class="navigation-language-gear-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">',
      '<path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z"></path>',
      '<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 .6 1.65 1.65 0 0 0-.34 1v.17a2 2 0 0 1-4 0V21a1.65 1.65 0 0 0-.34-1 1.65 1.65 0 0 0-1-.6 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.6-1 1.65 1.65 0 0 0-1-.34H2.83a2 2 0 0 1 0-4H3a1.65 1.65 0 0 0 1-.34 1.65 1.65 0 0 0 .6-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 7.04 3.6l.06.06A1.65 1.65 0 0 0 8.9 4a1.65 1.65 0 0 0 1-.6 1.65 1.65 0 0 0 .34-1V2.23a2 2 0 0 1 4 0v.17a1.65 1.65 0 0 0 .34 1 1.65 1.65 0 0 0 1 .6 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 8.9a1.65 1.65 0 0 0 .6 1 1.65 1.65 0 0 0 1 .34h.17a2 2 0 0 1 0 4H21a1.65 1.65 0 0 0-1 .34 1.65 1.65 0 0 0-.6 1Z"></path>',
      '</svg>'
    ].join('');
  }

  function setNavigationLink(link, label, href) {
    if (!link) {
      return;
    }

    link.href = href;
    link.setAttribute('data-text', label);
    link.setAttribute('data-nav-label', label);

    if (link.classList.contains('is-navigation-enhanced') || link.querySelector('.navigation-link-text')) {
      renderEnhancedNavigationLabel(link, label);
      return;
    }

    link.textContent = label;
  }

  function localizeNavigation() {
    var locale = getLanguageFromPath(window.location.pathname);
    var labels = NAV_LABELS[locale] || NAV_LABELS.en;
    var nav = document.getElementById('navigation-content');

    if (nav) {
      nav.setAttribute('aria-label', labels.navigation);
    }

    document.querySelectorAll('#home-link').forEach(function(link) {
      setNavigationLink(link, labels.home, getLocalizedRoute('/', locale));
    });

    document.querySelectorAll('#about-link').forEach(function(link) {
      setNavigationLink(link, labels.about, getLocalizedRoute('/about/', locale));
    });

    document.querySelectorAll('#projects-link').forEach(function(link) {
      setNavigationLink(link, labels.projects, getLocalizedRoute('/projects/', locale));
    });

    document.querySelectorAll('#visitor-map-link').forEach(function(link) {
      setNavigationLink(link, labels.visitors, getLocalizedRoute('/visitors/', locale));
    });

    document.querySelectorAll('#blog-link').forEach(function(link) {
      setNavigationLink(link, labels.blog, getLocalizedRoute('/blog/', locale));
    });
  }

  function updateLanguageLinks(container) {
    var currentLanguage = getLanguageFromPath(window.location.pathname);
    var currentRoute = getEnglishRoute(window.location.pathname);

    container.querySelectorAll('[data-language-option]').forEach(function(link) {
      var locale = link.getAttribute('data-language-option');
      var targetPath = getLocalizedRoute(currentRoute, locale);

      link.href = targetPath + window.location.search + window.location.hash;
      link.classList.toggle('is-current-language', locale === currentLanguage);

      if (locale === currentLanguage) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function initLanguageMenu() {
    var nav = document.getElementById('navigation-content');

    if (!nav) {
      return;
    }

    var labels = NAV_LABELS[getLanguageFromPath(window.location.pathname)] || NAV_LABELS.en;
    var toggle = nav.querySelector('.navigation-language-toggle');
    var options = nav.querySelector('.navigation-language-options');

    if (!toggle) {
      toggle = document.createElement('button');
      toggle.className = 'navigation-language-toggle';
      toggle.type = 'button';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = getLanguageToggleIconMarkup();
      nav.insertBefore(toggle, nav.firstChild);

      toggle.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();

        var isLanguageMode = nav.classList.toggle('is-language-mode');
        toggle.setAttribute('aria-expanded', isLanguageMode ? 'true' : 'false');

        if (options) {
          updateLanguageLinks(options);
        }
      });
    }

    toggle.setAttribute('aria-label', labels.languageSettings);
    toggle.setAttribute('title', labels.languageSettings);

    if (!options) {
      options = document.createElement('div');
      options.className = 'navigation-language-options';

      LANGUAGE_OPTIONS.forEach(function(option) {
        var link = document.createElement('a');
        link.href = '#';
        link.setAttribute('data-language-option', option.locale);
        link.setAttribute('data-text', option.label.toUpperCase());
        link.setAttribute('data-nav-label', option.label);
        renderEnhancedNavigationLabel(link, option.label);

        link.addEventListener('click', function() {
          setStoredLanguage(option.locale);
        });

        options.appendChild(link);
      });

      nav.appendChild(options);
    }

    updateLanguageLinks(options);
  }

  function resetLanguageMenu() {
    var nav = document.getElementById('navigation-content');

    if (!nav) {
      return;
    }

    nav.classList.remove('is-language-mode');

    var toggle = nav.querySelector('.navigation-language-toggle');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
    }
  }

  redirectToPreferredLanguage();

  window.PkLavcI18n = {
    getCurrentLanguage: function() {
      return getLanguageFromPath(window.location.pathname);
    },
    getEnglishRoute: getEnglishRoute,
    getLocalizedRoute: getLocalizedRoute,
    initLanguageMenu: initLanguageMenu,
    localizeNavigation: localizeNavigation,
    resetLanguageMenu: resetLanguageMenu,
    setStoredLanguage: setStoredLanguage
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      localizeNavigation();
      initLanguageMenu();
    }, { once: true });
  } else {
    localizeNavigation();
    initLanguageMenu();
  }
}());
