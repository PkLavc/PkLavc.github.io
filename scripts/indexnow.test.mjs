import assert from "node:assert/strict";
import test from "node:test";
import { buildPayload, parseSitemap, readSitemapTree, routeFromPath, selectSubmissionUrls, SITE, submitIndexNow, validateUrl } from "./indexnow.mjs";

const xml = (urls) => `<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${url}</loc></url>`).join("")}</urlset>`;
const key = "1234567890abcdef1234567890abcdef";
const urls = [`${SITE}/`, `${SITE}/about/`, `${SITE}/pt/sobre/`, `${SITE}/blog/example/`];

test("sitemap rejects foreign, malformed, redirect-shaped, query and fragment URLs", () => {
  assert.deepEqual(parseSitemap(xml([...urls, urls[0]])), urls);
  for (const value of ["https://example.com/", "http://pklavc.com/", "https://www.pklavc.com/", "https://pklavc.com/a/../", `${SITE}/?q=x`, `${SITE}/#person`, `${SITE}/%broken`, `${SITE}/ hello`, "javascript:alert(1)", "not a URL"]) {
    assert.throws(() => validateUrl(value), value);
    assert.throws(() => parseSitemap(xml([value])), value);
  }
  for (const malformed of ["", "<urlset><url><loc>https://pklavc.com/</loc></url>", "<urlset><url></url></urlset>", "<sitemapindex></sitemapindex>", "<urlset><url><loc>https://pklavc.com/</loc><loc>https://pklavc.com/about/</loc></url></urlset>", '<!DOCTYPE urlset SYSTEM "https://example.com/entity"><urlset></urlset>']) {
    assert.throws(() => parseSitemap(malformed));
  }
});

test("incremental submission includes changed indexed pages and old deleted routes only", () => {
  const deleted = `${SITE}/projects/removed/`;
  const result = selectSubmissionUrls({
    urls, previousUrls: [...urls, deleted],
    changedPaths: ["about/index.html", "pt/sobre/index.html", "projects/removed/index.html", "search/index.html", "src/chatbot/index.html", "README.md"],
  });
  assert.deepEqual(result, [`${SITE}/about/`, deleted, `${SITE}/pt/sobre/`].sort());
  assert.deepEqual(selectSubmissionUrls({ urls, changedPaths: ["README.md", "SEO-AUDIT.md", "scripts/indexnow.test.mjs", "src/chatbot/worker/index.ts"] }), []);
  assert.deepEqual(selectSubmissionUrls({ urls, changedPaths: ["index.html"] }), [`${SITE}/`]);
  for (const invalid of ["../about/index.html", "/about/index.html", "about\\index.html", "about//index.html", "about/./index.html", "about/index.html?query", "https://evil.com/index.html"]) {
    assert.equal(routeFromPath(invalid), null);
  }
});

test("initial and site-wide SEO changes include the sitemap; removed pages remain included", () => {
  assert.deepEqual(selectSubmissionUrls({ urls, all: true }), [...urls].sort());
  assert.deepEqual(selectSubmissionUrls({ urls, changedPaths: ["scripts/normalize-seo.mjs"] }), [...urls].sort());
  assert.deepEqual(selectSubmissionUrls({ urls, changedPaths: ["robots.txt"] }), [...urls].sort());
  const removed = `${SITE}/blog/removed/`;
  assert.deepEqual(selectSubmissionUrls({ urls, all: true, changedPaths: ["blog/removed/index.html"], previousUrls: [removed] }), [...urls, removed].sort());
});

test("migration reads historical sitemap indexes and notifies pages removed by build normalization", () => {
  const oldUtility = `${SITE}/status/`;
  const files = {
    "sitemap.xml": `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${SITE}/sitemaps/pages.xml</loc></sitemap><sitemap><loc>${SITE}/sitemaps/blog.xml</loc></sitemap></sitemapindex>`,
    "sitemaps/pages.xml": xml([...urls.slice(0, 3), oldUtility]),
    "sitemaps/blog.xml": xml(urls.slice(3)),
  };
  const previousUrls = readSitemapTree((file) => {
    assert.ok(Object.hasOwn(files, file));
    return files[file];
  });
  assert.deepEqual(previousUrls, [...urls.slice(0, 3), oldUtility, ...urls.slice(3)]);
  assert.deepEqual(selectSubmissionUrls({ urls, previousUrls, changedPaths: ["scripts/normalize-seo.mjs"] }), [...urls, oldUtility].sort());
  assert.deepEqual(selectSubmissionUrls({ urls, previousUrls, changedPaths: ["SEO-AUDIT.md"] }), []);
  for (const invalid of ["https://example.com/sitemap.xml", `${SITE}/../sitemap.xml`, `${SITE}/%2e%2e/sitemap.xml`, `${SITE}/sitemaps/file.txt`]) {
    assert.throws(() => readSitemapTree(() => `<sitemapindex><sitemap><loc>${invalid}</loc></sitemap></sitemapindex>`));
  }
});

