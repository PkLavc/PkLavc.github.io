(function () {
  var state = {
    apiBase: "https://api.pklavc.com",
    conversationId: "",
    voiceEnabled: false,
  };

  var els = {};

  function shouldRunWidget() {
    var path = window.location.pathname || "/";
    return !/^\/(skyler-assistant|projects\/skyler-assistant\/demo)\/?$/i.test(path);
  }

  function ensureMarkup() {
    if (document.getElementById("about-chat-launcher") && document.getElementById("about-chat-widget")) {
      return;
    }

    var launcher = document.createElement("button");
    launcher.id = "about-chat-launcher";
    launcher.className = "about-chat-launcher";
    launcher.type = "button";
    launcher.setAttribute("aria-controls", "about-chat-widget");
    launcher.setAttribute("aria-expanded", "false");
    launcher.setAttribute("aria-label", "Open or close Skyler chat");
    launcher.innerHTML = '<img src="/images/icon_skyler.webp" alt="Skyler chat icon" width="56" height="56" loading="eager" decoding="async">';

    var widget = document.createElement("section");
    widget.id = "about-chat-widget";
    widget.className = "about-chat-widget";
    widget.setAttribute("aria-label", "Skyler chat widget");
    widget.setAttribute("aria-hidden", "true");
    widget.innerHTML = [
      '<header class="about-chat-header">',
      '  <div class="about-chat-title">',
      '    <strong>Skyler</strong>',
      '    <span>Portfolio assistant</span>',
      '  </div>',
      '  <div class="about-chat-actions">',
      '    <button id="about-chat-voice-toggle" class="about-chat-action-btn" type="button" aria-pressed="false">Voice off</button>',
      '    <button id="about-chat-close" class="about-chat-action-btn" type="button" aria-label="Close chat">Close</button>',
      '  </div>',
      '</header>',
      '<div id="about-chat-log" class="about-chat-log" aria-live="polite"></div>',
      '<div id="about-chat-status" class="about-chat-status">Ask about projects, stack, and experience.</div>',
      '<form id="about-chat-form" class="about-chat-form">',
      '  <div class="about-chat-input-wrap">',
      '    <textarea id="about-chat-input" class="about-chat-input" placeholder="Type your message here..."></textarea>',
      '  </div>',
      '  <button id="about-chat-send" class="about-chat-send" type="submit">Send</button>',
      '</form>'
    ].join("");

    document.body.appendChild(launcher);
    document.body.appendChild(widget);
  }

  function cacheElements() {
    els.launcher = document.getElementById("about-chat-launcher");
    els.widget = document.getElementById("about-chat-widget");
    els.closeBtn = document.getElementById("about-chat-close");
    els.voiceToggle = document.getElementById("about-chat-voice-toggle");
    els.log = document.getElementById("about-chat-log");
    els.status = document.getElementById("about-chat-status");
    els.form = document.getElementById("about-chat-form");
    els.input = document.getElementById("about-chat-input");
    els.send = document.getElementById("about-chat-send");
  }

  function saveSession() {
    localStorage.setItem("aboutChatWidgetSession", JSON.stringify({
      conversationId: state.conversationId,
      voiceEnabled: state.voiceEnabled,
    }));
  }

  function loadSession() {
    var raw = localStorage.getItem("aboutChatWidgetSession");
    if (!raw) {
      return;
    }

    try {
      var parsed = JSON.parse(raw);
      state.conversationId = parsed.conversationId || "";
      state.voiceEnabled = !!parsed.voiceEnabled;
    } catch (err) {
      console.warn("Invalid about chat session cache", err);
    }
  }

  function appendMessage(role, text) {
    if (!els.log) {
      return null;
    }

    var node = document.createElement("article");
    node.className = "about-chat-message " + role;
    node.textContent = text;
    els.log.appendChild(node);
    els.log.scrollTop = els.log.scrollHeight;
    return node;
  }

  function openWidget() {
    if (!els.widget || !els.launcher) {
      return;
    }

    els.widget.classList.add("is-open");
    els.widget.setAttribute("aria-hidden", "false");
    els.launcher.setAttribute("aria-expanded", "true");
    if (els.input) {
      els.input.focus();
    }
  }

  function closeWidget() {
    if (!els.widget || !els.launcher) {
      return;
    }

    els.widget.classList.remove("is-open");
    els.widget.setAttribute("aria-hidden", "true");
    els.launcher.setAttribute("aria-expanded", "false");
  }

  function autoResizeInput() {
    if (!els.input) {
      return;
    }

    els.input.style.height = "44px";
    var nextHeight = Math.min(els.input.scrollHeight, 180);
    els.input.style.height = nextHeight + "px";
  }

  function setStatus(text) {
    if (els.status) {
      els.status.textContent = text;
    }
  }

  function updateVoiceToggle() {
    if (!els.voiceToggle) {
      return;
    }

    els.voiceToggle.classList.toggle("is-active", state.voiceEnabled);
    els.voiceToggle.setAttribute("aria-pressed", state.voiceEnabled ? "true" : "false");
    els.voiceToggle.textContent = state.voiceEnabled ? "Voice on" : "Voice off";
  }

  function pickPreferredFemaleVoice(language) {
    if (!("speechSynthesis" in window)) {
      return null;
    }

    var voices = window.speechSynthesis.getVoices() || [];
    if (!voices.length) {
      return null;
    }

    var femaleHints = /female|woman|samantha|victoria|ava|allison|jenny|aria|sara|sonia|karen|moira|tessa|zira|hazel|susan|luciana|helena/i;
    var langPrefix = (language || navigator.language || "en").slice(0, 2).toLowerCase();

    var exact = voices.find(function (voice) {
      return femaleHints.test(voice.name) && voice.lang && voice.lang.toLowerCase().slice(0, 2) === langPrefix;
    });

    if (exact) {
      return exact;
    }

    return voices.find(function (voice) {
      return femaleHints.test(voice.name);
    }) || null;
  }

  function speakIfEnabled(text) {
    if (!state.voiceEnabled || !("speechSynthesis" in window)) {
      return;
    }

    var utter = new SpeechSynthesisUtterance(text);
    utter.lang = navigator.language || "en-US";
    utter.voice = pickPreferredFemaleVoice(utter.lang);
    utter.pitch = 1.12;
    utter.rate = 0.98;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }

  function readVoiceInput() {
    var Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition || !els.input) {
      return;
    }

    var recognition = new Recognition();
    recognition.lang = navigator.language || "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = function (event) {
      if (event.results && event.results[0] && event.results[0][0]) {
        els.input.value = event.results[0][0].transcript;
      }
    };
    recognition.start();
  }

  async function sendChat() {
    if (!els.input) {
      return;
    }

    var text = (els.input.value || "").trim();
    if (!text) {
      return;
    }

    els.input.value = "";
    autoResizeInput();
    appendMessage("user", text);
    setStatus("Skyler is thinking...");
    var thinking = appendMessage("assistant", "Thinking...");

    try {
      var res = await fetch(state.apiBase + "/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          conversation_id: state.conversationId || null,
          voice_reply: state.voiceEnabled,
        }),
      });

      var data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Chat failed");
      }

      state.conversationId = data.conversation_id || state.conversationId;
      saveSession();
      if (thinking) {
        thinking.textContent = data.reply || "No response.";
      }
      setStatus("Skyler is ready.");
      speakIfEnabled(data.reply || "");
    } catch (err) {
      if (thinking) {
        thinking.textContent = "I could not answer right now.";
      }
      setStatus("Chat temporarily unavailable.");
      console.error(err);
    }
  }

  function bindEvents() {
    if (els.launcher) {
      els.launcher.addEventListener("click", function () {
        if (els.widget && els.widget.classList.contains("is-open")) {
          closeWidget();
          return;
        }
        openWidget();
      });
    }

    if (els.closeBtn) {
      els.closeBtn.addEventListener("click", closeWidget);
    }

    if (els.voiceToggle) {
      els.voiceToggle.addEventListener("click", function () {
        state.voiceEnabled = !state.voiceEnabled;
        updateVoiceToggle();
        saveSession();
      });

      els.voiceToggle.addEventListener("contextmenu", function (event) {
        event.preventDefault();
        readVoiceInput();
      });
    }

    if (els.form) {
      els.form.addEventListener("submit", function (event) {
        event.preventDefault();
        sendChat();
      });
    }

    if (els.input) {
      els.input.addEventListener("input", function () {
        autoResizeInput();
      });

      els.input.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          sendChat();
        }
      });
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeWidget();
      }
    });
  }

  function init() {
    if (!shouldRunWidget()) {
      return;
    }

    ensureMarkup();
    cacheElements();

    if (!els.launcher || !els.widget) {
      return;
    }

    loadSession();
    updateVoiceToggle();
    bindEvents();
    autoResizeInput();

    if (els.log && !els.log.children.length) {
      appendMessage("assistant", "Hi, I am Skyler. Ask about Patrick's experience, projects, stack, or architecture work.");
    }

    setStatus(state.voiceEnabled ? "Voice mode enabled." : "");

    if ("speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.addEventListener("voiceschanged", function () {
        updateVoiceToggle();
      }, { once: true });
    }
  }

  function initAndExpose() {
    init();
    window.openSkylerWidget = openWidget;
    window.closeSkylerWidget = closeWidget;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAndExpose, { once: true });
  } else {
    initAndExpose();
  }
})();
