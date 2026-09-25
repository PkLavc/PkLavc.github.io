import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const widgetScript = readFileSync(new URL("../../../../js/skylet-widget.js", import.meta.url), "utf8");
const dedicatedScript = readFileSync(new URL("../../../../ia/skylet-chat.js", import.meta.url), "utf8");
const indexScript = readFileSync(new URL("../../../../js/index.js", import.meta.url), "utf8");

describe("Skylet browser conversation session", () => {
  it("shares the same persisted conversation reference between the widget and /ia/", () => {
    expect(widgetScript).toContain('"aboutChatWidgetSession"');
    expect(dedicatedScript).toContain("'aboutChatWidgetSession'");
    expect(widgetScript).toContain("/conversations/history?conversation_id=");
    expect(dedicatedScript).toContain("/conversations/history?conversation_id=");
    expect(widgetScript).toContain('skyletFetch(state.apiBase + "/conversations/history?conversation_id="');
    expect(dedicatedScript).toContain("skyletFetch(`${apiBase}/conversations/history?conversation_id=");
  });

  it("persists one cryptographic visitor id shared by both clients and sends it on Skylet API calls", () => {
    expect(widgetScript).toContain('localStorage.getItem("skyletVisitorId")');
    expect(dedicatedScript).toContain("localStorage.getItem(key)");
    expect(widgetScript).toContain('localStorage.setItem("skyletVisitorId", visitorId)');
    expect(dedicatedScript).toContain("localStorage.setItem(key, created)");
    expect(widgetScript).toContain('headers.set("X-Skylet-Visitor-Id", skyletVisitorId)');
    expect(dedicatedScript).toContain("headers.set('X-Skylet-Visitor-Id', visitorId)");
    expect(widgetScript).toContain("window.crypto.randomUUID()");
    expect(dedicatedScript).toContain("crypto.randomUUID()");
  });

  it("keeps the saved conversation id on temporary history failures", () => {
    expect(widgetScript).toContain("if (response.status === 404)");
    expect(dedicatedScript).toContain("if (response.status === 404)");
    expect(widgetScript).toContain("if (!response.ok) return;");
    expect(dedicatedScript).toContain("if (!response.ok) return;");
  });

  it("confirms deletion, clears the local active id, and closes the old conversation", () => {
    expect(widgetScript).toContain("window.confirm(getCopy().confirmClearConversation)");
    expect(widgetScript).toContain("state.conversationId = \"\"");
    expect(widgetScript).toContain("/conversations/close");
    expect(dedicatedScript).toContain("window.confirm(copy.confirmClear)");
    expect(dedicatedScript).toContain("conversationId = null");
    expect(dedicatedScript).toContain("/conversations/close");
  });

  it("uses the shared /ia/ client script on all three localized assistant pages", () => {
    for (const page of ["ia/index.html", "pt/ia/index.html", "es/ia/index.html"]) {
      const html = readFileSync(new URL(`../../../../${page}`, import.meta.url), "utf8");
      expect(html).toContain("/ia/skylet-chat.js?v=df1b783729");
      expect(html).toContain("/js/index.js?v=7b1c414025");
    }
    expect(indexScript).toContain("/js/skylet-widget.js?v=abde231ee6");
    for (const page of ["about/index.html", "pt/sobre/index.html", "es/sobre/index.html"]) {
      const html = readFileSync(new URL(`../../../../${page}`, import.meta.url), "utf8");
      expect(html).toContain("/js/skylet-widget.js?v=abde231ee6");
    }
  });
});
