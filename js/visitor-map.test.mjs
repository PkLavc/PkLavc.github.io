import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';

const script = readFileSync(new URL('./visitor-map.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../css/visitor-map.css', import.meta.url), 'utf8');

function renderSources(lang, channels) {
  const elements = new Map();
  const document = {
    documentElement: { lang },
    readyState: 'loading',
    addEventListener() {},
    getElementById(id) {
      if (!elements.has(id)) elements.set(id, { textContent: '', innerHTML: '' });
      return elements.get(id);
    },
  };
  const window = {};
  const anchor = "  if (document.readyState === 'loading') {";
  assert.ok(script.includes(anchor), 'test uses the real page renderer');
  const instrumented = script.replace(
    anchor, '  window.__testRenderTraffic = renderTraffic;\n' + anchor,
  );
  vm.runInNewContext(instrumented, { document, window, Intl, Date, Number, Map, URL, console });
  assert.equal(typeof window.__testRenderTraffic, 'function');
  window.__testRenderTraffic({
    summary: { attributed_visits: channels.length },
    channels: channels.map((channel) => ({ channel, visits: 3 })),
    pages: [{ section: 'blog', page_key: 'story', visits: 1 }],
  });
  return elements.get('visitor-traffic-sources').innerHTML;
}

test('verified profiles get icon-only safe links, Google and unknown sources stay text', () => {
  for (const [platform, expected] of Object.entries({
    youtube: 'https://www.youtube.com/@PkLavc',
    instagram: 'https://www.instagram.com/pklavc/',
    threads: 'https://www.threads.com/@pklavc',
    mastodon: 'https://mastodon.social/@PkLavc',
    bluesky: 'https://bsky.app/profile/did:plc:ga7prbakfu23cnmjuto6v6m3',
    pinterest: 'https://www.pinterest.com/pklavc/',
    linkedin: 'https://www.linkedin.com/in/pklavc/',
    devto: 'https://dev.to/pklavc',
    tiktok: 'https://www.tiktok.com/@pklavc',
  })) {
    const html = renderSources('en', [platform]);
    assert.ok(html.includes('href="' + expected + '"'), platform + ' URL');
    assert.match(html, /target="_blank" rel="noopener noreferrer"/);
    assert.match(html, /<svg[^>]*aria-hidden="true"[^>]*>/);
    assert.match(html, /stroke="currentColor"/);
    assert.ok(!html.includes('↗'), 'unicode arrow must never become mobile emoji');
    assert.ok(html.includes('<strong>3</strong>'));
  }
  for (const platform of ['google', 'bing', 'direct', 'facebook', 'x', 'other', 'email']) {
    const html = renderSources('pt', [platform]);
    assert.ok(!html.includes('<a '), platform + ' must not link to an unrelated account');
    assert.ok(!html.includes('<svg'), platform + ' must have no icon');
  }
});

test('names and icon action are localized in EN/PT/ES', () => {
  for (const [lang, term] of [['en', 'Open profile of'], ['pt', 'Abrir perfil de'], ['es', 'Abrir perfil de']]) {
    const html = renderSources(lang, ['youtube']);
    assert.ok(html.includes('aria-label="' + term + ' YouTube"'));
  }
});

test('mobile maintains a vector icon and keyboard focus affordance', () => {
  assert.match(css, /\.visitor-traffic-profile-link\s*\{/);
  assert.match(css, /\.visitor-traffic-profile-link svg\s*\{/);
  assert.match(css, /\.visitor-traffic-profile-link:focus-visible\s*\{/);
  assert.ok(css.includes('flex: 0 0 34px'));
  assert.ok(!script.includes('link.textContent = "↗"'));
  for (const path of [
    '../visitors/index.html',
    '../pt/visitantes/index.html',
    '../es/visitantes/index.html',
  ]) {
    const html = readFileSync(new URL(path, import.meta.url), 'utf8');
    assert.match(html, /\/js\/visitor-map\.js\?v=20261016profilelinks1/);
    assert.match(html, /\/css\/visitor-map\.css\?v=20261016profilelinks1/);
  }
});
