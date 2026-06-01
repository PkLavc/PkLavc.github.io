(function () {
  var state = {
    apiBase: "https://api.pklavc.com",
    conversationId: "",
    voiceEnabled: false,
    streamEnabled: true,
    isBusy: false,
  };

  var els = {};

  var COPY = {
    en: {
      userLabel: "You",
      voiceOn: "Voice on",
      voiceOff: "Voice off",
      closeContext: "Close Skyler context menu",
      openContext: "Open Skyler context menu",
      speechUnavailable: "Speech recognition is not available in this browser.",
      listening: "Listening...",
      voiceInputError: "Voice input could not start.",
      ready: "Ready for portfolio questions.",
      thinking: "Thinking...",
      noResponse: "No response.",
      unavailableMessage: "I could not answer right now.",
      unavailableStatus: "Chat temporarily unavailable.",
      resetMessage: "**Memory reset.** Ask me where you want to go next.",
      resetStatus: "Memory reset.",
      voiceEnabled: "Voice output enabled.",
      voiceDisabled: "Voice output disabled.",
      contextOnline: "Portfolio context online: projects, stack, blog posts, and architecture notes.",
      intro: "**Hi, I am Skyler.** Ask about Patrick's projects, backend systems, integrations, or technical tradeoffs.",
      links: {
        email: "Send Email",
        linkedin: "Open LinkedIn",
        github: "View GitHub",
        sponsor: "Sponsor Patrick",
        portfolio: "Open Portfolio",
        projects: "Browse Projects",
        blog: "Read Blog",
        about: "About Patrick",
        lavc: "View Lavc Systems",
        skylerProject: "View Skyler Assistant",
        skylerApp: "Open Skyler Assistant",
        codepulse: "View CodePulse",
        googleAuth: "View Google Auth Worker",
        zoho: "View Zoho Worker",
        hablla: "View Hablla Worker",
        zenvia: "View Zenvia Worker",
        sige: "View SIGE Worker",
        omie: "View Omie Worker",
        saas: "View SaaS Platform",
        cipher: "View Cipher Gate",
        eventDriven: "View Event-Driven Service",
        aegis: "View Aegis Sentinel",
        cloud: "View Cloud Deployment",
        os: "View OS Optimizer",
        githubRepo: "View on GitHub",
        project: "View Project",
        post: "Read Post",
        page: "Visit Page",
        link: "Visit Link"
      }
    },
    pt: {
      userLabel: "Você",
      voiceOn: "Voz ativada",
      voiceOff: "Voz desativada",
      closeContext: "Fechar menu de contexto da Skyler",
      openContext: "Abrir menu de contexto da Skyler",
      speechUnavailable: "O reconhecimento de voz não está disponível neste navegador.",
      listening: "Ouvindo...",
      voiceInputError: "Não foi possível iniciar a entrada de voz.",
      ready: "Pronto para perguntas sobre o portfólio.",
      thinking: "Pensando...",
      noResponse: "Sem resposta.",
      unavailableMessage: "Não consegui responder agora.",
      unavailableStatus: "Chat temporariamente indisponível.",
      resetMessage: "**Memória reiniciada.** Pergunte para onde quer ir agora.",
      resetStatus: "Memória reiniciada.",
      voiceEnabled: "Saída de voz ativada.",
      voiceDisabled: "Saída de voz desativada.",
      contextOnline: "Contexto do portfólio online: projetos, stack, artigos do blog e notas de arquitetura.",
      intro: "**Oi, eu sou a Skyler.** Pergunte sobre os projetos, sistemas backend, integrações ou decisões técnicas do Patrick.",
      links: {
        email: "Enviar e-mail",
        linkedin: "Abrir LinkedIn",
        github: "Ver GitHub",
        sponsor: "Apoiar Patrick",
        portfolio: "Abrir portfólio",
        projects: "Ver projetos",
        blog: "Ler blog",
        about: "Sobre Patrick",
        lavc: "Ver Lavc Systems",
        skylerProject: "Ver Skyler Assistant",
        skylerApp: "Abrir Skyler Assistant",
        codepulse: "Ver CodePulse",
        googleAuth: "Ver Google Auth Worker",
        zoho: "Ver Zoho Worker",
        hablla: "Ver Hablla Worker",
        zenvia: "Ver Zenvia Worker",
        sige: "Ver SIGE Worker",
        omie: "Ver Omie Worker",
        saas: "Ver plataforma SaaS",
        cipher: "Ver Cipher Gate",
        eventDriven: "Ver Event-Driven Service",
        aegis: "Ver Aegis Sentinel",
        cloud: "Ver Cloud Deployment",
        os: "Ver OS Optimizer",
        githubRepo: "Ver no GitHub",
        project: "Ver projeto",
        post: "Ler artigo",
        page: "Abrir página",
        link: "Abrir link"
      }
    },
    es: {
      userLabel: "Tú",
      voiceOn: "Voz activada",
      voiceOff: "Voz desactivada",
      closeContext: "Cerrar menú contextual de Skyler",
      openContext: "Abrir menú contextual de Skyler",
      speechUnavailable: "El reconocimiento de voz no está disponible en este navegador.",
      listening: "Escuchando...",
      voiceInputError: "No se pudo iniciar la entrada de voz.",
      ready: "Listo para preguntas sobre el portafolio.",
      thinking: "Pensando...",
      noResponse: "Sin respuesta.",
      unavailableMessage: "No pude responder ahora.",
      unavailableStatus: "Chat temporalmente no disponible.",
      resetMessage: "**Memoria reiniciada.** Pregunta hacia dónde quieres ir ahora.",
      resetStatus: "Memoria reiniciada.",
      voiceEnabled: "Salida de voz activada.",
      voiceDisabled: "Salida de voz desactivada.",
      contextOnline: "Contexto del portafolio en línea: proyectos, stack, artículos del blog y notas de arquitectura.",
      intro: "**Hola, soy Skyler.** Pregunta sobre los proyectos, sistemas backend, integraciones o decisiones técnicas de Patrick.",
      links: {
        email: "Enviar correo",
        linkedin: "Abrir LinkedIn",
        github: "Ver GitHub",
        sponsor: "Apoyar a Patrick",
        portfolio: "Abrir portafolio",
        projects: "Ver proyectos",
        blog: "Leer blog",
        about: "Sobre Patrick",
        lavc: "Ver Lavc Systems",
        skylerProject: "Ver Skyler Assistant",
        skylerApp: "Abrir Skyler Assistant",
        codepulse: "Ver CodePulse",
        googleAuth: "Ver Google Auth Worker",
        zoho: "Ver Zoho Worker",
        hablla: "Ver Hablla Worker",
        zenvia: "Ver Zenvia Worker",
        sige: "Ver SIGE Worker",
        omie: "Ver Omie Worker",
        saas: "Ver plataforma SaaS",
        cipher: "Ver Cipher Gate",
        eventDriven: "Ver Event-Driven Service",
        aegis: "Ver Aegis Sentinel",
        cloud: "Ver Cloud Deployment",
        os: "Ver OS Optimizer",
        githubRepo: "Ver en GitHub",
        project: "Ver proyecto",
        post: "Leer artículo",
        page: "Abrir página",
        link: "Abrir enlace"
      }
    }
  };

  function getLocale() {
    if (window.PkLavcI18n && typeof window.PkLavcI18n.getCurrentLanguage === "function") {
      return window.PkLavcI18n.getCurrentLanguage();
    }

    var path = window.location.pathname || "/";
    if (/^\/pt(?:\/|$)/i.test(path)) return "pt";
    if (/^\/es(?:\/|$)/i.test(path)) return "es";
    return "en";
  }

  function getCopy() {
    return COPY[getLocale()] || COPY.en;
  }

  function cacheElements() {
    els.apiBaseInput = document.getElementById("api-base");
    els.authStatus = document.getElementById("auth-status");
    els.uploadStatus = document.getElementById("upload-status");
    els.chatForm = document.getElementById("chat-form");
    els.chatInput = document.getElementById("chat-input");
    els.sendBtn = document.getElementById("send-btn");
    els.streamToggle = document.getElementById("stream-toggle");
    els.voiceToggle = document.getElementById("voice-toggle");
    els.voiceInputBtn = document.getElementById("voice-input-btn");
    els.resetBtn = document.getElementById("reset-btn");
    els.chatLog = document.getElementById("chat-log");
    els.contextToggle = document.getElementById("skyler-context-toggle");
    els.contextPanel = document.getElementById("skyler-context-panel");
    els.threatField = document.querySelector(".skyler-threat-field");
    els.chatPanel = document.querySelector(".skyler-chat-panel");
  }

  function saveSession() {
    localStorage.setItem("testingChatSession", JSON.stringify({
      apiBase: state.apiBase,
      conversationId: state.conversationId,
      voiceEnabled: state.voiceEnabled,
    }));
  }

  function loadSession() {
    var raw = localStorage.getItem("testingChatSession");
    if (!raw) {
      return;
    }

    try {
      var parsed = JSON.parse(raw);
      state.apiBase = parsed.apiBase || state.apiBase;
      state.conversationId = parsed.conversationId || "";
      state.voiceEnabled = !!parsed.voiceEnabled;
    } catch (err) {
      console.warn("Invalid session cache", err);
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  var LINK_LABEL_KEYS = {
    "mailto:contact@pklavc.com": "email",
    "https://www.linkedin.com/in/pklavc/": "linkedin",
    "https://github.com/PkLavc": "github",
    "https://github.com/PkLavc/": "github",
    "https://github.com/sponsors/PkLavc": "sponsor",
    "https://pklavc.com/": "portfolio",
    "https://pklavc.com/projects/": "projects",
    "https://pklavc.com/blog/": "blog",
    "https://pklavc.com/about/": "about",
    "https://pklavc.com/projects/lavc-systems/": "lavc",
    "https://pklavc.com/projects/skyler-assistant/": "skylerProject",
    "https://pklavc.com/skyler-assistant/": "skylerApp",
    "https://pklavc.com/projects/codepulse-monorepo/": "codepulse",
    "https://pklavc.com/projects/google-auth-worker/": "googleAuth",
    "https://pklavc.com/projects/zoho-integration-worker/": "zoho",
    "https://pklavc.com/projects/hablla-integration-worker/": "hablla",
    "https://pklavc.com/projects/zenvia-integration-worker/": "zenvia",
    "https://pklavc.com/projects/sige-integration-worker/": "sige",
    "https://pklavc.com/projects/omie-integration-worker/": "omie",
    "https://pklavc.com/projects/multi-tenant-saas-platform/": "saas",
    "https://pklavc.com/projects/cipher-gate-proxy/": "cipher",
    "https://pklavc.com/projects/event-driven-integration-service/": "eventDriven",
    "https://pklavc.com/projects/aegis-sentinel/": "aegis",
    "https://pklavc.com/projects/cloud-deployment-showcase/": "cloud",
    "https://pklavc.com/projects/os-resource-optimizer/": "os",
    "https://github.com/PkLavc/codepulse-monorepo": "githubRepo",
    "https://github.com/PkLavc/codepulse-monorepo/": "githubRepo",
  };

  function getLinkLabel(href) {
    var links = getCopy().links;
    if (LINK_LABEL_KEYS[href]) return links[LINK_LABEL_KEYS[href]];
    var alt = href.endsWith("/") ? href.slice(0, -1) : href + "/";
    if (LINK_LABEL_KEYS[alt]) return links[LINK_LABEL_KEYS[alt]];
    if (href.startsWith("mailto:")) return links.email;
    if (href.includes("linkedin.com")) return links.linkedin;
    if (href.includes("github.com/PkLavc") || href.includes("github.com/pklavc")) return links.github;
    if (href.includes("pklavc.com/projects/")) return links.project;
    if (href.includes("pklavc.com/blog/")) return links.post;
    if (href.includes("pklavc.com")) return links.page;
    return links.link;
  }

  function parseMarkdown(md) {
    var out = md;

    out = out.replace(/```(?:\w*)\n?([\s\S]*?)```/g, function (_, code) {
      return '<pre class="skyler-pre"><code>' + code.replace(/^[\n]+|[\n]+$/g, "") + "</code></pre>";
    });

    out = out.replace(/`([^`\n]+)`/g, '<code class="skyler-code">$1</code>');
    out = out.replace(/^#{1,6}\s+(.+)$/gm, '<strong class="skyler-heading">$1</strong>');
    out = out.replace(/\*\*([^*\n]+?)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/__([^_\n]+?)__/g, '<strong>$1</strong>');
    out = out.replace(/\*([^*\n]+?)\*/g, '<em>$1</em>');
    out = out.replace(/_([^_\n]+?)_/g, '<em>$1</em>');
    out = out.replace(/~~([^~\n]+?)~~/g, '<del>$1</del>');

    out = out.replace(/((?:^[*\-+] .+$\n?)+)/gm, function (block) {
      var items = block.trim().split("\n").map(function (line) {
        return "<li>" + line.replace(/^[*\-+] /, "") + "</li>";
      });
      return '<ul class="skyler-ul">' + items.join("") + "</ul>";
    });

    out = out.replace(/((?:^\d+\.\s+.+$\n?)+)/gm, function (block) {
      var items = block.trim().split("\n").map(function (line) {
        return "<li>" + line.replace(/^\d+\.\s+/, "") + "</li>";
      });
      return '<ol class="skyler-ol">' + items.join("") + "</ol>";
    });

    out = out.replace(/\n/g, "<br>");
    return out;
  }

  function renderMessageContent(text) {
    var seenHrefs = Object.create(null);
    var buttons = [];

    function trackHref(href) {
      var key = href.endsWith("/") ? href : href + "/";
      if (seenHrefs[key] || seenHrefs[href]) return false;
      seenHrefs[key] = true;
      seenHrefs[href] = true;
      return true;
    }

    var html = parseMarkdown(escapeHtml(text));

    html = html.replace(/([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/g, function (email) {
      var href = "mailto:" + email;
      if (trackHref(href)) buttons.push(href);
      return '<a href="' + escapeHtml(href) + '" class="skyler-inline-link">' + email + "</a>";
    });

    html = html.replace(/(https?:\/\/[^\s<>"']+)/g, function (raw) {
      var clean = raw.replace(/[.,;:!?'")\]]+$/, "");
      var tail = raw.slice(clean.length);
      if (trackHref(clean)) buttons.push(clean);
      return (
        '<a href="' +
        escapeHtml(clean) +
        '" class="skyler-inline-link" target="_blank" rel="noopener noreferrer">' +
        clean +
        "</a>" +
        (tail ? escapeHtml(tail) : "")
      );
    });

    if (buttons.length) {
      var sectionParents = ["https://pklavc.com/projects/", "https://pklavc.com/blog/"];
      var activeParents = sectionParents.filter(function (parent) {
        return buttons.some(function (href) {
          return (href.endsWith("/") ? href : href + "/") === parent;
        });
      });

      var displayButtons = activeParents.length ? buttons.filter(function (href) {
        var norm = href.endsWith("/") ? href : href + "/";
        for (var i = 0; i < activeParents.length; i += 1) {
          if (norm !== activeParents[i] && norm.startsWith(activeParents[i])) return false;
        }
        return true;
      }) : buttons;

      html += '<div class="skyler-action-btns">';
      displayButtons.forEach(function (href) {
        var isExternal = !href.startsWith("mailto:") && !href.includes("pklavc.com");
        html +=
          '<a href="' +
          escapeHtml(href) +
          '" class="skyler-action-btn"' +
          (isExternal ? ' target="_blank" rel="noopener noreferrer"' : "") +
          ">" +
          escapeHtml(getLinkLabel(href)) +
          "</a>";
      });
      html += "</div>";
    }

    return html;
  }

  function setMessageContent(card, text, rawText) {
    var body = card ? card.querySelector(".chat-card-content") : null;
    if (!body) {
      return;
    }

    if (rawText) {
      body.textContent = text;
      return;
    }

    body.innerHTML = renderMessageContent(text);
  }

  function appendMessage(role, text, rawText) {
    if (!els.chatLog) {
      return null;
    }

    var card = document.createElement("article");
    var who = role === "assistant" ? "Skyler" : getCopy().userLabel;
    card.className = "chat-card chat-card-" + role;
    card.innerHTML = '<span class="chat-card-label">' + who + '</span><div class="chat-card-content"></div>';
    setMessageContent(card, text, rawText || role !== "assistant");
    els.chatLog.appendChild(card);
    els.chatLog.scrollTop = els.chatLog.scrollHeight;
    return card;
  }

  function setStatus(text) {
    if (!els.authStatus) {
      return;
    }

    els.authStatus.innerHTML = '<span class="skyler-status-dot" aria-hidden="true"></span>' + escapeHtml(text);
  }

  function syncApiBase() {
    var raw = els.apiBaseInput ? els.apiBaseInput.value : state.apiBase;
    state.apiBase = String(raw || state.apiBase || "https://api.pklavc.com").trim().replace(/\/$/, "");
    if (!state.apiBase) {
      state.apiBase = "https://api.pklavc.com";
    }
  }

  function isStreamingEnabled() {
    if (!els.streamToggle) {
      return state.streamEnabled;
    }

    if (typeof els.streamToggle.checked === "boolean") {
      return !!els.streamToggle.checked;
    }

    return state.streamEnabled;
  }

  function autoResizeInput() {
    if (!els.chatInput) {
      return;
    }

    els.chatInput.style.height = "54px";
    els.chatInput.style.height = Math.min(els.chatInput.scrollHeight, 170) + "px";
  }

  function setBusy(isBusy) {
    state.isBusy = isBusy;

    if (els.sendBtn) {
      els.sendBtn.disabled = isBusy;
    }

    document.querySelectorAll(".skyler-prompt-chip").forEach(function (button) {
      button.disabled = isBusy;
    });
  }

  function isMobileContextLayout() {
    return window.matchMedia && window.matchMedia("(max-width: 980px)").matches;
  }

  function setContextOpen(isOpen) {
    if (!els.contextToggle || !els.contextPanel) {
      return;
    }

    var shouldOpen = !!isOpen && isMobileContextLayout();
    document.body.classList.toggle("is-skyler-context-open", shouldOpen);
    els.contextToggle.textContent = shouldOpen ? "<" : ">";
    els.contextToggle.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
    els.contextToggle.setAttribute("aria-label", shouldOpen ? getCopy().closeContext : getCopy().openContext);
    els.contextPanel.setAttribute("aria-hidden", !isMobileContextLayout() || shouldOpen ? "false" : "true");
  }

  function syncContextLayout() {
    if (!els.contextToggle || !els.contextPanel) {
      return;
    }

    if (!isMobileContextLayout()) {
      document.body.classList.remove("is-skyler-context-open");
      els.contextToggle.textContent = ">";
      els.contextToggle.setAttribute("aria-expanded", "false");
      els.contextPanel.setAttribute("aria-hidden", "false");
      return;
    }

    setContextOpen(document.body.classList.contains("is-skyler-context-open"));
  }

  function bindThreatReveal() {
    if (!els.threatField || !window.matchMedia) {
      return;
    }

    var canReveal = window.matchMedia("(min-width: 1025px) and (hover: hover) and (pointer: fine)");
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    var frame = 0;
    var idleTimer = 0;
    var lastEvent = null;

    function isEnabled() {
      return canReveal.matches && !reduceMotion.matches;
    }

    function clearReveal() {
      document.body.classList.remove("is-skyler-scanning");
      lastEvent = null;
    }

    function writePosition(event) {
      els.threatField.style.setProperty("--skyler-scan-x", event.clientX + "px");
      els.threatField.style.setProperty("--skyler-scan-y", event.clientY + "px");

      if (els.chatPanel) {
        var rect = els.chatPanel.getBoundingClientRect();
        els.chatPanel.style.setProperty("--skyler-chat-scan-x", (event.clientX - rect.left) + "px");
        els.chatPanel.style.setProperty("--skyler-chat-scan-y", (event.clientY - rect.top) + "px");
      }

      document.body.classList.add("is-skyler-scanning");

      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(clearReveal, 900);
    }

    function schedulePosition(event) {
      if (!isEnabled() || event.pointerType === "touch") {
        clearReveal();
        return;
      }

      lastEvent = event;
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(function () {
        frame = 0;
        if (lastEvent) {
          writePosition(lastEvent);
        }
      });
    }

    document.addEventListener("pointermove", schedulePosition);
    document.addEventListener("pointerleave", clearReveal);

    function syncRevealAvailability() {
      if (!isEnabled()) {
        clearReveal();
      }
    }

    if (typeof canReveal.addEventListener === "function") {
      canReveal.addEventListener("change", syncRevealAvailability);
      reduceMotion.addEventListener("change", syncRevealAvailability);
    }
  }

  function updateVoiceToggle() {
    if (!els.voiceToggle) {
      return;
    }

    var label = state.voiceEnabled ? getCopy().voiceOn : getCopy().voiceOff;
    els.voiceToggle.classList.toggle("is-active", state.voiceEnabled);
    els.voiceToggle.setAttribute("aria-pressed", state.voiceEnabled ? "true" : "false");

    if (typeof els.voiceToggle.checked === "boolean") {
      els.voiceToggle.checked = state.voiceEnabled;
      return;
    }

    els.voiceToggle.textContent = label;
  }

  function readVoiceInput() {
    var Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      setStatus(getCopy().speechUnavailable);
      return;
    }

    if (!els.chatInput) {
      return;
    }

    var recognition = new Recognition();
    recognition.lang = navigator.language || "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = function () {
      setStatus(getCopy().listening);
    };

    recognition.onresult = function (event) {
      if (event.results && event.results[0] && event.results[0][0]) {
        els.chatInput.value = event.results[0][0].transcript;
        autoResizeInput();
        els.chatInput.focus();
      }
    };

    recognition.onerror = function () {
      setStatus(getCopy().voiceInputError);
    };

    recognition.onend = function () {
      if (!state.isBusy) {
        setStatus(getCopy().ready);
      }
    };

    recognition.start();
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

  async function sendStandard(text, assistantCard) {
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
      throw new Error(data.error || data.detail || "Chat failed");
    }

    state.conversationId = data.conversation_id || state.conversationId;
    saveSession();

    var reply = data.reply || getCopy().noResponse;
    setMessageContent(assistantCard, reply, false);
    return reply;
  }

  async function sendStream(text, assistantCard) {
    var res = await fetch(state.apiBase + "/chat/stream", {
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

    if (!res.ok || !res.body) {
      throw new Error("Streaming failed");
    }

    var reader = res.body.getReader();
    var decoder = new TextDecoder();
    var buffer = "";
    var finalText = "";

    setMessageContent(assistantCard, "", true);

    while (true) {
      var result = await reader.read();
      if (result.done) {
        break;
      }

      buffer += decoder.decode(result.value, { stream: true });
      var events = buffer.split("\n\n");
      buffer = events.pop() || "";

      for (var i = 0; i < events.length; i += 1) {
        var line = events[i].trim();
        if (!line.startsWith("data:")) {
          continue;
        }

        var rawPayload = line.slice(5).trim();
        if (!rawPayload || rawPayload === "[DONE]") {
          continue;
        }

        var payload;
        try {
          payload = JSON.parse(rawPayload);
        } catch (err) {
          console.warn("Invalid stream payload", err);
          continue;
        }

        if (payload.error) {
          throw new Error(payload.error);
        }

        if (payload.token) {
          finalText += payload.token;
          setMessageContent(assistantCard, finalText, false);
          if (els.chatLog) {
            els.chatLog.scrollTop = els.chatLog.scrollHeight;
          }
        }

        if (payload.reply) {
          finalText = payload.reply;
          setMessageContent(assistantCard, finalText, false);
        }

        if (payload.conversation_id) {
          state.conversationId = payload.conversation_id;
          saveSession();
        }
      }
    }

    if (!finalText) {
      finalText = getCopy().noResponse;
      setMessageContent(assistantCard, finalText, true);
    }

    return finalText;
  }

  async function sendChat() {
    if (state.isBusy || !els.chatInput) {
      return;
    }

    syncApiBase();

    var text = (els.chatInput.value || "").trim();
    if (!text) {
      return;
    }

    els.chatInput.value = "";
    autoResizeInput();
    appendMessage("user", text, true);
    var assistantCard = appendMessage("assistant", getCopy().thinking, true);

    setBusy(true);
    setStatus("");

    try {
      var reply = isStreamingEnabled()
        ? await sendStream(text, assistantCard)
        : await sendStandard(text, assistantCard);

      speakIfEnabled(reply);
      setStatus(getCopy().ready);
    } catch (err) {
      setMessageContent(assistantCard, getCopy().unavailableMessage, true);
      setStatus(getCopy().unavailableStatus);
      console.error(err);
    } finally {
      setBusy(false);
      if (els.chatInput) {
        els.chatInput.focus();
      }
    }
  }

  function resetChat() {
    state.conversationId = "";
    saveSession();

    if (els.chatLog) {
      els.chatLog.innerHTML = "";
    }

    appendMessage("assistant", getCopy().resetMessage);
    setStatus(getCopy().resetStatus);
  }

  function bindEvents() {
    if (els.chatForm) {
      els.chatForm.addEventListener("submit", function (event) {
        event.preventDefault();
        sendChat();
      });
    } else if (els.sendBtn) {
      els.sendBtn.addEventListener("click", sendChat);
    }

    if (els.resetBtn) {
      els.resetBtn.addEventListener("click", resetChat);
    }

    if (els.voiceInputBtn) {
      els.voiceInputBtn.addEventListener("click", readVoiceInput);
    }

    if (els.voiceToggle) {
      els.voiceToggle.addEventListener("click", function () {
        state.voiceEnabled = !state.voiceEnabled;
        updateVoiceToggle();
        saveSession();
        setStatus(state.voiceEnabled ? getCopy().voiceEnabled : getCopy().voiceDisabled);
      });

      els.voiceToggle.addEventListener("change", function () {
        if (typeof els.voiceToggle.checked === "boolean") {
          state.voiceEnabled = !!els.voiceToggle.checked;
          updateVoiceToggle();
          saveSession();
        }
      });
    }

    if (els.chatInput) {
      els.chatInput.addEventListener("input", autoResizeInput);
      els.chatInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          sendChat();
        }
      });
    }

    document.querySelectorAll(".skyler-prompt-chip").forEach(function (button) {
      button.addEventListener("click", function () {
        if (!els.chatInput || state.isBusy) {
          return;
        }

        els.chatInput.value = button.getAttribute("data-prompt") || button.textContent || "";
        autoResizeInput();
        setContextOpen(false);
        sendChat();
      });
    });

    if (els.contextToggle) {
      els.contextToggle.addEventListener("click", function () {
        setContextOpen(!document.body.classList.contains("is-skyler-context-open"));
      });
    }

    if (els.contextPanel) {
      els.contextPanel.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          setContextOpen(false);
        });
      });
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setContextOpen(false);
      }
    });

    window.addEventListener("resize", syncContextLayout);
  }

  function init() {
    cacheElements();
    loadSession();

    if (els.apiBaseInput) {
      els.apiBaseInput.value = state.apiBase;
    }

    if (els.uploadStatus) {
      els.uploadStatus.textContent = getCopy().contextOnline;
    }

    bindEvents();
    bindThreatReveal();
    updateVoiceToggle();
    syncContextLayout();
    autoResizeInput();
    setStatus(getCopy().ready);
    appendMessage("assistant", getCopy().intro);

    if ("speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.addEventListener("voiceschanged", updateVoiceToggle, { once: true });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
