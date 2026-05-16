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
    launcher.innerHTML = '<img src="/images/icon_skyler.webp?v=4b80b918a0" alt="Skyler chat icon" width="56" height="56" loading="eager" decoding="async">';

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

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  var LINK_LABELS = {
    "mailto:contact@pklavc.com": "Send Email",
    "https://www.linkedin.com/in/pklavc/": "Open LinkedIn",
    "https://github.com/PkLavc": "View GitHub",
    "https://github.com/PkLavc/": "View GitHub",
    "https://github.com/sponsors/PkLavc": "Sponsor Patrick",
    "https://pklavc.com/": "Open Portfolio",
    "https://pklavc.com/projects/": "Browse Projects",
    "https://pklavc.com/blog/": "Read Blog",
    "https://pklavc.com/about/": "About Patrick",
    "https://pklavc.com/projects/lavc-systems/": "View Lavc Systems",
    "https://pklavc.com/projects/skyler-assistant/": "View Skyler Assistant",
    "https://pklavc.com/projects/skyler-assistant/demo/": "Open Skyler Demo",
    "https://pklavc.com/projects/codepulse-monorepo/": "View CodePulse",
    "https://pklavc.com/projects/google-auth-worker/": "View Google Auth Worker",
    "https://pklavc.com/projects/zoho-integration-worker/": "View Zoho Worker",
    "https://pklavc.com/projects/hablla-integration-worker/": "View Hablla Worker",
    "https://pklavc.com/projects/zenvia-integration-worker/": "View Zenvia Worker",
    "https://pklavc.com/projects/sige-integration-worker/": "View SIGE Worker",
    "https://pklavc.com/projects/omie-integration-worker/": "View Omie Worker",
    "https://pklavc.com/projects/multi-tenant-saas-platform/": "View SaaS Platform",
    "https://pklavc.com/projects/cipher-gate-proxy/": "View Cipher Gate",
    "https://pklavc.com/projects/event-driven-integration-service/": "View Event-Driven Service",
    "https://pklavc.com/projects/aegis-sentinel/": "View Aegis Sentinel",
    "https://pklavc.com/projects/cloud-deployment-showcase/": "View Cloud Deployment",
    "https://pklavc.com/projects/os-resource-optimizer/": "View OS Optimizer",
    "https://github.com/PkLavc/codepulse-monorepo": "View on GitHub",
    "https://github.com/PkLavc/codepulse-monorepo/": "View on GitHub",
  };

  function getLinkLabel(href) {
    if (LINK_LABELS[href]) return LINK_LABELS[href];
    var alt = href.endsWith("/") ? href.slice(0, -1) : href + "/";
    if (LINK_LABELS[alt]) return LINK_LABELS[alt];
    if (href.startsWith("mailto:")) return "Send Email";
    if (href.includes("linkedin.com")) return "Open LinkedIn";
    if (href.includes("github.com/PkLavc") || href.includes("github.com/pklavc")) return "View GitHub";
    if (href.includes("pklavc.com/projects/")) return "View Project";
    if (href.includes("pklavc.com/blog/")) return "Read Post";
    if (href.includes("pklavc.com")) return "Visit Page";
    return "Visit Link";
  }

  function parseMarkdown(md) {
    var out = md;
    // 1. Fenced code blocks
    out = out.replace(/```(?:\w*)\n?([\s\S]*?)```/g, function (_, code) {
      return '<pre class="skyler-pre"><code>' + code.replace(/^[\n]+|[\n]+$/g, "") + "</code></pre>";
    });
    // 2. Inline code
    out = out.replace(/`([^`\n]+)`/g, '<code class="skyler-code">$1</code>');
    // 3. Headers → bold block
    out = out.replace(/^#{1,6}\s+(.+)$/gm, '<strong class="skyler-heading">$1</strong>');
    // 4. Bold
    out = out.replace(/\*\*([^*\n]+?)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/__([^_\n]+?)__/g, '<strong>$1</strong>');
    // 5. Italic
    out = out.replace(/\*([^*\n]+?)\*/g, '<em>$1</em>');
    out = out.replace(/_([^_\n]+?)_/g, '<em>$1</em>');
    // 6. Strikethrough
    out = out.replace(/~~([^~\n]+?)~~/g, '<del>$1</del>');
    // 7. Unordered lists
    out = out.replace(/((?:^[*\-+] .+$\n?)+)/gm, function (block) {
      var items = block.trim().split("\n").map(function (line) {
        return "<li>" + line.replace(/^[*\-+] /, "") + "</li>";
      });
      return '<ul class="skyler-ul">' + items.join("") + "</ul>";
    });
    // 8. Ordered lists
    out = out.replace(/((?:^\d+\.\s+.+$\n?)+)/gm, function (block) {
      var items = block.trim().split("\n").map(function (line) {
        return "<li>" + line.replace(/^\d+\.\s+/, "") + "</li>";
      });
      return '<ol class="skyler-ol">' + items.join("") + "</ol>";
    });
    // 9. Newlines to <br>
    out = out.replace(/\n/g, "<br>");
    return out;
  }

  function renderMessageContent(text) {
    var seenHrefs = Object.create(null);
    var buttons = [];

    function trackHref(href) {
      var key = href.endsWith("/") ? href : href + "/";
      if (seenHrefs[key] || seenHrefs[href]) return false;
      seenHrefs[key] = seenHrefs[href] = true;
      return true;
    }

    // Escape HTML first so user-supplied text cannot inject markup
    var html = escapeHtml(text);

    // Parse markdown formatting
    html = parseMarkdown(html);

    // Replace email addresses
    html = html.replace(/([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/g, function (email) {
      var href = "mailto:" + email;
      if (trackHref(href)) buttons.push(href);
      return '<a href="' + href + '" class="skyler-inline-link">' + email + "</a>";
    });

    // Replace https URLs (strip trailing punctuation)
    html = html.replace(/(https?:\/\/[^\s<>"']+)/g, function (raw) {
      var clean = raw.replace(/[.,;:!?'")\]]+$/, "");
      var tail = raw.slice(clean.length);
      if (trackHref(clean)) buttons.push(clean);
      return (
        '<a href="' + clean + '" class="skyler-inline-link" target="_blank" rel="noopener noreferrer">' +
        clean +
        "</a>" +
        (tail ? escapeHtml(tail) : "")
      );
    });

    if (buttons.length) {
      // When a parent section page is present, collapse individual sub-page buttons
      var sectionParents = ["https://pklavc.com/projects/", "https://pklavc.com/blog/"];
      var activeParents = sectionParents.filter(function (p) {
        return buttons.some(function (b) { return (b.endsWith("/") ? b : b + "/") === p; });
      });
      var displayButtons = activeParents.length ? buttons.filter(function (href) {
        var norm = href.endsWith("/") ? href : href + "/";
        for (var i = 0; i < activeParents.length; i++) {
          if (norm !== activeParents[i] && norm.startsWith(activeParents[i])) return false;
        }
        return true;
      }) : buttons;
      html += '<div class="skyler-action-btns">';
      displayButtons.forEach(function (href) {
        var isExternal = !href.startsWith("mailto:") && !href.includes("pklavc.com");
        var label = getLinkLabel(href);
        html +=
          '<a href="' +
          href +
          '" class="skyler-action-btn"' +
          (isExternal ? ' target="_blank" rel="noopener noreferrer"' : "") +
          ">" +
          escapeHtml(label) +
          "</a>";
      });
      html += "</div>";
    }

    return html;
  }

  function appendMessage(role, text, rawText) {
    if (!els.log) {
      return null;
    }

    var node = document.createElement("article");
    node.className = "about-chat-message " + role;
    if (rawText) {
      node.textContent = text;
    } else {
      node.innerHTML = renderMessageContent(text);
    }
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
    appendMessage("user", text, true);
    setStatus("Skyler is thinking...");
    var thinking = appendMessage("assistant", "Thinking...", true);

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
        thinking.innerHTML = renderMessageContent(data.reply || "No response.");
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
