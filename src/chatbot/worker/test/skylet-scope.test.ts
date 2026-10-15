import { describe, expect, it } from "vitest";
import {
  exclusiveSiteReply, isSkyletShortFollowup, isSkyletSiteQuestion,
  skyletDailyLimitReply, skyletQuickAnswer, skyletLanguage, isSkyletCapabilitiesQuestion, normalizedSkyletText,
} from "../src/skylet-scope";

describe("Skylet's strictly website-only scope", () => {
  it("allows Patrick, portfolio, blog articles and store support", () => {
    for (const query of [
      "Quem é Patrick Araujo?", "Qual é o projeto Lavc Systems?",
      "Onde está a loja?", "Quais produtos tem na loja?",
      "O que essa postagem no blog fala do GTA 6?",
      "Where are the articles?", "How can I contact PkLavc?",
      "Há alguma notícia de bugs no blog?",
      "Como comprar itens na loja do PkLavc?",
    ]) expect(isSkyletSiteQuestion(query), query).toBe(true);
  });
  it("rejects weather, cooking, mathematics and general knowledge", () => {
    for (const query of [
      "Qual a previsão do tempo em BH?",
      "Quanto é 2 + 2?",
      "Me conte uma piada",
      "How do I build a website?",
      "Como criar um blog com IA?",
      "What is JavaScript?",
      "Qual a história do GTA 6?",
      "O que é Python?",
      "Qual o resultado da loteria?",
    ]) expect(isSkyletSiteQuestion(query), query).toBe(false);
  });
  it("returns precise ready-made multilingual site navigation, without fetching APIs", () => {
    expect(skyletQuickAnswer("Onde fica a loja?")?.reply).toContain("https://pklavc.com/store/");
    expect(skyletQuickAnswer("Onde está o blog?")?.reply).toContain("https://pklavc.com/blog/");
    expect(skyletQuickAnswer("Dónde están los visitantes?")?.reply).toContain("/es/visitantes/");
    expect(skyletQuickAnswer("Contact PkLavc")?.reply).toContain("contact@pklavc.com");
    expect(skyletQuickAnswer("Quais os preços da loja?")).toBeNull();
    expect(skyletQuickAnswer("Sobre a matéria do GTA 6")).toBeNull();
  });
  it("clearly states the restriction in the user's language", () => {
    expect(exclusiveSiteReply("Qual é a temperatura?")).toContain("exclusivamente");
    expect(exclusiveSiteReply("Tell me a joke")).toContain("only questions");
    expect(exclusiveSiteReply("¿Qué hora es?")).toContain("exclusivamente");
    expect(skyletDailyLimitReply("Quais artigos?")).toContain("limite diário");
  });
  it("handles accents, missing letters, extra letters and switched characters algorithmically", () => {
    for (const q of [
      "Onde fica a lojja?",
      "Onde está a loja?",
      "Onde encontro os progetos?",
      "Onde encontro as notcias do blog?",
      "Onde ler o artgo?",
      "Onde estão os visitantess?",
      "Where is the stroe?",
      "Where do I find the bloog?",
      "Dónde está la tiendaa?",
      "Qué hay en el blgo de PkLavc?",
    ]) expect(isSkyletSiteQuestion(q), q).toBe(true);
    expect(skyletQuickAnswer("Onde fica a lojja?")?.reply).toContain("/store/");
    expect(skyletQuickAnswer("Where is the stroe?")?.reply).toContain("/store/");
    expect(skyletQuickAnswer("Onde encontro os progetos?")?.reply).toContain("https://pklavc.com/");
    expect(skyletQuickAnswer("Dónde está la tiendaa?")?.reply).toContain("/store/");
    expect(skyletQuickAnswer("Onde ler o artgo?")?.reply).toContain("/blog/");
    expect(normalizedSkyletText("NÓTÍCIAS -- do BLOG!")).toBe("noticias do blog");
  });
  it("does not confuse unsupported/general knowledge with site questions", () => {
    for (const q of [
      "Onde fica Paris?",
      "How to create a YouTube channel?",
      "Como programar em Python?",
      "Qual é a história do GTA 6?",
      "What is JavaScript?",
      "Como faço bolo de cenoura?",
      "Quem ganhou a Copa?",
      "¿Cómo hacer una tarta?",
      "Tell me about climate change.",
    ]) expect(isSkyletSiteQuestion(q), q).toBe(false);
  });
  it("never turns specific pricing, product or fresh news questions into static FAQs", () => {
    for (const q of [
      "Quais produtos tem na lojja?",
      "Qual o preço na stroe?",
      "Qual a última matéria do blog?",
      "What is the latest blog article?",
      "Existe bug na postagem de GTA 6?",
    ]) {
      expect(isSkyletSiteQuestion(q), q).toBe(true);
      expect(skyletQuickAnswer(q), q).toBeNull();
    }
  });
  it("allows a short follow-up only when the caller establishes site context", () => {
    expect(isSkyletShortFollowup("E quanto custa?")).toBe(true);
    expect(isSkyletShortFollowup("What about the price?")).toBe(true);
    expect(isSkyletShortFollowup("Qual a previsão do tempo?")).toBe(false);
    expect(isSkyletShortFollowup("Tell me a full story about ancient history")).toBe(false);
  });
  it("understands misspelled and abbreviated Skylet capability requests without exact phrase scripts", () => {
    const questions = [
      "oque pode falar?",
      "oq vc podi fala",
      "O QUE VOCE PODE FALAR???",
      "o que você pode falar",
      "o qui vc podi flar",
      "oq vc consegue responder?",
      "quais assuntos posso perguntar?",
      "o que voce faz?",
      "no que voce pode me ajudar?",
      "qué puedes hablar?",
      "de que puedes hablar",
      "what can you do?",
      "what topics can you answer?",
    ];
    for (const question of questions) {
      expect(isSkyletCapabilitiesQuestion(question), question).toBe(true);
      expect(isSkyletSiteQuestion(question), question).toBe(true);
      const answer = skyletQuickAnswer(question);
      expect(answer?.reason, question).toBe("faq:skylet_capabilities");
      expect(answer?.reply, question).toContain("PkLavc");
    }
  });
  it("handles generated one-letter typing mistakes with the same local recognizer", () => {
    const seed = "oq vc pode falar";
    const terms = ["pode", "falar"];
    for (const term of terms) {
      for (let i = 0; i < term.length; i++) {
        const misspelled = term.slice(0, i) + term.slice(i + 1);
        const sentence = seed.replace(term, misspelled);
        expect(isSkyletCapabilitiesQuestion(sentence), sentence).toBe(true);
      }
    }
  });
  it("answers the user language, not English by default", () => {
    for (const question of ["oque pode falar?", "oq vc podi fala", "o que você pode falar?"]) {
      expect(skyletLanguage(question)).toBe("pt");
      expect(skyletQuickAnswer(question)?.reply).toContain("Posso ajudar com informações");
    }
    expect(skyletLanguage("de que puedes hablar")).toBe("es");
    expect(skyletQuickAnswer("de que puedes hablar")?.reply).toContain("Puedo ayudarte");
    expect(skyletQuickAnswer("what can you do")?.reply).toContain("I can help");
  });
  it("does not treat generic subjects as capability questions or spend a model call", () => {
    for (const question of [
      "Qual a história do GTA 6?",
      "Como fazer um bolo?",
      "Qual o valor de pi?",
      "Como posso programar um site?",
      "what is quantum mechanics?",
      "Como você faz bolo?",
      "O que pode falar sobre Python?",
    ]) {
      expect(isSkyletCapabilitiesQuestion(question), question).toBe(false);
    }
    expect(skyletQuickAnswer("Qual o preço de um produto na loja?")).toBeNull();
  });

});
