import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const widgetScript = readFileSync(new URL("../../../../js/skylet-widget.js", import.meta.url), "utf8");
const dedicatedScript = readFileSync(new URL("../../../../ia/skylet-chat.js", import.meta.url), "utf8");

describe("Skylet browser conversation session", () => {
  it("shares the same persisted conversation reference between the widget and /ia/", () => {
    expect(widgetScript).toContain('"aboutChatWidgetSession"');
    expect(dedicatedScript).toContain("'aboutChatWidgetSession'");
    expect(widgetScript).toContain("/conversations/history?conversation_id=");
    expect(dedicatedScript).toContain("/conversations/history?conversation_id=");
    expect(widgetScript).toContain('fetch(state.apiBase + "/conversations/history?conversation_id="');
    expect(dedicatedScript).toContain("fetch(`${apiBase}/conversations/history?conversation_id=");
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
      expect(html).toContain("/ia/skylet-chat.js");
    }
  });
});
