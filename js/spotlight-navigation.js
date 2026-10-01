(function () {
  'use strict';

  if (window.PkLavcSpotlightNavigation) {
    return;
  }

  // Inline Lucide icons retained from the source component.
  var ICONS = {
    home: '<path d="m3 11 9-8 9 8"></path><path d="M5 10v10h14V10"></path><path d="M9 20v-6h6v6"></path>',
    user: '<path d="M19 21a7 7 0 0 0-14 0"></path><circle cx="12" cy="7" r="4"></circle>',
    settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle>'
  };

  // Official Lucide SVG files kept locally so their color remains CSS-editable.
  var ICON_FILES = {
    layers: '/assets/icons/navigation/layers.svg',
    newspaper: '/assets/icons/navigation/newspaper.svg',
    store: '/assets/icons/navigation/store.svg'
  };

  var COPY = {
    en: {
      navigation: 'Primary navigation',
      items: ['Home', 'About', 'Projects', 'Blog', 'Store', 'Language'],
      languageMenu: 'Choose language'
    },
    pt: {
      navigation: 'Navega\u00e7\u00e3o principal',
      items: ['In\u00edcio', 'Sobre', 'Projetos', 'Blog', 'Loja', 'Idioma'],
      languageMenu: 'Escolher idioma'
    },
    es: {
      navigation: 'Navegaci\u00f3n principal',
      items: ['Inicio', 'Sobre', 'Proyectos', 'Blog', 'Tienda', 'Idioma'],
      languageMenu: 'Elegir idioma'
    }
  };

  var LANGUAGES = [
    { locale: 'en', label: 'English' },
    { locale: 'pt', label: 'Portugu\u00eas' },
    { locale: 'es', label: 'Espa\u00f1ol' }
  ];

  var state = {
    navigationObserver: null
  };

  function normalizePath(path) {
    var normalized = String(path || '/').replace(/\/index\.html$/i, '/');
    if (normalized.charAt(0) !== '/') normalized = '/' + normalized;
    if (!/\.[a-z0-9]+$/i.test(normalized) && normalized.slice(-1) !== '/') normalized += '/';
    return normalized;
  }

  function getLocale() {
    if (window.PkLavcI18n && typeof window.PkLavcI18n.getCurrentLanguage === 'function') {
      return window.PkLavcI18n.getCurrentLanguage();
    }

    var path = normalizePath(window.location.pathname);
    if (/^\/blog\/(?:pt|es)\//.test(path) || /^\/store\/(?:pt|es)\//.test(path)) {
      return path.split('/')[2];
    }
    if (/^\/(?:pt|es)\//.test(path)) return path.split('/')[1];
    return 'en';
  }

  function localizedRoute(route, locale) {
    if (window.PkLavcI18n && typeof window.PkLavcI18n.getLocalizedRoute === 'function') {
      return window.PkLavcI18n.getLocalizedRoute(route, locale);
    }

    if (route === '/') return locale === 'en' ? '/' : '/' + locale + '/';
    if (route === '/blog/') return locale === 'en' ? '/blog/' : '/blog/' + locale + '/';
    if (route === '/store/') return locale === 'en' ? '/store/' : '/store/' + locale + '/';

    var translated = {
      pt: { '/about/': '/pt/sobre/', '/projects/': '/pt/projetos/' },
      es: { '/about/': '/es/sobre/', '/projects/': '/es/proyectos/' }
    };

    return locale === 'en' ? route : translated[locale][route];
  }

  function getActiveIndex(path) {
    var normalized = normalizePath(path);
    var parts = normalized.split('/').filter(Boolean);
    var first = parts[0] || '';
    var section = first === 'pt' || first === 'es' ? (parts[1] || '') : first;

    if (first === 'blog' || section === 'blog') return 3;
    if (first === 'store' || section === 'store') return 4;
    if (['projects', 'projetos', 'proyectos', 'collections', 'colecoes', 'colecciones', 'stacks'].indexOf(section) !== -1) return 2;
    if (['about', 'sobre', 'resume', 'uses', 'now', 'certifications', 'visitors', 'visitantes'].indexOf(section) !== -1) return 1;
    return 0;
  }

  function createIcon(markup) {
    return '<svg class="spotlight-navigation-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + markup + '</svg>';
  }

  function appendCurrentLocation(targetPath) {
    return targetPath + String(window.location.search || '') + String(window.location.hash || '');
  }

  function getLanguageTarget(locale) {
    var i18n = window.PkLavcI18n;

    if (i18n && typeof i18n.getEnglishRoute === 'function' && typeof i18n.getLocalizedRoute === 'function') {
      return appendCurrentLocation(i18n.getLocalizedRoute(i18n.getEnglishRoute(window.location.pathname), locale));
    }

    return appendCurrentLocation(localizedRoute('/', locale));
  }

  function setCurrentItem(items, activeIndex) {
    items.forEach(function (item, index) {
      item.classList.toggle('is-active', index === activeIndex);

      if (index === activeIndex) {
        item.setAttribute('aria-current', 'page');
      } else {
        item.removeAttribute('aria-current');
      }
    });
  }

  function updateIndicator(nav, item) {
    if (!item) return;

    var icon = item.querySelector('.spotlight-navigation-icon');
    if (!icon) return;

    var indicatorWidth = window.innerWidth <= 360 ? 44 : 48;
    var navRect = nav.getBoundingClientRect();
    var iconRect = icon.getBoundingClientRect();
    var iconCenter = iconRect.left - navRect.left + (iconRect.width / 2);

    nav.style.setProperty('--spotlight-indicator-left', (iconCenter - (indicatorWidth / 2)) + 'px');
  }

  function setPresentedItem(nav, items, presentedIndex) {
    nav.style.setProperty('--spotlight-active-index', String(presentedIndex));

    items.forEach(function (item, index) {
      var isPresented = index === presentedIndex;
      item.style.setProperty('--spotlight-opacity', isPresented ? '1' : '0');
      item.classList.toggle('is-presented', isPresented);
    });

    updateIndicator(nav, items[presentedIndex]);
  }

  function createNavigation() {
    if (document.getElementById('spotlight-navigation')) return;

    var locale = getLocale();
    var copy = COPY[locale] || COPY.en;
    var activeIndex = getActiveIndex(window.location.pathname);
    var definitions = [
      { icon: ICONS.home, route: '/' },
      { icon: ICONS.user, route: '/about/' },
      { iconFile: ICON_FILES.layers, route: '/projects/' },
      { iconFile: ICON_FILES.newspaper, route: '/blog/' },
      { iconFile: ICON_FILES.store, route: '/store/' },
      { icon: ICONS.settings, action: 'language' }
    ];
    var shell = document.createElement('div');
    var nav = document.createElement('nav');

    shell.className = 'spotlight-navigation-shell';
    shell.id = 'spotlight-navigation-shell';
    nav.className = 'spotlight-navigation';
    nav.id = 'spotlight-navigation';
    nav.setAttribute('aria-label', copy.navigation);

    definitions.forEach(function (definition, index) {
      var control = document.createElement(definition.action ? 'button' : 'a');
      control.className = 'spotlight-navigation-item';

      if (definition.action) {
        control.type = 'button';
        control.dataset.spotlightAction = definition.action;
        control.setAttribute('aria-haspopup', 'menu');
        control.setAttribute('aria-expanded', 'false');
        control.setAttribute('aria-controls', 'spotlight-language-menu');
      } else {
        control.href = localizedRoute(definition.route, locale);
      }

      control.setAttribute('aria-label', copy.items[index]);
      control.dataset.spotlightIndex = String(index);

      if (definition.iconFile) {
        var iconMask = document.createElement('span');
        iconMask.className = 'spotlight-navigation-icon spotlight-navigation-icon-mask';
        iconMask.setAttribute('aria-hidden', 'true');
        iconMask.style.setProperty('--spotlight-icon-url', 'url("' + definition.iconFile + '")');
        control.appendChild(iconMask);
      } else {
        control.innerHTML = createIcon(definition.icon);
      }

      var label = document.createElement('span');
      label.className = 'spotlight-navigation-label';
      label.setAttribute('aria-hidden', 'true');
      label.textContent = copy.items[index];
      control.appendChild(label);
      nav.appendChild(control);
    });

    shell.appendChild(nav);
    document.body.appendChild(shell);
    document.body.classList.add('spotlight-navigation-enabled');

    var items = Array.prototype.slice.call(nav.querySelectorAll('.spotlight-navigation-item'));
    var languageIndex = definitions.length - 1;
    var languageButton = items[languageIndex];
    var presentedIndex = activeIndex;
    setCurrentItem(items, activeIndex);
    setPresentedItem(nav, items, presentedIndex);

    function present(index) {
      presentedIndex = index;
      setPresentedItem(nav, items, presentedIndex);
    }

    var languageMenu = document.createElement('div');
    languageMenu.className = 'spotlight-language-menu';
    languageMenu.id = 'spotlight-language-menu';
    languageMenu.setAttribute('role', 'menu');
    languageMenu.setAttribute('aria-label', copy.languageMenu);
    languageMenu.hidden = true;

    LANGUAGES.forEach(function (language) {
      var option = document.createElement('a');
      var isCurrent = language.locale === locale;
      option.className = 'spotlight-language-option';
      option.href = getLanguageTarget(language.locale);
      option.textContent = language.label;
      option.setAttribute('role', 'menuitem');
      option.dataset.languageOption = language.locale;
      option.classList.toggle('is-current-language', isCurrent);

      if (isCurrent) option.setAttribute('aria-current', 'true');

      option.addEventListener('click', function (event) {
        var i18n = window.PkLavcI18n;
        if (i18n && typeof i18n.setStoredLanguage === 'function') {
          i18n.setStoredLanguage(language.locale);
        }

        if (language.locale === locale) {
          event.preventDefault();
          setLanguageMenuOpen(false);
          languageButton.focus();
          return;
        }

        if (i18n && typeof i18n.getEnglishRoute === 'function' && typeof i18n.resolveLocalizedRoute === 'function') {
          event.preventDefault();
          i18n.resolveLocalizedRoute(i18n.getEnglishRoute(window.location.pathname), language.locale).then(function (targetPath) {
            window.location.assign(appendCurrentLocation(targetPath));
          });
        }
      });

      languageMenu.appendChild(option);
    });

    shell.insertBefore(languageMenu, nav);

    function setLanguageMenuOpen(shouldOpen) {
      shell.classList.toggle('is-language-menu-open', shouldOpen);
      document.body.classList.toggle('spotlight-language-menu-open', shouldOpen);
      languageMenu.hidden = !shouldOpen;
      languageButton.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
      present(shouldOpen ? languageIndex : activeIndex);
    }

    languageButton.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      setLanguageMenuOpen(languageMenu.hidden);
    });

    items.forEach(function (item, index) {
      item.addEventListener('pointerenter', function () {
        present(index);
      });
      item.addEventListener('focus', function () {
        present(index);
      });
    });

    nav.addEventListener('pointerleave', function () {
      present(languageMenu.hidden ? activeIndex : languageIndex);
    });

    nav.addEventListener('focusout', function (event) {
      if (!nav.contains(event.relatedTarget)) present(languageMenu.hidden ? activeIndex : languageIndex);
    });

    document.addEventListener('click', function (event) {
      if (!languageMenu.hidden && !shell.contains(event.target)) {
        setLanguageMenuOpen(false);
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !languageMenu.hidden) {
        setLanguageMenuOpen(false);
        languageButton.focus();
      }
    });

    window.addEventListener('resize', function () {
      updateIndicator(nav, items[presentedIndex]);
    }, { passive: true });

    window.addEventListener('load', function () {
      updateIndicator(nav, items[presentedIndex]);
    }, { once: true });

    if ('ResizeObserver' in window) {
      state.navigationObserver = new ResizeObserver(function () {
        updateIndicator(nav, items[presentedIndex]);
      });
      state.navigationObserver.observe(nav);
      items.forEach(function (item) {
        state.navigationObserver.observe(item);
      });
    }
  }

  function init() {
    createNavigation();
  }

  window.PkLavcSpotlightNavigation = {
    init: init
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
}());
