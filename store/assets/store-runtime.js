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
  labels.filterSearch = locale === 'pt' ? 'Buscar opções' : locale === 'es' ? 'Buscar opciones' : labels.filterSearch;

  var numberLocale = locale === 'pt' ? 'pt-BR' : locale === 'es' ? 'es-ES' : 'en-US';
  var grid = document.querySelector('[data-store-grid]');
  var search = document.querySelector('[data-store-search]');
  var currency = document.querySelector('[data-currency]');
  var minInput = document.querySelector('[data-min-price]');
  var maxInput = document.querySelector('[data-max-price]');
  var count = document.querySelector('[data-result-count]');
  var empty = document.querySelector('[data-no-results]');
  var loading = document.querySelector('[data-store-loading]');
  var dynamicFilters = document.querySelector('[data-dynamic-filters]');
  var sort = document.querySelector('[data-sort]');
  var clearButton = document.querySelector('[data-clear-filters]');
  var inStockInput = document.querySelector('[data-in-stock]');

  if (!grid || !search || !currency || !count || !dynamicFilters) return;

  var filterSidebar = document.querySelector('.filter-sidebar');
  var filterHeading = filterSidebar && filterSidebar.querySelector('.filter-sidebar-heading');
  var mobileFilterToggle = null;

  function setupLayoutControls() {
    grid.dataset.columns = '4';
    document.querySelectorAll('[data-columns]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.columns === '4'));
    });

    if (!filterSidebar || !filterHeading || filterHeading.querySelector('[data-mobile-filter-toggle]')) return;

    mobileFilterToggle = document.createElement('button');
    mobileFilterToggle.type = 'button';
    mobileFilterToggle.className = 'mobile-filter-toggle';
    mobileFilterToggle.dataset.mobileFilterToggle = '';
    mobileFilterToggle.setAttribute('aria-expanded', 'false');
    mobileFilterToggle.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
        '<path d="M4 7h10M18 7h2M4 17h2M10 17h10M14 4v6M8 14v6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
      '</svg><span>' + (locale === 'pt' ? 'Filtros' : locale === 'es' ? 'Filtros' : 'Filters') + '</span>';
    filterHeading.insertBefore(mobileFilterToggle, filterHeading.firstChild);

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

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function normalizeCategory(value) {
    var text = String(value || 'Other').trim();
    return text || 'Other';
  }

  function priceLabel(product) {
    var amount = Number(product.price);
    if (!Number.isFinite(amount)) return '';
    try {
      return new Intl.NumberFormat(numberLocale, {
        style: 'currency',
        currency: product.currency || 'USD',
        maximumFractionDigits: 2
      }).format(amount);
    } catch (error) {
      return amount.toFixed(2) + ' ' + (product.currency || '');
    }
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
    var attributes = product.attributes && typeof product.attributes === 'object' ? product.attributes : {};
    var searchText = [
      product.name, product.vendor, product.category, product.program
    ].concat(Object.values(attributes)).filter(Boolean).join(' ').toLowerCase();
    var available = product.available === true ? 'true' : product.available === false ? 'false' : 'unknown';
    var priceText = priceLabel(product) || labels.checkPrice;
    var oldPriceText = discount ? priceLabel(Object.assign({}, product, { price: old })) : '';

    var article = document.createElement('article');
    article.className = 'store-card';
    article.dataset.productId = String(product.id || product.url || '');
    article.dataset.category = normalizeCategory(product.category);
    article.dataset.vendor = String(product.vendor || '');
    article.dataset.program = String(product.program || '');
    article.dataset.currency = String(product.currency || '');
    article.dataset.price = Number.isFinite(price) ? String(price) : '';
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
        '<div class="store-price-row"><strong>' + esc(priceText) + '</strong>' + (oldPriceText ? '<del>' + esc(oldPriceText) + '</del>' : '') + '</div>' +
        '<a class="store-cta" href="' + esc(product.url) + '" target="_blank" rel="sponsored noopener noreferrer">' + esc(labels.view) + '<span aria-hidden="true"> ↗</span></a>' +
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
    var currencies = unique(products.map(function (p) { return p.currency; }));
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

    while (currency.options.length > 1) currency.remove(1);
    currencies.forEach(function (code) {
      var option = document.createElement('option');
      option.value = code;
      option.textContent = code;
      currency.appendChild(option);
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
      return card.dataset.currency === currency.value && card.dataset.price !== '';
    }).map(function (card) {
      return Number(card.dataset.price);
    });

    if (!currency.value || !matching.length) {
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
      var priceMatch = !currency.value ||
        (card.dataset.currency === currency.value && card.dataset.price !== '' && price >= low && price <= high);
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
      if ((mode === 'price-asc' || mode === 'price-desc') && a.dataset.currency !== b.dataset.currency) {
        return a.dataset.currency.localeCompare(b.dataset.currency);
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
      currencyBounds();
      applyFilters();
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
      currency.value = '';
      currencyBounds();
      applyFilters();
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

  async function loadProducts() {
    if (loading) loading.hidden = false;
    try {
      var response = await fetch('/store/products.json', {
        cache: 'no-store',
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      var payload = await response.json();
      products = Array.isArray(payload.products)
        ? payload.products.filter(function (p) { return p && p.name && p.url && p.picture; })
        : [];
      renderProducts();
      document.body.dataset.storeProductsLoaded = 'true';
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

  setupLayoutControls();
  bindControls();
  loadProducts();
}());
