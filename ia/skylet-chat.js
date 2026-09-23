(() => {
  const apiBase = 'https://api.pklavc.com';
  const storedLocale = (() => { try { return localStorage.getItem('pklavc.preferredLanguage'); } catch (_) { return null; } })();
  const routeLocale = /^\/pt\/ia\/?$/i.test(location.pathname) ? 'pt' : (/^\/es\/ia\/?$/i.test(location.pathname) ? 'es' : 'en');
  const locale = routeLocale !== 'en' ? routeLocale : (/^(pt|es)$/.test(storedLocale || '') ? storedLocale : (navigator.language || 'en').slice(0, 2));
  const form = document.querySelector('#speech-form');
  const input = document.querySelector('#speech-input');
  const log = document.querySelector('#chat-log');
  const voiceButton = document.querySelector('#voice-toggle');
  const viewport = document.querySelector('#viewport');
  let conversationId = null;
  let voiceOutput = false;
  let characterSpeech = false;

  const copy = {
    en: { placeholder: 'Write a message…', audioOn: 'Audio replies on', audioOff: 'Audio replies off', unavailable: 'I could not answer right now. Please try again.' },
    pt: { placeholder: 'Escreva uma mensagem…', audioOn: 'Respostas em áudio ligadas', audioOff: 'Respostas em áudio desligadas', unavailable: 'Não consegui responder agora. Tente novamente.' },
    es: { placeholder: 'Escribe un mensaje…', audioOn: 'Respuestas de audio activadas', audioOff: 'Respuestas de audio desactivadas', unavailable: 'No pude responder ahora. Inténtalo de nuevo.' }
  }[locale] || null;
  const escapeHtml = value => String(value).replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));

  function appendMessage(role, text, pending = false) {
    const article = document.createElement('article');
    article.className = `s800-chat-message s800-chat-message--${role}${pending ? ' is-pending' : ''}`;
    article.innerHTML = `<div class="s800-chat-bubble">${escapeHtml(text).replace(/\n/g, '<br>')}</div>`;
    log.append(article);
    log.scrollTop = log.scrollHeight;
    return article;
  }

  function autoResize() {
    input.style.height = 'auto';
    input.style.height = `${Math.min(input.scrollHeight, 132)}px`;
  }

  function setVoiceState() {
    const label = voiceOutput ? copy.audioOn : copy.audioOff;
    voiceButton.classList.toggle('is-active', voiceOutput);
    voiceButton.setAttribute('aria-pressed', String(voiceOutput));
    voiceButton.setAttribute('aria-label', label);
    voiceButton.setAttribute('title', label);
  }

  function speakThroughS800(text) {
    const previousValue = input.value;
    characterSpeech = true;
    input.value = text;
    try { form.requestSubmit(); }
    finally {
      input.value = previousValue;
      characterSpeech = false;
      autoResize();
    }
  }

  async function send() {
    const message = input.value.trim();
    if (!message) return;
    input.value = '';
    autoResize();
    appendMessage('user', message);

    if (message === '1997') {
      viewport.classList.add('is-s800-revealed');
      input.focus();
      return;
    }

    const waiting = appendMessage('assistant', '...', true);
    try {
      const response = await fetch(`${apiBase}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, conversation_id: conversationId, voice_reply: voiceOutput })
      });
      const contentType = response.headers.get('content-type') || '';
      const data = contentType.includes('application/json') ? await response.json() : {};
      if (!response.ok) throw new Error(data.error || `chat_http_${response.status}`);
      conversationId = data.conversation_id || conversationId;
      const reply = data.reply || copy.unavailable;
      waiting.classList.remove('is-pending');
      waiting.querySelector('.s800-chat-bubble').innerHTML = escapeHtml(reply).replace(/\n/g, '<br>');
      if (voiceOutput) speakThroughS800(reply);
    } catch (error) {
      waiting.classList.remove('is-pending');
      waiting.querySelector('.s800-chat-bubble').textContent = copy.unavailable;
      console.error('Skylet chat request failed:', error);
    }
    log.scrollTop = log.scrollHeight;
    input.focus();
  }

  form.addEventListener('submit', event => {
    if (characterSpeech) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    send();
  }, true);
  input.addEventListener('input', autoResize);
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form.requestSubmit();
    }
  });
  voiceButton.addEventListener('click', () => { voiceOutput = !voiceOutput; setVoiceState(); });
  document.querySelectorAll('[data-current-year]').forEach(node => { node.textContent = String(new Date().getFullYear()); });
  input.placeholder = copy.placeholder;
  setVoiceState();
  autoResize();
})();
