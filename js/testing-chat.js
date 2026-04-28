(function () {
  var state = {
    apiBase: "https://api.pklavc.com",
    token: "",
    role: "",
    username: "",
    conversationId: "",
    voiceEnabled: false,
  };

  var els = {
    apiBaseInput: document.getElementById("api-base"),
    authUser: document.getElementById("auth-user"),
    authPass: document.getElementById("auth-pass"),
    loginBtn: document.getElementById("login-btn"),
    authStatus: document.getElementById("auth-status"),
    uploadInput: document.getElementById("pdf-upload"),
    uploadBtn: document.getElementById("upload-btn"),
    uploadStatus: document.getElementById("upload-status"),
    chatInput: document.getElementById("chat-input"),
    sendBtn: document.getElementById("send-btn"),
    streamToggle: document.getElementById("stream-toggle"),
    voiceToggle: document.getElementById("voice-toggle"),
    voiceInputBtn: document.getElementById("voice-input-btn"),
    resetBtn: document.getElementById("reset-btn"),
    chatLog: document.getElementById("chat-log"),
    adminBtn: document.getElementById("admin-btn"),
    analyticsBox: document.getElementById("analytics-box"),
  };

  function saveSession() {
    localStorage.setItem("testingChatSession", JSON.stringify({
      apiBase: state.apiBase,
      token: state.token,
      role: state.role,
      username: state.username,
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
      state.token = parsed.token || "";
      state.role = parsed.role || "";
      state.username = parsed.username || "";
      state.conversationId = parsed.conversationId || "";
    } catch (err) {
      console.warn("Invalid session cache", err);
    }
  }

  function setAuthStatus(text, ok) {
    els.authStatus.textContent = text;
    els.authStatus.style.color = ok ? "#7df5a6" : "#ffc6b3";
  }

  function appendMessage(role, text) {
    var card = document.createElement("article");
    card.className = "chat-card chat-card-" + role;
    var who = role === "assistant" ? "Bot" : "You";
    card.innerHTML = "<strong>" + who + "</strong><p></p>";
    card.querySelector("p").textContent = text;
    els.chatLog.appendChild(card);
    els.chatLog.scrollTop = els.chatLog.scrollHeight;
    return card;
  }

  async function login() {
    state.apiBase = (els.apiBaseInput.value || "").trim().replace(/\/$/, "");

    var payload = {
      username: (els.authUser.value || "").trim(),
      password: els.authPass.value || "",
    };

    if (!payload.username || !payload.password) {
      setAuthStatus("Username and password are required.", false);
      return;
    }

    try {
      var res = await fetch(state.apiBase + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      var data = await res.json();
      state.token = data.token;
      state.role = data.role;
      state.username = data.username;
      saveSession();
      setAuthStatus("Logged as " + state.username + " (" + state.role + ")", true);
      els.adminBtn.style.display = state.role === "admin" ? "inline-flex" : "none";
    } catch (err) {
      setAuthStatus("Authentication error.", false);
      console.error(err);
    }
  }

  async function uploadPdf() {
    if (!state.token) {
      els.uploadStatus.textContent = "Login first.";
      return;
    }

    if (!els.uploadInput.files.length) {
      els.uploadStatus.textContent = "Select a PDF file.";
      return;
    }

    var file = els.uploadInput.files[0];
    var formData = new FormData();
    formData.append("file", file);

    els.uploadStatus.textContent = "Uploading...";

    try {
      var res = await fetch(state.apiBase + "/upload/pdf", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + state.token,
        },
        body: formData,
      });

      var data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || "Upload failed");
      }

      els.uploadStatus.textContent = "Indexed " + data.chunks + " chunks from " + data.file_name;
    } catch (err) {
      els.uploadStatus.textContent = "Upload failed.";
      console.error(err);
    }
  }

  function readVoiceInput() {
    var Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      alert("Speech recognition is not available in this browser.");
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
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }

  async function sendChat() {
    if (!state.token) {
      appendMessage("assistant", "Please authenticate first.");
      return;
    }

    var text = (els.chatInput.value || "").trim();
    if (!text) {
      return;
    }

    els.chatInput.value = "";
    appendMessage("user", text);

    if (els.streamToggle.checked) {
      await sendStream(text);
      return;
    }

    var assistantCard = appendMessage("assistant", "Thinking...");
    try {
      var res = await fetch(state.apiBase + "/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state.token,
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
      assistantCard.querySelector("p").textContent = data.reply;
      speakIfEnabled(data.reply);
    } catch (err) {
      assistantCard.querySelector("p").textContent = "Chat failed.";
      console.error(err);
    }
  }

  async function sendStream(text) {
    var assistantCard = appendMessage("assistant", "");
    var bubble = assistantCard.querySelector("p");

    try {
      var res = await fetch(state.apiBase + "/chat/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state.token,
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
            bubble.textContent = finalText;
            els.chatLog.scrollTop = els.chatLog.scrollHeight;
          }

          if (payload.conversation_id) {
            state.conversationId = payload.conversation_id;
            saveSession();
          }
        }
      }

      speakIfEnabled(finalText);
    } catch (err) {
      bubble.textContent = "Streaming error.";
      console.error(err);
    }
  }

  async function loadAnalytics() {
    if (!state.token || state.role !== "admin") {
      return;
    }

    try {
      var res = await fetch(state.apiBase + "/admin/analytics", {
        headers: {
          Authorization: "Bearer " + state.token,
        },
      });
      var data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || "Analytics error");
      }

      var html = [
        "<div class='admin-grid'>",
        "<div><strong>Users</strong><span>" + data.users + "</span></div>",
        "<div><strong>Conversations</strong><span>" + data.conversations + "</span></div>",
        "<div><strong>Messages</strong><span>" + data.messages + "</span></div>",
        "<div><strong>Documents</strong><span>" + data.documents + "</span></div>",
        "</div>",
      ];

      if (data.events_last_7_days && data.events_last_7_days.length) {
        html.push("<ul class='event-list'>");
        data.events_last_7_days.forEach(function (item) {
          html.push("<li><b>" + item.event + "</b>: " + item.total + "</li>");
        });
        html.push("</ul>");
      }

      els.analyticsBox.innerHTML = html.join("");
    } catch (err) {
      els.analyticsBox.textContent = "Could not load analytics.";
      console.error(err);
    }
  }

  function resetChat() {
    state.conversationId = "";
    saveSession();
    els.chatLog.innerHTML = "";
    appendMessage("assistant", "Conversation memory reset.");
  }

  function bindEvents() {
    els.loginBtn.addEventListener("click", login);
    els.uploadBtn.addEventListener("click", uploadPdf);
    els.sendBtn.addEventListener("click", sendChat);
    els.resetBtn.addEventListener("click", resetChat);
    els.voiceInputBtn.addEventListener("click", readVoiceInput);
    els.voiceToggle.addEventListener("change", function () {
      state.voiceEnabled = !!els.voiceToggle.checked;
    });
    els.adminBtn.addEventListener("click", loadAnalytics);

    els.chatInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendChat();
      }
    });
  }

  function init() {
    loadSession();
    els.apiBaseInput.value = state.apiBase;
    bindEvents();

    if (state.token && state.username) {
      setAuthStatus("Session restored for " + state.username + " (" + state.role + ")", true);
      els.adminBtn.style.display = state.role === "admin" ? "inline-flex" : "none";
    }

    appendMessage("assistant", "Ready. Authenticate, upload PDFs, and start chatting with RAG + memory.");
  }

  init();
})();
