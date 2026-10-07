(function (global) {
  'use strict';

  var currencies = [
    'BRL', 'USD', 'EUR', 'GBP', 'CAD', 'AUD', 'MXN', 'ARS', 'CLP', 'COP',
    'JPY', 'CNY', 'INR', 'CHF', 'NZD', 'KRW', 'SGD', 'HKD', 'TRY', 'PLN',
    'CZK', 'HUF', 'SEK', 'NOK', 'DKK', 'AED', 'ILS', 'THB', 'IDR', 'MYR',
    'PHP', 'VND', 'ZAR', 'PEN', 'UYU', 'TWD', 'NGN', 'KES', 'EGP', 'SAR',
    'RON', 'ISK', 'RSD', 'UAH'
  ];

  var countryCurrencies = {
    BR: 'BRL', US: 'USD', CA: 'CAD', MX: 'MXN', AR: 'ARS', CL: 'CLP', CO: 'COP', PE: 'PEN', UY: 'UYU',
    GB: 'GBP', CH: 'CHF', AU: 'AUD', NZ: 'NZD', JP: 'JPY', CN: 'CNY', IN: 'INR', KR: 'KRW', HK: 'HKD',
    TW: 'TWD', SG: 'SGD', ID: 'IDR', MY: 'MYR', TH: 'THB', PH: 'PHP', VN: 'VND', TR: 'TRY', ZA: 'ZAR',
    NG: 'NGN', KE: 'KES', EG: 'EGP', AE: 'AED', SA: 'SAR', IL: 'ILS', PL: 'PLN', CZ: 'CZK', HU: 'HUF',
    RO: 'RON', SE: 'SEK', NO: 'NOK', DK: 'DKK', IS: 'ISK', BG: 'BGN', RS: 'RSD', UA: 'UAH',
    AT: 'EUR', BE: 'EUR', CY: 'EUR', DE: 'EUR', EE: 'EUR', ES: 'EUR', FI: 'EUR', FR: 'EUR', GR: 'EUR',
    HR: 'EUR', IE: 'EUR', IT: 'EUR', LT: 'EUR', LU: 'EUR', LV: 'EUR', MT: 'EUR', NL: 'EUR', PT: 'EUR',
    SI: 'EUR', SK: 'EUR'
  };

  function rowsToRates(rows) {
    var rates = { EUR: 1 };
    (Array.isArray(rows) ? rows : []).forEach(function (row) {
      var rate = Number(row && row.rate);
      var code = String(row && row.quote || '').toUpperCase();
      if (code && Number.isFinite(rate) && rate > 0) rates[code] = rate;
    });
    return rates;
  }

  function convertAmount(amount, source, target, rates) {
    var value = Number(amount);
    var from = String(source || '').toUpperCase();
    var to = String(target || '').toUpperCase();
    if (!Number.isFinite(value) || !from || !to) return null;
    if (from === to) return value;
    var table = rates || {};
    var sourceRate = Number(table[from]);
    var targetRate = Number(table[to]);
    if (!Number.isFinite(sourceRate) || sourceRate <= 0 || !Number.isFinite(targetRate) || targetRate <= 0) return null;
    return value * targetRate / sourceRate;
  }

  function currencyForCountry(country) {
    return countryCurrencies[String(country || '').toUpperCase()] || '';
  }

  function shopeeAllowed(pageLocale, browserLocale, country) {
    return String(pageLocale || '').toLowerCase().indexOf('pt') === 0 ||
      String(browserLocale || '').toLowerCase().indexOf('pt') === 0 ||
      String(country || '').toUpperCase() === 'BR';
  }

  global.PKLAVCStoreCurrency = {
    currencies: currencies.slice(),
    rowsToRates: rowsToRates,
    convertAmount: convertAmount,
    currencyForCountry: currencyForCountry,
    shopeeAllowed: shopeeAllowed
  };
}(window));
