(() => {
  const apiBase = 'https://api.pklavc.com';
  const storedLocale = (() => { try { return localStorage.getItem('pklavc.preferredLanguage'); } catch (_) { return null; } })();
  const routeLocale = /^\/pt\/ia\/?$/i.test(location.pathname) ? 'pt' : (/^\/es\/ia\/?$/i.test(location.pathname) ? 'es' : 'en');
  const locale = routeLocale !== 'en' ? routeLocale : (/^(pt|es)$/.test(storedLocale || '') ? storedLocale : (navigator.language || 'en').slice(0, 2));
  const form = document.querySelector('#chat-form');
  const input = document.querySelector('#chat-input');
  const log = document.querySelector('#chat-log');
  const voiceButton = document.querySelector('#voice-toggle');
  const footer = document.querySelector('.skylet-footer');
  let conversationId = null;
  let voiceOutput = false;
  const copy = {
    en: { placeholder: 'Write a message…', audioOn: 'Audio replies on', audioOff: 'Audio replies off', unavailable: 'I could not answer right now. Please try again.', nav: ['HOME', 'ABOUT', 'PROJECTS', 'BLOG'] },
    pt: { placeholder: 'Escreva uma mensagem…', audioOn: 'Respostas em áudio ligadas', audioOff: 'Respostas em áudio desligadas', unavailable: 'Não consegui responder agora. Tente novamente.', nav: ['INÍCIO', 'SOBRE', 'PROJETOS', 'BLOG'] },
    es: { placeholder: 'Escribe un mensaje…', audioOn: 'Respuestas de audio activadas', audioOff: 'Respuestas de audio desactivadas', unavailable: 'No pude responder ahora. Inténtalo de nuevo.', nav: ['INICIO', 'SOBRE', 'PROYECTOS', 'BLOG'] }
  }[locale] || null;
  const revealPatterns = [/(?:reveal|show|unmask|expose)\s+(?:your\s+)?(?:true|real|actual)\s+(?:appearance|form|face|identity)/i, /(?:revele|mostre|mostra|exiba)\s+(?:a\s+)?(?:sua\s+)?(?:verdadeira|real)\s+(?:apar[eê]ncia|forma|face|identidade)/i, /(?:revela|muestra|muestre|enseña|ensena)\s+(?:tu\s+)?(?:verdadera|real)\s+(?:apariencia|forma|rostro|identidad)/i];
  const escapeHtml = value => value.replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  function appendMessage(role, text, pending = false) { const article = document.createElement('article'); article.className = `chat-message chat-message--${role}${pending ? ' is-pending' : ''}`; article.innerHTML = `<div class="chat-message__bubble">${escapeHtml(text).replace(/\n/g, '<br>')}</div>`; log.append(article); log.scrollTop = log.scrollHeight; return article; }
  function autoResize() { input.style.height = 'auto'; input.style.height = `${Math.min(input.scrollHeight, 168)}px`; }
  function setVoiceState() { const label = voiceOutput ? copy.audioOn : copy.audioOff; voiceButton.classList.toggle('is-active', voiceOutput); voiceButton.setAttribute('aria-pressed', String(voiceOutput)); voiceButton.setAttribute('title', label); voiceButton.setAttribute('aria-label', label); }
  function positionComposerAboveFooter() {
    if (!footer) return;
    const footerTop = footer.getBoundingClientRect().top;
    const overlap = Math.max(0, window.innerHeight - footerTop);
    form.style.bottom = `${18 + overlap}px`;
  }
  async function send() {
    const message = input.value.trim();
    if (!message) return;
    input.value = ''; autoResize(); appendMessage('user', message);
    if (message === '1997') {
      document.body.classList.add('is-s800-revealed');
      await window.S800Background?.reveal();
      log.scrollTop = log.scrollHeight;
      input.focus();
      return;
    }
    const waiting = appendMessage('assistant', '...', true);
    try {
      const response = await fetch(`${apiBase}/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message, conversation_id: conversationId, voice_reply: voiceOutput }) });
      const contentType = response.headers.get('content-type') || '';
      const data = contentType.includes('application/json') ? await response.json() : {};
      // The deployed Worker has supported both { ok, reply } and the older
      // { reply } envelope. HTTP status is the compatibility contract.
      if (!response.ok) throw new Error(data.error || `chat_http_${response.status}`);
      conversationId = data.conversation_id || conversationId;
      const reply = data.reply || copy.unavailable;
      waiting.classList.remove('is-pending');
      waiting.querySelector('.chat-message__bubble').innerHTML = escapeHtml(reply).replace(/\n/g, '<br>');
      if (voiceOutput && 'speechSynthesis' in window) { const language = locale === 'pt' ? 'pt-BR' : locale === 'es' ? 'es-ES' : 'en-US'; if (window.S800Background?.speak) window.S800Background.speak(reply, language); else { speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(reply); utterance.lang = language; speechSynthesis.speak(utterance); } }
    } catch (error) {
      waiting.classList.remove('is-pending');
      waiting.querySelector('.chat-message__bubble').textContent = copy.unavailable;
      console.error('Skylet chat request failed:', error);
    }
    log.scrollTop = log.scrollHeight;
  }
  form.addEventListener('submit', event => { event.preventDefault(); send(); });
  input.addEventListener('input', autoResize);
  input.addEventListener('keydown', event => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); send(); } });
  voiceButton.addEventListener('click', () => { voiceOutput = !voiceOutput; setVoiceState(); });
  window.addEventListener('scroll', positionComposerAboveFooter, { passive: true });
  window.addEventListener('resize', positionComposerAboveFooter, { passive: true });
  document.body.dataset.locale = locale; input.placeholder = copy.placeholder; setVoiceState(); autoResize();
  positionComposerAboveFooter();
})();
