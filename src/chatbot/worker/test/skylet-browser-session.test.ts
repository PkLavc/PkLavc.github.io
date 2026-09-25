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

  it("starts a new conversation when the saved one was closed remotely", () => {
    expect(widgetScript).toContain('data.error === "conversation_closed"');
    expect(widgetScript).toContain("chatPayload.conversation_id = null");
    expect(dedicatedScript).toContain("data.error === 'conversation_closed'");
    expect(dedicatedScript).toContain("chatPayload.conversation_id = null");
  });

  it("cancels pending history restoration when the visitor clears the chat", () => {
    expect(widgetScript).toContain("conversationRestoreGeneration += 1");
    expect(widgetScript).toContain("restoringConversation = false");
    expect(widgetScript).toContain("restoreGeneration !== conversationRestoreGeneration");
    expect(dedicatedScript).toContain("conversationRestoreGeneration += 1");
    expect(dedicatedScript).toContain("restoringConversation = false");
    expect(dedicatedScript).toContain("restoreGeneration !== conversationRestoreGeneration");
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
      expect(html).toContain("/ia/skylet-chat.js?v=13083b28cf");
      expect(html).toContain("/js/index.js?v=2038092390");
    }
    expect(indexScript).toContain("/js/skylet-widget.js?v=3ce4e98fcb");
    for (const page of ["about/index.html", "pt/sobre/index.html", "es/sobre/index.html"]) {
      const html = readFileSync(new URL(`../../../../${page}`, import.meta.url), "utf8");
      expect(html).toContain("/js/skylet-widget.js?v=3ce4e98fcb");
    }
  });
});
