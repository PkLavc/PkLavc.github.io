(function() {
  'use strict';

  var API_URL = 'https://api.pklavc.com/analytics/map';
  var WORLD_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json';
  var COUNTRY_CODES_URL = 'https://cdn.jsdelivr.net/npm/world-countries@5.1.0/countries.json';
  var locale = document.documentElement.lang === 'pt'
    ? 'pt'
    : document.documentElement.lang === 'es'
      ? 'es'
      : 'en';
  var COPY = {
    en: {
      locale: 'en-US',
      periods: { '7': '7 days', '30': '30 days', '90': '90 days', '365': '1 year', all: 'All time' },
      updatedRecently: 'Updated recently',
      updated: 'Updated',
      unknownCountry: 'Unknown',
      visits: 'visits',
      anonymousVisits: 'anonymous visits',
      selectCountry: 'Select a country',
      selectHelp: 'Hover over or select an illuminated country to inspect its regional activity.',
      noRegions: 'Country activity is available, but no regional subdivision was supplied for these visits.',
      noVisits: 'No anonymous visits have been recorded in this period yet.',
      live: 'Live',
      syncing: 'Syncing',
      syncingDetail: 'Reading aggregate visitor data',
      unavailable: 'Unavailable',
      endpointUnavailable: 'Waiting for the Cloudflare analytics endpoint',
      librariesUnavailable: 'Map libraries could not be loaded',
      assetsUnavailable: 'World map assets could not be loaded'
    },
    pt: {
      locale: 'pt-BR',
      periods: { '7': '7 dias', '30': '30 dias', '90': '90 dias', '365': '1 ano', all: 'Todo o período' },
      updatedRecently: 'Atualizado recentemente',
      updated: 'Atualizado em',
      unknownCountry: 'Desconhecido',
      visits: 'visitas',
      anonymousVisits: 'visitas anônimas',
      selectCountry: 'Selecione um país',
      selectHelp: 'Passe o cursor ou selecione um país iluminado para visualizar sua atividade regional.',
      noRegions: 'Há atividade registrada no país, mas o Cloudflare não forneceu uma subdivisão regional para essas visitas.',
      noVisits: 'Nenhuma visita anônima foi registrada neste período.',
      live: 'Ao vivo',
      syncing: 'Sincronizando',
      syncingDetail: 'Lendo os dados agregados de visitas',
      unavailable: 'Indisponível',
      endpointUnavailable: 'Aguardando a publicação do endpoint de análise no Cloudflare',
      librariesUnavailable: 'Não foi possível carregar as bibliotecas do mapa',
      assetsUnavailable: 'Não foi possível carregar os dados do mapa-múndi'
    },
    es: {
      locale: 'es',
      periods: { '7': '7 días', '30': '30 días', '90': '90 días', '365': '1 año', all: 'Todo el período' },
      updatedRecently: 'Actualizado recientemente',
      updated: 'Actualizado el',
      unknownCountry: 'Desconocido',
      visits: 'visitas',
      anonymousVisits: 'visitas anónimas',
      selectCountry: 'Selecciona un país',
      selectHelp: 'Pasa el cursor o selecciona un país iluminado para consultar su actividad regional.',
      noRegions: 'Hay actividad registrada en el país, pero Cloudflare no proporcionó una subdivisión regional para estas visitas.',
      noVisits: 'Todavía no se registraron visitas anónimas en este período.',
      live: 'En vivo',
      syncing: 'Sincronizando',
      syncingDetail: 'Leyendo los datos agregados de visitas',
      unavailable: 'No disponible',
      endpointUnavailable: 'Esperando la publicación del endpoint de analítica en Cloudflare',
      librariesUnavailable: 'No se pudieron cargar las bibliotecas del mapa',
      assetsUnavailable: 'No se pudieron cargar los datos del mapa mundial'
    }
  };
  var copy = COPY[locale];

  var state = {
    period: '30',
    payload: emptyPayload('30'),
    topology: null,
    countryMetadata: [],
    featuresByCode: new Map(),
    statsByCode: new Map(),
    selectedCode: '',
    svg: null,
    zoom: null,
    path: null,
    mapLayer: null
  };

  var elements = {
    svg: document.getElementById('visitor-world-map'),
    shell: document.getElementById('visitor-map-shell'),
    loading: document.getElementById('visitor-map-loading'),
    tooltip: document.getElementById('visitor-map-tooltip'),
    total: document.getElementById('visitor-total'),
    countries: document.getElementById('visitor-countries'),
    regions: document.getElementById('visitor-regions'),
    status: document.getElementById('visitor-status'),
    updated: document.getElementById('visitor-updated'),
    ranking: document.getElementById('visitor-country-ranking'),
    periodLabel: document.getElementById('visitor-period-label'),
    countryTitle: document.getElementById('visitor-country-title'),
    countryTotal: document.getElementById('visitor-country-total'),
    regionList: document.getElementById('visitor-region-list'),
    reset: document.getElementById('visitor-map-reset')
  };

  function emptyPayload(period) {
    return {
      ok: true,
      generated_at: new Date().toISOString(),
      period: { key: period, days: period === 'all' ? null : Number(period) },
      summary: { visits: 0, countries: 0, regions: 0 },
      countries: []
    };
  }

  function formatNumber(value) {
    return new Intl.NumberFormat(copy.locale).format(Number(value || 0));
  }

  function formatCountryName(code) {
    try {
      return new Intl.DisplayNames([copy.locale], { type: 'region' }).of(code) || code;
    } catch (error) {
      return code;
    }
  }

  function formatUpdatedAt(value) {
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return copy.updatedRecently;
    }

    return copy.updated + ' ' + new Intl.DateTimeFormat(copy.locale, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  function setStatus(label, detail, isError) {
    elements.status.textContent = label;
    elements.updated.textContent = detail;
    elements.status.parentElement.classList.toggle('is-error', Boolean(isError));
  }

  function setLoading(isLoading) {
    elements.loading.classList.toggle('is-hidden', !isLoading);
  }

  function fetchJson(url) {
    return fetch(url, {
      headers: { Accept: 'application/json' },
      credentials: 'omit'
    }).then(function(response) {
      if (!response.ok) {
        throw new Error('Request failed with status ' + response.status);
      }
      return response.json();
    });
  }

  function buildCountryMetadataMap(metadata) {
    var byNumericCode = new Map();

    metadata.forEach(function(country) {
      if (!country || !country.cca2 || !country.ccn3) {
        return;
      }

      byNumericCode.set(String(country.ccn3).padStart(3, '0'), {
        code: String(country.cca2).toUpperCase()
      });
    });

    return byNumericCode;
  }

  function createMapDefinitions(svg) {
    var defs = svg.append('defs');
    var glow = defs.append('filter')
      .attr('id', 'visitor-country-glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');

    glow.append('feGaussianBlur').attr('stdDeviation', 4).attr('result', 'blur');
    glow.append('feMerge')
      .selectAll('feMergeNode')
      .data(['blur', 'SourceGraphic'])
      .enter()
      .append('feMergeNode')
      .attr('in', function(value) { return value; });

    var pointGlow = defs.append('filter')
      .attr('id', 'visitor-point-glow')
      .attr('x', '-100%')
      .attr('y', '-100%')
      .attr('width', '300%')
      .attr('height', '300%');

    pointGlow.append('feGaussianBlur').attr('stdDeviation', 3.5).attr('result', 'pointBlur');
    pointGlow.append('feMerge')
      .selectAll('feMergeNode')
      .data(['pointBlur', 'SourceGraphic'])
      .enter()
      .append('feMergeNode')
      .attr('in', function(value) { return value; });
  }

  function renderMap() {
    if (!state.topology || !window.d3 || !window.topojson) {
      return;
    }

    var width = 1200;
    var height = 620;
    var numericMetadata = buildCountryMetadataMap(state.countryMetadata);
    var featureCollection = window.topojson.feature(
      state.topology,
      state.topology.objects.countries
    );
    var features = featureCollection.features;
    var projection = window.d3.geoNaturalEarth1()
      .fitExtent([[28, 30], [width - 28, height - 30]], { type: 'Sphere' });
    var path = window.d3.geoPath(projection);
    var maxVisits = window.d3.max(state.payload.countries, function(country) {
      return Number(country.visits || 0);
    }) || 1;
    var color = window.d3.scaleSequentialLog()
      .domain([1, Math.max(2, maxVisits)])
      .interpolator(window.d3.interpolateRgbBasis(['#123143', '#00d1ff', '#8b5cf6', '#ff2aaa']));

    state.featuresByCode = new Map();
    state.statsByCode = new Map(state.payload.countries.map(function(country) {
      return [country.code, country];
    }));
    state.path = path;

    features.forEach(function(feature) {
      var metadata = numericMetadata.get(String(feature.id).padStart(3, '0'));
      feature.properties.visitorCode = metadata ? metadata.code : '';
      feature.properties.visitorName = metadata
        ? formatCountryName(metadata.code)
        : (feature.properties.name || copy.unknownCountry);

      if (metadata) {
        state.featuresByCode.set(metadata.code, feature);
      }
    });

    var svg = window.d3.select(elements.svg);
    svg.selectAll('*').remove();
    createMapDefinitions(svg);

    var mapLayer = svg.append('g').attr('class', 'visitor-map-zoom-layer');
    state.svg = svg;
    state.mapLayer = mapLayer;

    mapLayer.append('path')
      .datum({ type: 'Sphere' })
      .attr('class', 'visitor-map-sphere')
      .attr('d', path);

    mapLayer.append('path')
      .datum(window.d3.geoGraticule10())
      .attr('class', 'visitor-map-graticule')
      .attr('d', path);

    mapLayer.append('g')
      .attr('class', 'visitor-map-countries')
      .selectAll('path')
      .data(features)
      .enter()
      .append('path')
      .attr('class', 'visitor-map-country')
      .attr('data-country-code', function(feature) {
        return feature.properties.visitorCode;
      })
      .attr('d', path)
      .attr('fill', function(feature) {
        var stats = state.statsByCode.get(feature.properties.visitorCode);
        return stats && stats.visits ? color(Math.max(1, stats.visits)) : '#101b2b';
      })
      .attr('aria-label', function(feature) {
        var stats = state.statsByCode.get(feature.properties.visitorCode);
        return feature.properties.visitorName + ': ' + formatNumber(stats ? stats.visits : 0) + ' ' + copy.visits;
      })
      .on('mouseenter', function(event, feature) {
        showTooltip(event, feature);
      })
      .on('mousemove', function(event, feature) {
        showTooltip(event, feature);
      })
      .on('mouseleave', hideTooltip)
      .on('click', function(event, feature) {
        event.stopPropagation();
        var code = feature.properties.visitorCode;
        if (code) {
          selectCountry(code, true);
        }
      });

    var activeFeatures = state.payload.countries
      .slice()
      .sort(function(a, b) { return b.visits - a.visits; })
      .slice(0, 18)
      .map(function(country) {
        var feature = state.featuresByCode.get(country.code);
        if (!feature) {
          return null;
        }
        return {
          code: country.code,
          visits: country.visits,
          centroid: path.centroid(feature)
        };
      })
      .filter(function(item) {
        return item && Number.isFinite(item.centroid[0]) && Number.isFinite(item.centroid[1]);
      });

    var pulseLayer = mapLayer.append('g').attr('class', 'visitor-map-points');
    pulseLayer.selectAll('.visitor-map-pulse')
      .data(activeFeatures)
      .enter()
      .append('circle')
      .attr('class', 'visitor-map-pulse')
      .attr('cx', function(item) { return item.centroid[0]; })
      .attr('cy', function(item) { return item.centroid[1]; })
      .attr('r', function(item) { return 6 + Math.min(8, Math.log2(item.visits + 1) * 1.3); })
      .style('animation-delay', function(item, index) { return (index * -0.21) + 's'; });

    pulseLayer.selectAll('.visitor-map-pulse-core')
      .data(activeFeatures)
      .enter()
      .append('circle')
      .attr('class', 'visitor-map-pulse-core')
      .attr('cx', function(item) { return item.centroid[0]; })
      .attr('cy', function(item) { return item.centroid[1]; })
      .attr('r', function(item) { return 2.4 + Math.min(2.2, Math.log2(item.visits + 1) * 0.3); });

    var zoom = window.d3.zoom()
      .scaleExtent([1, 6])
      .translateExtent([[-80, -60], [width + 80, height + 60]])
      .on('zoom', function(event) {
        mapLayer.attr('transform', event.transform);
      });

    svg.call(zoom).on('dblclick.zoom', null);
    svg.on('click', function() {
      selectCountry('', false);
    });
    state.zoom = zoom;

    if (state.selectedCode && state.featuresByCode.has(state.selectedCode)) {
      selectCountry(state.selectedCode, false);
    }
  }

  function showTooltip(event, feature) {
    var code = feature.properties.visitorCode;
    var stats = state.statsByCode.get(code);
    var rect = elements.shell.getBoundingClientRect();
    var tooltipWidth = 180;
    var left = Math.min(rect.width - tooltipWidth - 12, Math.max(12, event.clientX - rect.left + 14));
    var top = Math.min(rect.height - 74, Math.max(12, event.clientY - rect.top - 22));

    elements.tooltip.innerHTML =
      '<strong>' + escapeHtml(feature.properties.visitorName) + '</strong>' +
      '<span>' + formatNumber(stats ? stats.visits : 0) + ' ' + copy.anonymousVisits + '</span>';
    elements.tooltip.style.left = left + 'px';
    elements.tooltip.style.top = top + 'px';
    elements.tooltip.classList.add('is-visible');
  }

  function hideTooltip() {
    elements.tooltip.classList.remove('is-visible');
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function selectCountry(code, focusMap) {
    state.selectedCode = code;

    window.d3.selectAll('.visitor-map-country')
      .classed('is-selected', function() {
        return Boolean(code) && this.getAttribute('data-country-code') === code;
      })
      .classed('is-dimmed', function() {
        return Boolean(code) && this.getAttribute('data-country-code') !== code;
      });

    document.querySelectorAll('.visitor-country-ranking button').forEach(function(button) {
      button.classList.toggle('is-selected', button.getAttribute('data-country-code') === code);
    });

    renderCountryDetail(code);

    if (focusMap && code) {
      focusCountry(code);
    }
  }

  function focusCountry(code) {
    var feature = state.featuresByCode.get(code);
    if (!feature || !state.path || !state.svg || !state.zoom) {
      return;
    }

    var bounds = state.path.bounds(feature);
    var dx = bounds[1][0] - bounds[0][0];
    var dy = bounds[1][1] - bounds[0][1];
    var x = (bounds[0][0] + bounds[1][0]) / 2;
    var y = (bounds[0][1] + bounds[1][1]) / 2;
    var scale = Math.max(1, Math.min(5, 0.72 / Math.max(dx / 1200, dy / 620)));
    var transform = window.d3.zoomIdentity
      .translate(1200 / 2, 620 / 2)
      .scale(scale)
      .translate(-x, -y);

    state.svg.transition()
      .duration(700)
      .call(state.zoom.transform, transform);
  }

  function resetMapView() {
    state.selectedCode = '';
    renderCountryDetail('');

    if (state.svg && state.zoom) {
      state.svg.transition()
        .duration(600)
        .call(state.zoom.transform, window.d3.zoomIdentity);
    }

    window.d3.selectAll('.visitor-map-country')
      .classed('is-selected', false)
      .classed('is-dimmed', false);
    document.querySelectorAll('.visitor-country-ranking button').forEach(function(button) {
      button.classList.remove('is-selected');
    });
  }

  function renderCountryDetail(code) {
    var country = state.statsByCode.get(code);

    if (!country) {
      elements.countryTitle.textContent = copy.selectCountry;
      elements.countryTotal.textContent = '\u2014';
      elements.regionList.innerHTML = '<p>' + escapeHtml(copy.selectHelp) + '</p>';
      return;
    }

    var regions = (country.regions || [])
      .slice()
      .sort(function(a, b) { return b.visits - a.visits; })
      .slice(0, 8);
    var maxRegionVisits = regions.length ? regions[0].visits : 1;

    elements.countryTitle.textContent = formatCountryName(country.code);
    elements.countryTotal.textContent = formatNumber(country.visits);

    if (!regions.length) {
      elements.regionList.innerHTML = '<p>' + escapeHtml(copy.noRegions) + '</p>';
      return;
    }

    elements.regionList.innerHTML = regions.map(function(region) {
      var width = Math.max(5, Math.round((region.visits / maxRegionVisits) * 100));
      return [
        '<div class="visitor-region-row">',
        '<span class="visitor-region-name">', escapeHtml(region.name), '</span>',
        '<span class="visitor-region-value">', formatNumber(region.visits), '</span>',
        '<div class="visitor-region-bar" aria-hidden="true"><span style="width:', width, '%"></span></div>',
        '</div>'
      ].join('');
    }).join('');
  }

  function renderRanking() {
    var countries = state.payload.countries
      .slice()
      .sort(function(a, b) { return b.visits - a.visits; })
      .slice(0, 8);

    if (!countries.length) {
      elements.ranking.innerHTML = '<li class="visitor-ranking-placeholder">' + escapeHtml(copy.noVisits) + '</li>';
      return;
    }

    elements.ranking.innerHTML = countries.map(function(country, index) {
      return [
        '<li><button type="button" data-country-code="', escapeHtml(country.code), '">',
        '<span class="visitor-country-rank">', String(index + 1).padStart(2, '0'), '</span>',
        '<span>', escapeHtml(formatCountryName(country.code)), '</span>',
        '<span class="visitor-country-rank-value">', formatNumber(country.visits), '</span>',
        '</button></li>'
      ].join('');
    }).join('');

    elements.ranking.querySelectorAll('button').forEach(function(button) {
      button.addEventListener('click', function() {
        selectCountry(button.getAttribute('data-country-code') || '', true);
      });
    });
  }

  function renderSummary() {
    elements.total.textContent = formatNumber(state.payload.summary.visits);
    elements.countries.textContent = formatNumber(state.payload.summary.countries);
    elements.regions.textContent = formatNumber(state.payload.summary.regions);
    elements.periodLabel.textContent = copy.periods[state.period] || copy.periods['30'];
    setStatus(copy.live, formatUpdatedAt(state.payload.generated_at), false);
    renderRanking();
    renderCountryDetail(state.selectedCode);
  }

  function loadAnalytics(period) {
    state.period = period;
    setStatus(copy.syncing, copy.syncingDetail, false);

    return Promise.resolve(window.PkLavcGeoVisitReady)
      .catch(function() { return null; })
      .then(function() {
        return fetchJson(API_URL + '?days=' + encodeURIComponent(period));
      })
      .then(function(payload) {
        state.payload = payload && payload.ok ? payload : emptyPayload(period);
        renderSummary();
        renderMap();
      })
      .catch(function() {
        state.payload = emptyPayload(period);
        renderSummary();
        renderMap();
        setStatus(copy.unavailable, copy.endpointUnavailable, true);
      });
  }

  function bindControls() {
    document.querySelectorAll('[data-period]').forEach(function(button) {
      button.addEventListener('click', function() {
        var period = button.getAttribute('data-period') || '30';

        document.querySelectorAll('[data-period]').forEach(function(item) {
          item.classList.toggle('is-active', item === button);
        });

        resetMapView();
        loadAnalytics(period);
      });
    });

    elements.reset.addEventListener('click', resetMapView);
  }

  function init() {
    if (!elements.svg || !window.d3 || !window.topojson) {
      setLoading(false);
      setStatus(copy.unavailable, copy.librariesUnavailable, true);
      return;
    }

    bindControls();

    Promise.all([
      fetchJson(WORLD_URL),
      fetchJson(COUNTRY_CODES_URL)
    ]).then(function(results) {
      state.topology = results[0];
      state.countryMetadata = results[1];
      return loadAnalytics(state.period);
    }).then(function() {
      setLoading(false);
    }).catch(function() {
      setLoading(false);
      setStatus(copy.unavailable, copy.assetsUnavailable, true);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
}());
