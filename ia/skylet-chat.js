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
  const stage = document.querySelector('.skylet-stage');
  const consoleElement = document.querySelector('.s800-console');
  const sessionKey = 'aboutChatWidgetSession';
  let conversationId = (() => { try { return JSON.parse(localStorage.getItem(sessionKey) || '{}').conversationId || null; } catch (_) { return null; } })();
  let voiceOutput = false;
  let characterSpeech = false;
  let restoringConversation = false;

  const copy = {
    en: { placeholder: 'Write a message…', audioOn: 'Audio replies on', audioOff: 'Audio replies off', unavailable: 'I could not answer right now. Please try again.', clear: 'Clear conversation', confirmClear: 'Delete this conversation from this browser?' },
    pt: { placeholder: 'Escreva uma mensagem…', audioOn: 'Respostas em áudio ligadas', audioOff: 'Respostas em áudio desligadas', unavailable: 'Não consegui responder agora. Tente novamente.', clear: 'Apagar conversa', confirmClear: 'Apagar esta conversa deste navegador?' },
    es: { placeholder: 'Escribe un mensaje…', audioOn: 'Respuestas de audio activadas', audioOff: 'Respuestas de audio desactivadas', unavailable: 'No pude responder ahora. Inténtalo de nuevo.', clear: 'Borrar conversación', confirmClear: '¿Borrar esta conversación de este navegador?' }
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

  function syncConsoleSpace() {
    stage.style.setProperty('--s800-console-height', `${consoleElement.offsetHeight}px`);
  }

  function saveConversationReference() {
    try {
      const current = JSON.parse(localStorage.getItem(sessionKey) || '{}');
      localStorage.setItem(sessionKey, JSON.stringify({ ...current, conversationId }));
    } catch (_) { /* The conversation remains usable for the current page session. */ }
  }

  async function restoreConversation() {
    if (!conversationId) return;
    restoringConversation = true;
    try {
      const response = await fetch(`${apiBase}/conversations/history?conversation_id=${encodeURIComponent(conversationId)}`);
      if (response.status === 404 || response.status === 401) {
        conversationId = null;
        saveConversationReference();
        return;
      }
      if (!response.ok) return;
      const data = await response.json();
      (data.items || []).forEach(item => {
        appendMessage(item.role === 'user' ? 'user' : 'assistant', item.content);
        humanReplyCursor = Math.max(humanReplyCursor, Number(item.id) || 0);
      });
      if (!humanReplyTimer) humanReplyTimer = window.setInterval(pollHumanReplies, 3000);
    } catch (_) { /* Keep the reference and retry on the next page load. */ }
    finally { restoringConversation = false; }
  }

  function clearConversation() {
    if (!window.confirm(copy.confirmClear)) return;
    const oldConversationId = conversationId;
    conversationId = null;
    humanReplyCursor = 0;
    saveConversationReference();
    log.replaceChildren();
    if (oldConversationId) {
      fetch(`${apiBase}/conversations/close`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversation_id: oldConversationId }),
        keepalive: true
      }).catch(() => {});
    }
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

  let humanReplyCursor = 0;
  let humanReplyTimer = null;
  async function pollHumanReplies() {
    if (!conversationId) return;
    try {
      const response = await fetch(`${apiBase}/conversations/messages?conversation_id=${encodeURIComponent(conversationId)}&after_id=${humanReplyCursor}`);
      if (!response.ok) return;
      const data = await response.json();
      (data.items || []).forEach(item => { humanReplyCursor = Math.max(humanReplyCursor, Number(item.id) || 0); appendMessage('assistant', item.content); });
    } catch (_) { /* Retry on next interval. */ }
  }

  async function send() {
    if (restoringConversation) return;
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
      saveConversationReference();
      if (!humanReplyTimer && conversationId) humanReplyTimer = window.setInterval(pollHumanReplies, 3000);
      const reply = data.reply || copy.unavailable;
      waiting.classList.remove('is-pending');
      if (data.human_takeover) { waiting.remove(); return; }
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
  const clearButton = document.createElement('button');
  clearButton.type = 'button';
  clearButton.className = 's800-clear-conversation';
  clearButton.textContent = copy.clear;
  clearButton.title = copy.clear;
  clearButton.addEventListener('click', clearConversation);
  consoleElement.insertBefore(clearButton, form);
  voiceButton.addEventListener('click', () => { voiceOutput = !voiceOutput; setVoiceState(); });
  document.querySelectorAll('[data-current-year]').forEach(node => { node.textContent = String(new Date().getFullYear()); });
  input.placeholder = copy.placeholder;
  setVoiceState();
  autoResize();
  restoreConversation();
  syncConsoleSpace();
  if ('ResizeObserver' in window) new ResizeObserver(syncConsoleSpace).observe(consoleElement);
  else window.addEventListener('resize', syncConsoleSpace, { passive: true });
})();