test("payload validates key and protocol size limits without accepting other hosts", () => {
  const payload = buildPayload(key, [...urls, urls[0]]);
  assert.equal(payload.host, "pklavc.com");
  assert.equal(payload.keyLocation, `${SITE}/indexnow-key.txt`);
  assert.deepEqual(payload.urlList, urls);
  assert.throws(() => buildPayload("short", urls));
  assert.throws(() => buildPayload("bad/characters", urls));
  assert.throws(() => buildPayload(key, []));
  assert.throws(() => buildPayload(key, ["https://example.com/"]));
  assert.throws(() => buildPayload(key, Array.from({ length: 10001 }, (_, i) => `${SITE}/page-${i}/`)));
});

test("submission requires the published exact ownership file before POST", async () => {
  for (const response of [new Response("Not found", { status: 404 }), new Response("<html>Site error</html>", { status: 200 }), new Response("different-key", { status: 200 })]) {
    const calls = [];
    await assert.rejects(submitIndexNow(buildPayload(key, urls), {
      keyAttempts: 1,
      fetchImpl: async (url, options) => { calls.push({ url, options }); return response; },
    }), /no URLs were submitted/);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].options.redirect, "error");
    assert.equal(calls[0].options.method, undefined);
  }
});

test("HTTP 200 and 202 have distinct receipt semantics; API errors are not retried", async () => {
  for (const status of [200, 202, 403, 422, 429, 500]) {
    const calls = [];
    const request = submitIndexNow(buildPayload(key, urls), {
      fetchImpl: async (url, options) => {
        calls.push({ url, options });
        return options.method === "POST" ? new Response(null, { status }) : new Response(`${key}\n`, { status: 200 });
      },
    });
    if ([200, 202].includes(status)) {
      assert.deepEqual(await request, { status, count: urls.length, verificationPending: status === 202 });
    } else await assert.rejects(request, new RegExp(`HTTP ${status}`));
    assert.equal(calls.length, 2);
    assert.equal(calls[1].url, "https://api.indexnow.org/indexnow");
    assert.deepEqual(JSON.parse(calls[1].options.body), buildPayload(key, urls));
  }
});

test("brief ownership publication delay is retried before any submission", async () => {
  let calls = 0;
  let waited = 0;
  const result = await submitIndexNow(buildPayload(key, urls), {
    wait: async () => { waited += 1; },
    fetchImpl: async (_, options) => {
      calls += 1;
      if (calls === 1) return new Response(null, { status: 404 });
      return options.method === "POST" ? new Response(null, { status: 202 }) : new Response(key, { status: 200 });
    },
  });
  assert.equal(calls, 3);
  assert.equal(waited, 1);
  assert.equal(result.verificationPending, true);
});

test("CI submits only after its exact commit is publicly deployed", async () => {
  const expectedSha = "a".repeat(40);
  const staleSha = "b".repeat(40);
  const calls = [];
  await assert.rejects(submitIndexNow(buildPayload(key, urls), {
    expectedSha, deploymentAttempts: 1,
    fetchImpl: async (url, options) => {
      calls.push({ url, options });
      return Response.json({ commit: staleSha });
    },
  }), /expected commit is not publicly deployed/);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, `${SITE}/.well-known/site-deployment.json?v=${expectedSha}`);
  assert.equal(calls[0].options.method, undefined);

  calls.length = 0;
  const result = await submitIndexNow(buildPayload(key, urls), {
    expectedSha, wait: async () => {},
    fetchImpl: async (url, options) => {
      calls.push({ url, options });
      if (url.includes("site-deployment.json")) return Response.json({ commit: calls.length === 1 ? staleSha : expectedSha });
      return options.method === "POST" ? new Response(null, { status: 200 }) : new Response(key);
    },
  });
  assert.equal(calls.length, 4);
  assert.equal(calls.at(-1).options.method, "POST");
  assert.equal(result.status, 200);
});
