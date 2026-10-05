(function () {
  'use strict';

  // Static shell; product inventory is sourced exclusively from /store/products.json.

  var locale = /^\/store\/pt\/?/.test(location.pathname) ? 'pt' :
    /^\/store\/es\/?/.test(location.pathname) ? 'es' : 'en';

  var labels = {
    en: {
      filterCategory: 'Category', filterBrand: 'Brand', filterStore: 'Store', filterSearch: 'Search options',
      checkPrice: 'Check price', view: 'View offer', noResults: 'No products found.',
      loadError: 'Products could not be loaded. Try again shortly.'
    },
    pt: {
      filterCategory: 'Categoria', filterBrand: 'Marca', filterStore: 'Loja',
      checkPrice: 'Consultar preço', view: 'Ver oferta', noResults: 'Nenhum produto encontrado.',
      loadError: 'Não foi possível carregar os produtos. Tente novamente em instantes.'
    },
    es: {
      filterCategory: 'Categoría', filterBrand: 'Marca', filterStore: 'Tienda',
      checkPrice: 'Consultar precio', view: 'Ver oferta', noResults: 'No se encontraron productos.',
      loadError: 'No fue posible cargar los productos. Inténtalo de nuevo en unos instantes.'
    }
  }[locale];
  labels.currencyAuto = locale === 'pt' ? 'Autom\u00e1tica' : locale === 'es' ? 'Autom\u00e1tica' : 'Auto';
  labels.filterSearch = locale === 'pt' ? 'Buscar opções' : locale === 'es' ? 'Buscar opciones' : labels.filterSearch;

  var numberLocale = locale === 'pt' ? 'pt-BR' : locale === 'es' ? 'es-ES' : 'en-US';
  var currencyTools = window.PKLAVCStoreCurrency;
  var grid = document.querySelector('[data-store-grid]');
  var search = document.querySelector('[data-store-search]');
  var currency = document.querySelector('[data-currency]');
  var currencyNote = document.querySelector('[data-currency-note]');
  var defaultCurrencyNote = currencyNote ? currencyNote.textContent : '';
  var minInput = document.querySelector('[data-min-price]');
  var maxInput = document.querySelector('[data-max-price]');
  var count = document.querySelector('[data-result-count]');
  var empty = document.querySelector('[data-no-results]');
  var loading = document.querySelector('[data-store-loading]');
  var dynamicFilters = document.querySelector('[data-dynamic-filters]');
  var sort = document.querySelector('[data-sort]');
  var clearButton = document.querySelector('[data-clear-filters]');
  var inStockInput = document.querySelector('[data-in-stock]');

  if (!grid || !search || !currency || !count || !dynamicFilters || !currencyTools) return;

  var filterSidebar = document.querySelector('.filter-sidebar');
  var filterHeading = filterSidebar && filterSidebar.querySelector('.filter-sidebar-heading');
  var resultsToolbar = document.querySelector('.results-toolbar');
  var mobileFilterToggle = null;

  function setupLayoutControls() {
    grid.dataset.columns = '4';
    document.querySelectorAll('[data-columns]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.columns === '4'));
    });

    if (!filterSidebar || !filterHeading || !resultsToolbar || resultsToolbar.querySelector('[data-mobile-filter-toggle]')) return;

    mobileFilterToggle = document.createElement('button');
    mobileFilterToggle.type = 'button';
    mobileFilterToggle.className = 'mobile-filter-toggle';
    mobileFilterToggle.dataset.mobileFilterToggle = '';
    mobileFilterToggle.setAttribute('aria-expanded', 'false');
    mobileFilterToggle.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
        '<path d="M4 7h10M18 7h2M4 17h2M10 17h10M14 4v6M8 14v6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
      '</svg><span>' + (locale === 'pt' ? 'Filtros' : locale === 'es' ? 'Filtros' : 'Filters') + '</span>';
    resultsToolbar.insertBefore(mobileFilterToggle, resultsToolbar.firstChild);

    mobileFilterToggle.addEventListener('click', function () {
      var open = filterSidebar.classList.toggle('is-open');
      mobileFilterToggle.setAttribute('aria-expanded', String(open));
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 760 && filterSidebar.classList.contains('is-open')) {
        filterSidebar.classList.remove('is-open');
        mobileFilterToggle.setAttribute('aria-expanded', 'false');
      }
    }, { passive: true });
  }

  var products = [];
  var cards = [];
  var defaultOrder = [];
  var geoCountry = '';
  var geoCurrency = locale === 'pt' ? 'BRL' : locale === 'es' ? 'EUR' : 'USD';
  var displayCurrency = geoCurrency;
  var exchangeRates = { EUR: 1 };
  var manualCurrencyKey = 'pklavc.store.displayCurrency.v1';

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function normalizeCategory(value) {
    var text = String(value || 'Other').trim();
    return text || 'Other';
  }

  function priceLabel(amount, code) {
    amount = Number(amount);
    if (!Number.isFinite(amount)) return '';
    try {
      return new Intl.NumberFormat(numberLocale, {
        style: 'currency',
        currency: code || 'USD',
        maximumFractionDigits: 2
      }).format(amount);
    } catch (error) {
      return amount.toFixed(2) + ' ' + (code || '');
    }
  }

  function convertedPrice(amount, sourceCurrency) {
    return currencyTools.convertAmount(amount, sourceCurrency, displayCurrency, exchangeRates);
  }

  function unique(values) {
    return Array.from(new Set(values.filter(Boolean).map(String))).sort(function (a, b) {
      return a.localeCompare(b, numberLocale);
    });
  }

  function productCard(product) {
    var price = Number(product.price);
    var old = Number(product.oldPrice);
    var discount = Number.isFinite(old) && old > price && price > 0
      ? Math.round((1 - price / old) * 100)
      : 0;
    var shownPrice = convertedPrice(price, product.currency);
    var shownOldPrice = discount ? convertedPrice(old, product.currency) : null;
    var shownCurrency = shownPrice == null ? product.currency : displayCurrency;
    var attributes = product.attributes && typeof product.attributes === 'object' ? product.attributes : {};
    var searchText = [
      product.name, product.vendor, product.category, product.program
    ].concat(Object.values(attributes)).filter(Boolean).join(' ').toLowerCase();
    var available = product.available === true ? 'true' : product.available === false ? 'false' : 'unknown';
    var priceText = priceLabel(shownPrice == null ? price : shownPrice, shownCurrency) || labels.checkPrice;
    var oldPriceText = discount ? priceLabel(shownOldPrice == null ? old : shownOldPrice, shownCurrency) : '';

    var article = document.createElement('article');
    article.className = 'store-card';
    article.dataset.productId = String(product.id || product.url || '');
    article.dataset.category = normalizeCategory(product.category);
    article.dataset.vendor = String(product.vendor || '');
    article.dataset.program = String(product.program || '');
    article.dataset.currency = String(product.currency || '');
    article.dataset.basePrice = Number.isFinite(price) ? String(price) : '';
    article.dataset.baseOldPrice = Number.isFinite(old) ? String(old) : '';
    article.dataset.price = Number.isFinite(shownPrice == null ? price : shownPrice) ? String(shownPrice == null ? price : shownPrice) : '';
    article.dataset.displayCurrency = shownCurrency || '';
    article.dataset.available = available;
    article.dataset.attributes = JSON.stringify(attributes);
    article.dataset.search = searchText;

    article.innerHTML =
      '<a class="store-image-wrap" href="' + esc(product.url) + '" target="_blank" rel="sponsored noopener noreferrer" aria-label="' + esc(product.name) + '">' +
        '<img class="store-image" src="' + esc(product.picture) + '" alt="' + esc(product.name) + '" loading="lazy" referrerpolicy="no-referrer">' +
        (product.badge ? '<span class="store-badge">' + esc(product.badge) + '</span>' : '') +
        (discount ? '<span class="store-discount">-' + discount + '%</span>' : '') +
      '</a>' +
      '<div class="store-card-body">' +
        '<div class="store-card-meta"><span>' + esc(product.program || labels.filterStore) + '</span><span>' + esc(product.vendor || '') + '</span></div>' +
        '<h2>' + esc(product.name) + '</h2>' +
        (product.description ? '<p class="store-description">' + esc(String(product.description).slice(0, 220)) + '</p>' : '') +
        '<div class="store-price-row"><strong data-price-label>' + esc(priceText) + '</strong>' + (oldPriceText ? '<del data-old-price-label>' + esc(oldPriceText) + '</del>' : '') + '</div>' +
        '<a class="store-cta" href="' + esc(product.url) + '" target="_blank" rel="sponsored noopener noreferrer">' + esc(labels.view) + '<span aria-hidden="true"> ↗︎</span></a>' +
      '</div>';

    var image = article.querySelector('.store-image');
    if (image) image.addEventListener('error', function () {
      image.hidden = true;
      var wrap = image.closest('.store-image-wrap');
      if (wrap) wrap.classList.add('image-unavailable');
    }, { once: true });

    return article;
  }

  function filterSection(title, key, values, attributeKey) {
    if (!values.length) return '';
    var attribute = attributeKey ? ' data-attribute-key="' + esc(attributeKey) + '"' : '';
    var searchLabel = title + ': ' + labels.filterSearch;
    return '<details class="filter-group" data-filter-group><summary class="filter-group-summary"><span>' + esc(title) + '</span><span class="filter-group-count" data-filter-selected-count hidden></span></summary>' +
      '<div class="filter-group-content"><label class="filter-search-wrap"><span class="visually-hidden">' + esc(searchLabel) + '</span><input class="filter-group-search" type="search" data-filter-search placeholder="' + esc(labels.filterSearch + ' ' + title.toLowerCase()) + '" aria-label="' + esc(searchLabel) + '" autocomplete="off"></label>' +
      '<div class="filter-options">' + values.map(function (value) {
        return '<label class="filter-option"><input type="checkbox" data-filter-key="' + esc(key) + '"' + attribute + ' value="' + esc(value) + '"><span>' + esc(value) + '</span></label>';
      }).join('') + '</div></div></details>';
  }

  function filterSearchKey(value) {
    return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  }

  function updateFilterGroups() {
    if (!dynamicFilters) return;
    dynamicFilters.querySelectorAll('[data-filter-group]').forEach(function (group) {
      var selected = group.querySelectorAll('[data-filter-key]:checked').length;
      var countBadge = group.querySelector('[data-filter-selected-count]');
      if (countBadge) {
        countBadge.textContent = String(selected);
        countBadge.hidden = selected === 0;
      }
      group.classList.toggle('has-selections', selected > 0);
    });
  }

  function renderFilters() {
    var categories = unique(products.map(function (p) { return p.category; }));
    var vendors = unique(products.map(function (p) { return p.vendor; }));
    var programs = unique(products.map(function (p) { return p.program; }));
    var attributeKeys = unique(products.flatMap(function (p) {
      return Object.keys(p.attributes && typeof p.attributes === 'object' ? p.attributes : {});
    }));

    dynamicFilters.innerHTML =
      filterSection(labels.filterCategory, 'category', categories) +
      filterSection(labels.filterBrand, 'vendor', vendors) +
      filterSection(labels.filterStore, 'program', programs) +
      attributeKeys.map(function (key) {
        return filterSection(key, 'attribute', unique(products.map(function (p) {
          return p.attributes && typeof p.attributes[key] === 'string' ? p.attributes[key] : '';
        })), key);
      }).join('');

    dynamicFilters.querySelectorAll('[data-filter-search]').forEach(function (input) {
      input.addEventListener('input', function () {
        var query = filterSearchKey(input.value);
        var group = input.closest('[data-filter-group]');
        if (!group) return;
        group.querySelectorAll('.filter-option').forEach(function (option) {
          var checkbox = option.querySelector('[data-filter-key]');
          var matches = !query || filterSearchKey(option.textContent).indexOf(query) >= 0;
          option.hidden = !matches && !(checkbox && checkbox.checked);
        });
      });
    });

  }

  function valuesFor(key, attributeKey) {
    var selector = '[data-filter-key="' + key + '"]' + (attributeKey ? '[data-attribute-key="' + attributeKey + '"]' : '');
    return Array.prototype.filter.call(document.querySelectorAll(selector), function (input) {
      return input.checked;
    }).map(function (input) {
      return input.value;
    });
  }

  function currencyBounds() {
    var matching = cards.filter(function (card) {
      return card.dataset.displayCurrency === displayCurrency && card.dataset.price !== '';
    }).map(function (card) {
      return Number(card.dataset.price);
    });

    if (!matching.length) {
      minInput.value = '';
      maxInput.value = '';
      minInput.disabled = true;
      maxInput.disabled = true;
      return;
    }

    var low = Math.min.apply(null, matching);
    var high = Math.max.apply(null, matching);
    minInput.disabled = false;
    maxInput.disabled = false;
    minInput.min = low;
    minInput.max = high;
    maxInput.min = low;
    maxInput.max = high;
    minInput.value = low;
    maxInput.value = high;
  }

  function updateAutoCurrencyOption() {
    var automatic = currency.querySelector('option[value="auto"]');
    if (automatic) automatic.textContent = labels.currencyAuto + ' (' + geoCurrency + ')';
  }

  function populateCurrencyOptions() {
    var automatic = currency.querySelector('option[value="auto"]');
    currency.replaceChildren(automatic);
    currencyTools.currencies.forEach(function (code) {
      var option = document.createElement('option');
      option.value = code;
      option.textContent = code;
      currency.appendChild(option);
    });
  }

  function updateDisplayedPrices() {
    var missingConversion = false;
    cards.forEach(function (card) {
      var base = Number(card.dataset.basePrice);
      var old = Number(card.dataset.baseOldPrice);
      var current = convertedPrice(base, card.dataset.currency);
      var previous = Number.isFinite(old) ? convertedPrice(old, card.dataset.currency) : null;
      var shownCurrency = current == null ? card.dataset.currency : displayCurrency;
      if (current == null && card.dataset.currency !== displayCurrency) missingConversion = true;
      card.dataset.price = current == null ? card.dataset.basePrice : String(current);
      card.dataset.displayCurrency = shownCurrency || '';
      var currentLabel = card.querySelector('[data-price-label]');
      if (currentLabel) currentLabel.textContent = priceLabel(current == null ? base : current, shownCurrency) || labels.checkPrice;
      var oldLabel = card.querySelector('[data-old-price-label]');
      if (oldLabel && Number.isFinite(old)) oldLabel.textContent = priceLabel(previous == null ? old : previous, shownCurrency);
    });
    if (currencyNote) {
      currencyNote.textContent = missingConversion
        ? (locale === 'pt'
          ? 'Alguns preços estão na moeda original porque a conversão está temporariamente indisponível.'
          : locale === 'es'
            ? 'Algunos precios siguen en su moneda original porque la conversión no está disponible temporalmente.'
            : 'Some prices remain in their original currency because conversion is temporarily unavailable.')
        : defaultCurrencyNote;
    }
    currencyBounds();
    if (sort && (sort.value === 'price-asc' || sort.value === 'price-desc')) sortCards();
    applyFilters();
  }

  var lastProductsRenderedSignature = null;
  function notifyProductsRendered() {
    var visibleCards = cards.filter(function (card) {
      return !card.classList.contains('is-filtered-out') && !card.hidden;
    });
    var signature = [grid.dataset.columns || '', visibleCards.map(function (card) {
      return card.dataset.productId || '';
    }).join(',')].join('|');

    if (signature === lastProductsRenderedSignature) return;
    lastProductsRenderedSignature = signature;

    document.dispatchEvent(new CustomEvent('store:products-rendered', {
      detail: {
        total: cards.length,
        visible: visibleCards.length
      }
    }));
  }

  function applyFilters() {
    var q = (search.value || '').trim().toLowerCase();
    var category = valuesFor('category');
    var vendor = valuesFor('vendor');
    var program = valuesFor('program');
    var low = minInput.value === '' ? -Infinity : Number(minInput.value);
    var high = maxInput.value === '' ? Infinity : Number(maxInput.value);
    var visible = 0;

    cards.forEach(function (card) {
      var attrs = {};
      try { attrs = JSON.parse(card.dataset.attributes || '{}'); } catch (error) {}
      var attrMatch = Array.prototype.every.call(
        document.querySelectorAll('[data-filter-key="attribute"]:checked'),
        function (input) {
          return input.dataset.attributeKey && String(attrs[input.dataset.attributeKey] || '') === input.value;
        }
      );
      var price = Number(card.dataset.price);
      var priceMatch = card.dataset.displayCurrency !== displayCurrency || card.dataset.price === '' || (price >= low && price <= high);
      var show =
        (!q || (card.dataset.search || '').indexOf(q) >= 0) &&
        (!category.length || category.indexOf(card.dataset.category) >= 0) &&
        (!vendor.length || vendor.indexOf(card.dataset.vendor) >= 0) &&
        (!program.length || program.indexOf(card.dataset.program) >= 0) &&
        attrMatch &&
        (!inStockInput.checked || card.dataset.available === 'true') &&
        priceMatch;

      card.classList.toggle('is-filtered-out', !show);
      card.hidden = !show;
      if (show) visible += 1;
    });

    count.textContent = visible;
    updateFilterGroups();
    if (empty) {
      empty.textContent = labels.noResults;
      empty.hidden = visible !== 0;
    }
    notifyProductsRendered();
  }

  function sortCards() {
    var mode = sort.value;
    cards.sort(function (a, b) {
      var pa = Number(a.dataset.price) || 0;
      var pb = Number(b.dataset.price) || 0;
      if ((mode === 'price-asc' || mode === 'price-desc') && a.dataset.displayCurrency !== b.dataset.displayCurrency) {
        return a.dataset.displayCurrency.localeCompare(b.dataset.displayCurrency);
      }
      if (mode === 'price-asc') return pa - pb;
      if (mode === 'price-desc') return pb - pa;
      if (mode === 'name') return a.querySelector('h2').textContent.localeCompare(b.querySelector('h2').textContent, numberLocale);
      return defaultOrder.indexOf(a) - defaultOrder.indexOf(b);
    });
    cards.forEach(function (card) { grid.appendChild(card); });
  }

  function renderProducts() {
    grid.replaceChildren();
    cards = products.map(productCard);
    defaultOrder = cards.slice();
    cards.forEach(function (card) { grid.appendChild(card); });
    renderFilters();
    currencyBounds();
    applyFilters();
  }

  function bindControls() {
    search.addEventListener('input', applyFilters);
    currency.addEventListener('change', function () {
      if (currency.value === 'auto') {
        try { localStorage.removeItem(manualCurrencyKey); } catch (error) {}
        displayCurrency = geoCurrency;
      } else {
        displayCurrency = currency.value;
        try { localStorage.setItem(manualCurrencyKey, displayCurrency); } catch (error) {}
      }
      updateDisplayedPrices();
    });
    minInput.addEventListener('input', applyFilters);
    maxInput.addEventListener('input', applyFilters);
    inStockInput.addEventListener('change', applyFilters);
    dynamicFilters.addEventListener('change', applyFilters);

    if (clearButton) clearButton.addEventListener('click', function () {
      document.querySelectorAll('[data-filter-key], [data-in-stock]').forEach(function (input) {
        input.checked = false;
      });
      search.value = '';
      currency.value = 'auto';
      displayCurrency = geoCurrency;
      try { localStorage.removeItem(manualCurrencyKey); } catch (error) {}
      updateDisplayedPrices();
    });

    if (sort) sort.addEventListener('change', function () {
      sortCards();
      applyFilters();
    });

    document.querySelectorAll('[data-columns]').forEach(function (button) {
      button.addEventListener('click', function () {
        grid.dataset.columns = button.dataset.columns;
        document.querySelectorAll('[data-columns]').forEach(function (other) {
          other.setAttribute('aria-pressed', String(other === button));
        });
        notifyProductsRendered();
      });
    });
  }

  function browserRegion() {
    var language = String(navigator.language || '').toUpperCase();
    var match = /[-_]([A-Z]{2})$/.exec(language);
    return match ? match[1] : '';
  }

  function browserShopperLanguage() {
    var languages = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || ''];
    for (var index = 0; index < languages.length; index += 1) {
      if (/^(pt|es)(?:-|$)/i.test(String(languages[index] || ''))) return languages[index];
    }
    return navigator.language || '';
  }

  async function detectCountry() {
    var cacheKey = 'pklavc.store.geo.v1';
    try {
      var cached = JSON.parse(sessionStorage.getItem(cacheKey) || 'null');
      if (cached && cached.country && Date.now() - cached.at < 30 * 60 * 1000) return cached.country;
    } catch (error) {}

    var controller = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = controller ? setTimeout(function () { controller.abort(); }, 2000) : null;
    try {
      var response = await fetch('https://api.pklavc.com/ads/geo', {
        mode: 'cors', credentials: 'omit', cache: 'no-store',
        signal: controller ? controller.signal : undefined
      });
      if (!response.ok) throw new Error('geolocation_unavailable');
      var data = await response.json();
      var country = String(data && data.country || '').toUpperCase();
      if (!/^[A-Z]{2}$/.test(country)) throw new Error('geolocation_invalid');
      try { sessionStorage.setItem(cacheKey, JSON.stringify({ country: country, at: Date.now() })); } catch (error) {}
      return country;
    } catch (error) {
      return '';
    } finally {
      if (timer) clearTimeout(timer);
    }
  }

  function readCachedRates() {
    try {
      var cached = JSON.parse(localStorage.getItem('pklavc.store.exchangeRates.v1') || 'null');
      if (cached && cached.rates && typeof cached.rates === 'object') return cached;
    } catch (error) {}
    return null;
  }

  async function loadExchangeRates() {
    var cached = readCachedRates();
    var required = currencyTools.currencies.concat(products.map(function (product) { return product.currency; }));
    var cacheHasCurrencies = cached && required.every(function (code) { return code === 'EUR' || Number(cached.rates[code]) > 0; });
    if (cacheHasCurrencies && Date.now() - Number(cached.updatedAt || 0) < 12 * 60 * 60 * 1000) {
      exchangeRates = cached.rates;
      return;
    }

    var quotes = Array.from(new Set(required.map(function (code) { return String(code || '').toUpperCase(); })))
      .filter(function (code) { return code && code !== 'EUR'; });
    var controller = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = controller ? setTimeout(function () { controller.abort(); }, 5000) : null;
    try {
      var url = 'https://api.frankfurter.dev/v2/rates?base=EUR&quotes=' + encodeURIComponent(quotes.join(','));
      var response = await fetch(url, { signal: controller ? controller.signal : undefined });
      if (!response.ok) throw new Error('exchange_rates_unavailable');
      var rows = await response.json();
      if (!Array.isArray(rows) || !rows.length) throw new Error('exchange_rates_invalid');
      exchangeRates = currencyTools.rowsToRates(rows);
      try {
        localStorage.setItem('pklavc.store.exchangeRates.v1', JSON.stringify({
          rates: exchangeRates, updatedAt: Date.now()
        }));
      } catch (error) {}
    } catch (error) {
      if (cached) {
        exchangeRates = cached.rates;
      }
    } finally {
      if (timer) clearTimeout(timer);
    }
  }

  async function prepareCatalog(rawProducts) {
    var detected = await detectCountry();
    geoCountry = detected || browserRegion() || (locale === 'pt' ? 'BR' : '');
    geoCurrency = currencyTools.currencyForCountry(geoCountry) || (locale === 'pt' ? 'BRL' : locale === 'es' ? 'EUR' : 'USD');
    var manualCurrency = '';
    try { manualCurrency = localStorage.getItem(manualCurrencyKey) || ''; } catch (error) {}
    displayCurrency = currencyTools.currencies.indexOf(manualCurrency) >= 0 ? manualCurrency : geoCurrency;
    currency.value = currencyTools.currencies.indexOf(manualCurrency) >= 0 ? manualCurrency : 'auto';
    updateAutoCurrencyOption();

    var preferredLanguage = '';
    try {
      var savedLanguage = localStorage.getItem('pklavc.preferredLanguage') || '';
      if (/^(en|pt|es)$/.test(savedLanguage)) preferredLanguage = savedLanguage;
    } catch (error) {}
    var shopperLanguage = preferredLanguage || browserShopperLanguage();
    var allowShopee = currencyTools.shopeeAllowed(locale, shopperLanguage, geoCountry);
    products = rawProducts.filter(function (product) {
      return allowShopee || !/shopee/i.test(String(product.program || ''));
    });
    renderProducts();
    document.body.dataset.storeProductsLoaded = 'true';
    loadExchangeRates().then(updateDisplayedPrices);
  }

  async function loadProducts() {
    if (loading) loading.hidden = false;
    try {
      var response = await fetch('/store/products.json', {
        cache: 'no-store',
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      var payload = await response.json();
      var catalog = Array.isArray(payload.products)
        ? payload.products.filter(function (p) { return p && p.name && p.url && p.picture; })
        : [];
      await prepareCatalog(catalog);
    } catch (error) {
      console.error('Store catalog load failed:', error);
      products = [];
      cards = [];
      grid.replaceChildren();
      count.textContent = '0';
      if (empty) {
        empty.textContent = labels.loadError;
        empty.hidden = false;
      }
      document.body.dataset.storeProductsLoaded = 'error';
      notifyProductsRendered();
    } finally {
      if (loading) loading.hidden = true;
    }
  }

  populateCurrencyOptions();
  setupLayoutControls();
  bindControls();
  loadProducts();
}());
