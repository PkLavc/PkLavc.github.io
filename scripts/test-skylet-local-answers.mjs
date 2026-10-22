import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(process.argv[2] || ".pages-dist");
const jsonPath = path.join(root, "assets/skylet/knowledge.json");
const enginePath = path.join(root, "js/skylet-local-answers.js");
const widgetPath = path.join(root, "js/skylet-widget.js");
const index = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const source = fs.readFileSync(enginePath, "utf8");
const widget = fs.readFileSync(widgetPath, "utf8");
const window = {};
let jsonFetches = 0, outboundFetches = 0;
const fetch = async (url) => {
  if (url !== "/assets/skylet/knowledge.json") {
    outboundFetches += 1; throw new Error("Unexpected dynamic request: " + url);
  }
  jsonFetches += 1;
  return { ok: true, json: async () => index };
};
vm.runInNewContext(source, { window, fetch, URL, Intl, Set, Promise, console }, { timeout: 3000 });
const engine = window.PkLavcSkyletLocal;
assert.equal(typeof engine?.answer, "function");

// Mirror the widget's pre-filter; otherwise passing retrieval tests would not
// prove that a visitor can reach this engine before calling /chat.
const start = widget.indexOf("  function browserKnowledgeCandidate(question) {");
const end = widget.indexOf("\n  async function answerFromBrowser(", start);
assert.ok(start >= 0 && end > start, "Widget candidate gate missing");
const checkCandidate = vm.runInNewContext(
  widget.slice(start, end) + "\n browserKnowledgeCandidate;",
  { window }, { timeout: 1000 }
);

const checks = [];
const add = (category, question, expect, snippets = [], locale = "pt") => {
  checks.push({ category, question, expect, snippets, locale });
};
for (const question of [
  "Quem é Patrick Araujo?", "Qual o perfil do Patrick?", "Fale sobre Patrick",
  "Who is Patrick Araujo?", "Qual a biografia do Patrick?",
  "Sobre o portfólio de Patrick", "O que ele desenvolve no PkLavc?",
]) add("perfil", question, "local", [], question.startsWith("Who") ? "en" : "pt");
for (const question of [
  "Quais projetos Patrick desenvolveu?", "Quais projetos aparecem no portfólio?",
  "Show me the projects on PkLavc", "Onde encontro os projetos do PkLavc?",
  "Me fale sobre o Lavc Systems", "Como funciona o projeto Lavc Systems?",
  "Pode explicar o CodePulse Monorepo?", "Quero conhecer o Raw API Ingestion Pipeline",
  "O que faz o Aegis Sentinel?", "Como o Skylet Assistant foi construído?",
]) add("projetos", question, "local");
for (const question of [
  "Qual a experiência profissional de Patrick?", "Em quais empresas o Patrick trabalhou?",
  "Que cargo teve na Loja do Sapo?", "Patrick trabalhou na iCaiu?",
  "O que fez na WR Auto Peças?", "Onde está o histórico profissional?",
]) add("trabalho", question, "local");
for (const question of [
  "Qual a última matéria do blog?", "Quais notícias o blog publicou?",
  "Mostre as últimas notícias do PkLavc", "Tem artigos sobre GTA 6?",
  "O que publicaram sobre GTA 6?", "Quais notícias de games no blog?",
  "Me mostre uma matéria sobre tecnologia",
  "What are the latest PkLavc blog posts?"
]) add("blog", question, "local");
for (const question of [
  "Quais produtos tem na loja?", "Quais categorias de itens tem na loja?",
  "Que tipos de produtos encontro na Store?", "Tem itens Apple na loja?",
  "Quais produtos da Amazon estão na loja?", "Qual o preço dos produtos?",
  "Tem oferta de tecnologia na loja?", "What products are available in the store?"
]) add("loja", question, "local");
for (const question of [
  "Qual o Discord do PkLavc?", "Como entrar no Telegram?",
  "Onde encontro o canal do YouTube?", "Quero seguir o Instagram",
  "Quais são os canais sociais?", "Onde assistir aos vídeos do PkLavc?",
  "Onde estão os Shorts e Reels?", "Qual o TikTok do PkLavc?",
  "Link do GitHub do Patrick?", "Onde estão os vídeos no YouTube?"
]) add("canais e vídeos", question, "local");
for (const question of [
  "Qual a previsão do tempo em BH?", "Quanto é 2 + 2?",
  "Me conte uma piada", "Como criar um blog do zero?",
  "Como instalar o Python no Windows?", "Quem ganhou a Copa do Mundo?",
  "How to create a YouTube channel?", "Como fazer uma receita de bolo?"
]) add("fora do contexto", question, "fallback");

// Content-grounded checks: choose real current entities from the published
// index to test specificity without making up product or article availability.
const project = index.pages.find(p => p.l === "en" && /^\/projects\/[a-z0-9-]+\/$/.test(p.u));
const post = index.posts.find(p => /gta|rockstar/i.test([p.t, ...(p.tags || [])].join(" ")));
const product = index.products.find(p => p.n?.split(/\s+/).length >= 3 && p.a !== false);
const employer = index.work?.find(p => p.n && p.roles?.length);
if (project) add("projeto específico", "Me explique o projeto " + project.t.split(/[|—–]/)[0].trim(), "local", [project.u]);
if (post) add("artigo específico", "O blog publicou notícia sobre " + (post.tags?.[0] || "GTA") + "?", "local");
if (product) add("produto específico", "Qual o preço de " + product.n + " na loja?", "local", [product.n]);
if (employer) add("cargo específico", "Que cargo Patrick teve na " + employer.n + "?", "local", [employer.n]);

const results = [];
for (const item of checks) {
  const gate = Boolean(checkCandidate(item.question));
  let answer = null;
  let thrown = "";
  try {
    answer = await engine.answer(item.question, [], item.locale);
  } catch (e) { thrown = String(e); }
  const hasContent = typeof answer === "string" && answer.trim().length > 0;
  const expected = item.expect === "local";
  const snippetsOk = item.snippets.every(s => answer && answer.includes(s));
  const passed = (hasContent === expected) && (!expected || gate) && snippetsOk && !thrown;
  results.push({ ...item, gate, hasContent, passed, answer: String(answer || "").slice(0, 115), error: thrown });
}
const byCategory = [...new Set(checks.map(c => c.category))].map(category => {
  const rows = results.filter(r => r.category === category);
  return { category, passed: rows.filter(r => r.passed).length, total: rows.length };
});
console.log("Skylet local index:", JSON.stringify({
  pages: index.pages.length, posts: index.posts.length,
  products: index.products.length, work: (index.work || []).length,
  channels: index.channels.length
}));
console.log("Skylet tested:", results.length, "cases",
  results.filter(r => r.passed).length, "passed");
console.log("Results by category:", JSON.stringify(byCategory));
for (const row of results.filter(r => !r.passed)) {
  console.error("FAIL", JSON.stringify({
    category: row.category, question: row.question, gate: row.gate,
    expected: row.expect, got: row.hasContent ? row.answer : "fallback",
    snippets: row.snippets, error: row.error,
  }));
}
console.log("Static index fetches:", jsonFetches, "Cloudflare/outbound requests:", outboundFetches);
assert.equal(outboundFetches, 0, "Local engine must not make Worker/AI requests");
assert.equal(jsonFetches, 1, "Local data must be fetched once per page");
assert.equal(results.filter(r => !r.passed).length, 0, "Skylet scenario regression");
