(function () {
  'use strict';

  var ENDPOINT = 'https://newsletter-api.pklavc.com/subscribe';
  var STORAGE_KEY = 'pklavc.newsletter.state.v1';
  var DISMISS_HOURS = 24;
  var SHOW_DELAY_MS = 15000;
  var SCROLL_THRESHOLD = 0.35;
  var previousFocus = null;
  var openTimer = null;

  var copy = {
    en: {
      locale: 'en', title: 'Get the weekly digest',
      description: 'A concise summary of the latest stories published on PkLavc.',
      email: 'Email', placeholder: 'you@example.com', submit: 'Subscribe', close: 'Close newsletter signup',
      privacy: 'You can unsubscribe at any time.', privacyLink: 'Privacy Policy', privacyHref: '/privacy-policy/',
      sending: 'Sending…', success: 'Check your email to confirm your subscription.',
      error: 'We could not process your request. Please try again later.',
      dailyLimit: "Today's subscription limit has been reached. Please try again tomorrow.",
      confirmed: 'Your newsletter subscription is confirmed.'
    },
    pt: {
      locale: 'pt-BR', title: 'Receba o resumo semanal',
      description: 'Um resumo conciso das principais notícias publicadas no PkLavc.',
      email: 'E-mail', placeholder: 'voce@exemplo.com', submit: 'Inscrever-se', close: 'Fechar inscrição da newsletter',
      privacy: 'Você pode cancelar a inscrição a qualquer momento.', privacyLink: 'Política de Privacidade', privacyHref: '/pt/politica-de-privacidade/',
      sending: 'Enviando…', success: 'Verifique seu e-mail para confirmar a inscrição.',
      error: 'Não foi possível processar sua solicitação. Tente novamente mais tarde.',
      dailyLimit: 'Limite diário de novas inscrições atingido. Tente novamente amanhã.',
      confirmed: 'Sua inscrição na newsletter foi confirmada.'
    },
    es: {
      locale: 'es', title: 'Recibe el resumen semanal',
      description: 'Un resumen conciso de las principales noticias publicadas en PkLavc.',
      email: 'Correo electrónico', placeholder: 'tu@ejemplo.com', submit: 'Suscribirse', close: 'Cerrar registro del boletín',
      privacy: 'Puedes darte de baja en cualquier momento.', privacyLink: 'Política de Privacidad', privacyHref: '/es/politica-de-privacidad/',
      sending: 'Enviando…', success: 'Revisa tu correo para confirmar la suscripción.',
      error: 'No pudimos procesar tu solicitud. Inténtalo de nuevo más tarde.',
      dailyLimit: 'Se alcanzó el límite diario de nuevas suscripciones. Inténtalo de nuevo mañana.',
      confirmed: 'Tu suscripción al boletín está confirmada.'
    }
  };

  function localeFromPath() {
    var path = window.location.pathname || '/';
    if (/\/blog\/pt(?:\/|$)/.test(path)) return 'pt';
    if (/\/blog\/es(?:\/|$)/.test(path)) return 'es';
    return 'en';
  }

  function readState() {
    try { return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}'); }
    catch (_) { return {}; }
  }

  function writeState(value) {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value)); }
    catch (_) { /* Storage may be disabled; the form must still work. */ }
  }

  function shouldSuppress(ignoreDismissed) {
    var state = readState();
    if (state.status === 'pending' || state.status === 'confirmed') return true;
    return !ignoreDismissed && state.status === 'dismissed' && Number(state.until || 0) > Date.now();
  }

  function markDismissed() {
    writeState({ status: 'dismissed', until: Date.now() + DISMISS_HOURS * 3600000 });
  }

  function showToast(message) {
    var toast = document.createElement('div');
    toast.className = 'pklavc-newsletter-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = message;
    document.body.appendChild(toast);
    window.setTimeout(function () { toast.remove(); }, 7000);
  }

  function handleConfirmed(copySet) {
    var params = new URLSearchParams(window.location.search);
    if (params.get('newsletter') !== 'confirmed') return false;
    writeState({ status: 'confirmed', confirmedAt: new Date().toISOString() });
    showToast(copySet.confirmed);
    params.delete('newsletter');
    var query = params.toString();
    window.history.replaceState({}, '', window.location.pathname + (query ? '?' + query : '') + window.location.hash);
    return true;
  }

  function ensureManualTrigger() {
    if (document.querySelector('[data-newsletter-open]')) return;
    var footer = document.querySelector('footer.footer-minimal, footer');
    if (!footer) return;
    var entry = document.createElement('div');
    var trigger = document.createElement('button');
    entry.id = 'pklavc-newsletter-footer-entry';
    entry.className = 'pklavc-newsletter-footer-entry';
    trigger.className = 'pklavc-newsletter-footer-trigger';
    trigger.type = 'button';
    trigger.setAttribute('data-newsletter-open', '');
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.setAttribute('aria-controls', 'pklavc-newsletter-dialog');
    trigger.textContent = 'Newsletter';
    entry.appendChild(trigger);
    footer.appendChild(entry);
  }

  function createDialog(copySet) {
    var backdrop = document.createElement('div');
    backdrop.className = 'pklavc-newsletter-backdrop';
    backdrop.hidden = true;
    backdrop.innerHTML =
      '<section class="pklavc-newsletter-dialog" id="pklavc-newsletter-dialog" role="dialog" aria-modal="true" aria-labelledby="pklavc-newsletter-title" aria-describedby="pklavc-newsletter-copy">' +
        '<button class="pklavc-newsletter-close" type="button" aria-label="' + copySet.close + '">&times;</button>' +
        '<div class="pklavc-newsletter-content">' +
          '<p class="pklavc-newsletter-kicker">PkLavc Newsletter</p>' +
          '<h2 class="pklavc-newsletter-title" id="pklavc-newsletter-title">' + copySet.title + '</h2>' +
          '<p class="pklavc-newsletter-copy" id="pklavc-newsletter-copy">' + copySet.description + '</p>' +
          '<form novalidate>' +
            '<label class="pklavc-newsletter-label" for="pklavc-newsletter-email">' + copySet.email + '</label>' +
            '<div class="pklavc-newsletter-row">' +
              '<input class="pklavc-newsletter-email" id="pklavc-newsletter-email" name="email" type="email" inputmode="email" autocomplete="email" maxlength="254" required placeholder="' + copySet.placeholder + '">' +
              '<button class="pklavc-newsletter-submit" type="submit">' + copySet.submit + '</button>' +
            '</div>' +
            '<div class="pklavc-newsletter-honeypot" aria-hidden="true"><label for="pklavc-newsletter-website">Website</label><input id="pklavc-newsletter-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>' +
            '<p class="pklavc-newsletter-privacy">' + copySet.privacy + ' <a href="' + copySet.privacyHref + '">' + copySet.privacyLink + '</a></p>' +
            '<p class="pklavc-newsletter-status" role="status" aria-live="polite"></p>' +
          '</form>' +
        '</div>' +
      '</section>';
    document.body.appendChild(backdrop);
    return backdrop;
  }

  function focusable(backdrop) {
    return Array.prototype.slice.call(backdrop.querySelectorAll('button:not([disabled]), input:not([disabled]), a[href]'));
  }

  function closeDialog(backdrop, dismissed) {
    if (backdrop.hidden) return;
    backdrop.classList.remove('is-open');
    if (dismissed) markDismissed();
    window.setTimeout(function () { backdrop.hidden = true; }, 190);
    document.removeEventListener('keydown', backdrop._keyHandler);
    document.removeEventListener('focusin', backdrop._focusHandler);
    if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
  }

  function openDialog(backdrop, ignoreDismissed) {
    if (!backdrop.hidden || shouldSuppress(ignoreDismissed)) return false;
    previousFocus = document.activeElement;
    backdrop.hidden = false;
    var emailInput = backdrop.querySelector('input[type="email"]');
    window.requestAnimationFrame(function () {
      backdrop.classList.add('is-open');
      emailInput.focus({ preventScroll: true });
    });
    backdrop._keyHandler = function (event) {
      if (event.key === 'Escape') { event.preventDefault(); closeDialog(backdrop, true); return; }
      if (event.key !== 'Tab') return;
      var items = focusable(backdrop);
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    backdrop._focusHandler = function (event) {
      if (!backdrop.hidden && !backdrop.contains(event.target)) emailInput.focus({ preventScroll: true });
    };
    document.addEventListener('keydown', backdrop._keyHandler);
    document.addEventListener('focusin', backdrop._focusHandler);
    return true;
  }

  function init() {
    var localeKey = localeFromPath();
    var copySet = copy[localeKey];
    ensureManualTrigger();
    if (handleConfirmed(copySet) || shouldSuppress(true)) return;
    var backdrop = createDialog(copySet);
    var form = backdrop.querySelector('form');
    var closeButton = backdrop.querySelector('.pklavc-newsletter-close');
    var status = backdrop.querySelector('.pklavc-newsletter-status');
    var submit = backdrop.querySelector('.pklavc-newsletter-submit');

    closeButton.addEventListener('click', function () { closeDialog(backdrop, true); });
    backdrop.addEventListener('mousedown', function (event) {
      if (event.target === backdrop) closeDialog(backdrop, true);
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var email = form.elements.email;
      if (!email.checkValidity()) { email.reportValidity(); return; }
      submit.disabled = true;
      status.textContent = copySet.sending;
      window.fetch(ENDPOINT, {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.value, locale: copySet.locale, source: window.location.pathname, website: form.elements.website.value })
      }).then(function (response) {
        return response.json().catch(function () { return {}; }).then(function (body) {
          if (!response.ok) {
            var requestError = new Error('subscribe_failed');
            requestError.code = body && body.code;
            throw requestError;
          }
          return body;
        });
      }).then(function () {
        writeState({ status: 'pending', requestedAt: new Date().toISOString() });
        status.textContent = copySet.success;
        form.reset();
        window.setTimeout(function () { closeDialog(backdrop, false); }, 2600);
      }).catch(function (error) {
        status.textContent = error && error.code === 'newsletter_daily_limit' ? copySet.dailyLimit : copySet.error;
        submit.disabled = false;
      });
    });

    var opened = false;
    function stopAutomaticOpen() {
      window.clearTimeout(openTimer);
      window.removeEventListener('scroll', onScroll);
    }
    function showOnce() {
      if (opened) return;
      if (openDialog(backdrop, false)) {
        opened = true;
        stopAutomaticOpen();
      }
    }
    function onScroll() {
      var available = document.documentElement.scrollHeight - window.innerHeight;
      if (available > 0 && window.scrollY / available >= SCROLL_THRESHOLD) showOnce();
    }
    Array.prototype.forEach.call(document.querySelectorAll('[data-newsletter-open]'), function (trigger) {
      trigger.addEventListener('click', function () {
        if (openDialog(backdrop, true)) {
          opened = true;
          stopAutomaticOpen();
        }
      });
    });
    if (!shouldSuppress(false)) {
      openTimer = window.setTimeout(showOnce, SHOW_DELAY_MS);
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
}());
