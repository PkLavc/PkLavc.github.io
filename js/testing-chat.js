(function () {
  var state = {
    apiBase: "https://api.pklavc.com",
    conversationId: "",
    voiceEnabled: false,
  };

  var els = {
    apiBaseInput: document.getElementById("api-base"),
    authStatus: document.getElementById("auth-status"),
    uploadStatus: document.getElementById("upload-status"),
    chatInput: document.getElementById("chat-input"),
    sendBtn: document.getElementById("send-btn"),
    streamToggle: document.getElementById("stream-toggle"),
    voiceToggle: document.getElementById("voice-toggle"),
    voiceInputBtn: document.getElementById("voice-input-btn"),
    resetBtn: document.getElementById("reset-btn"),
    chatLog: document.getElementById("chat-log"),
    analyticsBox: document.getElementById("analytics-box"),
  };

  function saveSession() {
    localStorage.setItem("testingChatSession", JSON.stringify({
      apiBase: state.apiBase,
      conversationId: state.conversationId,
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
    } catch (err) {
      console.warn("Invalid session cache", err);
    }
  }

  function appendMessage(role, text) {
    if (!els.chatLog) {
      return null;
    }

    var card = document.createElement("article");
    card.className = "chat-card chat-card-" + role;
    var who = role === "assistant" ? "Skylet" : "You";
    card.innerHTML = "<strong>" + who + "</strong><p></p>";
    card.querySelector("p").textContent = text;
    els.chatLog.appendChild(card);
    els.chatLog.scrollTop = els.chatLog.scrollHeight;
    return card;
  }

  function readVoiceInput() {
    var Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      alert("Speech recognition is not available in this browser.");
      return;
    }

    if (!els.chatInput) {
      return;
    }

    var recognition = new Recognition();
    recognition.lang = navigator.language || "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = function (event) {
      if (event.results && event.results[0] && event.results[0][0]) {
        els.chatInput.value = event.results[0][0].transcript;
      }
    };

    recognition.start();
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

  function pickPreferredFemaleVoice(language) {
    if (!("speechSynthesis" in window)) {
      return null;
    }

    var voices = window.speechSynthesis.getVoices() || [];
    if (!voices.length) {
      return null;
    }

    var femaleHints = /female|woman|samantha|victoria|ava|allison|jenny|aria|sara|sonia|karen|moira|tessa|zira|zira desktop|hazel|susan/i;
    var preferred = voices.find(function (voice) {
      return femaleHints.test(voice.name) && (!language || voice.lang.indexOf(language.slice(0, 2)) === 0);
    });

    if (preferred) {
      return preferred;
    }

    return voices.find(function (voice) {
      return femaleHints.test(voice.name);
    }) || null;
  }

  async function sendChat() {
    var apiBaseNode = document.getElementById("api-base");
    state.apiBase = ((apiBaseNode && apiBaseNode.value) || "").trim().replace(/\/$/, "");

    var chatInputNode = document.getElementById("chat-input");
    var text = ((chatInputNode && chatInputNode.value) || "").trim();
    if (!text) {
      return;
    }

    if (chatInputNode) {
      chatInputNode.value = "";
    }
    appendMessage("user", text);

    var streamNode = document.getElementById("stream-toggle");
    if (streamNode && streamNode.checked) {
      await sendStream(text);
      return;
    }

    var assistantCard = appendMessage("assistant", "Thinking...");
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
        throw new Error(data.detail || "Chat failed");
      }

      state.conversationId = data.conversation_id;
      saveSession();
      if (assistantCard) {
        assistantCard.querySelector("p").textContent = data.reply;
      }
      speakIfEnabled(data.reply);
    } catch (err) {
      if (assistantCard) {
        assistantCard.querySelector("p").textContent = "Chat failed.";
      }
      console.error(err);
    }
  }

  async function sendStream(text) {
    var assistantCard = appendMessage("assistant", "");
    var bubble = assistantCard ? assistantCard.querySelector("p") : null;

    try {
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

          var payload = JSON.parse(line.slice(5).trim());
          if (payload.token) {
            finalText += payload.token;
            if (bubble) {
              bubble.textContent = finalText;
            }
            if (els.chatLog) {
              els.chatLog.scrollTop = els.chatLog.scrollHeight;
            }
          }

          if (payload.conversation_id) {
            state.conversationId = payload.conversation_id;
            saveSession();
          }
        }
      }

      speakIfEnabled(finalText);
    } catch (err) {
      if (bubble) {
        bubble.textContent = "Streaming error.";
      }
      console.error(err);
    }
  }

  function resetChat() {
    state.conversationId = "";
    saveSession();
    if (els.chatLog) {
      els.chatLog.innerHTML = "";
    }
    appendMessage("assistant", "Conversation memory reset.");
  }

  function bindEvents() {
    if (els.sendBtn) {
      els.sendBtn.addEventListener("click", sendChat);
    }

    if (els.resetBtn) {
      els.resetBtn.addEventListener("click", resetChat);
    }

    if (els.voiceInputBtn) {
      els.voiceInputBtn.addEventListener("click", readVoiceInput);
    }

    if (els.voiceToggle) {
      els.voiceToggle.addEventListener("change", function () {
        state.voiceEnabled = !!els.voiceToggle.checked;
      });
    }

    if (els.chatInput) {
      els.chatInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          sendChat();
        }
      });
    }
  }

  function init() {
    loadSession();
    if (els.apiBaseInput) {
      els.apiBaseInput.value = state.apiBase;
    }
    bindEvents();

    if (els.authStatus) {
      els.authStatus.textContent = "Public mode enabled. Authentication is not required for chat.";
      els.authStatus.style.color = "#7df5a6";
    }

    if (els.analyticsBox) {
      els.analyticsBox.textContent = "Public chat mode is active. Rate limiting protects API costs and abuse.";
    }

    if (els.uploadStatus) {
      els.uploadStatus.textContent = "Internal portfolio context is enabled (no external document upload required).";
    }

    appendMessage("assistant", "Ready. Public chat mode is active.");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
