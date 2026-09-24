(function (global) {
  "use strict";

  function normalizedPath(value) {
    try {
      var url = new URL(value, "https://pklavc.com");
      if (url.origin !== "https://pklavc.com" && url.origin !== global.location.origin) return "";
      return url.pathname.endsWith("/") ? url.pathname : url.pathname + "/";
    } catch (_) { return ""; }
  }

  function compareRecent(a, b) {
    return String(b.date || "").localeCompare(String(a.date || "")) || String(a.url).localeCompare(String(b.url));
  }

  function select(posts, currentUrl) {
    var current = normalizedPath(currentUrl);
    var valid = (Array.isArray(posts) ? posts : []).filter(function (post) {
      var path = normalizedPath(post && post.url);
      return path && path.startsWith("/blog/") && path !== current && typeof post.title === "string" && typeof post.date === "string";
    }).map(function (post) { return Object.assign({}, post, { url: normalizedPath(post.url), tags: Array.isArray(post.tags) ? post.tags : [] }); });
    var recent = valid.slice().sort(compareRecent);
    var currentEntry = (Array.isArray(posts) ? posts : []).find(function (post) { return normalizedPath(post && post.url) === current; }) || {};
    var tags = new Set((Array.isArray(currentEntry.tags) ? currentEntry.tags : []).map(function (tag) { return String(tag).toLowerCase(); }));
    var category = String(currentEntry.category || "").toLowerCase();
    var related = valid.map(function (post) {
      var tagScore = post.tags.reduce(function (score, tag) { return score + (tags.has(String(tag).toLowerCase()) ? 1 : 0); }, 0);
      var categoryScore = category && String(post.category || "").toLowerCase() === category ? 1 : 0;
      return { post: post, tagScore: tagScore, categoryScore: categoryScore };
    }).sort(function (a, b) {
      return b.tagScore - a.tagScore || b.categoryScore - a.categoryScore || compareRecent(a.post, b.post);
    }).slice(0, 3).map(function (entry) { return entry.post; });
    return { latest: recent.slice(0, 3), related: related };
  }

  function fill(list, posts) {
    if (!list) return;
    posts.forEach(function (post) {
      var li = global.document.createElement("li");
      var link = global.document.createElement("a");
      link.href = post.url;
      link.textContent = post.title;
      li.appendChild(link);
      list.appendChild(li);
    });
  }

  if (typeof module !== "undefined" && module.exports) module.exports = { select: select, normalizedPath: normalizedPath };
  if (!global.document || typeof global.fetch !== "function") return;
  global.fetch("/blog/posts.json", { credentials: "same-origin" }).then(function (response) {
    if (!response.ok) return null;
    return response.json();
  }).then(function (posts) {
    if (!Array.isArray(posts)) return;
    var lists = global.document.querySelectorAll("[data-blog-post-list]");
    var selected = select(posts, global.location.pathname);
    lists.forEach(function (list) { fill(list, list.getAttribute("data-blog-post-list") === "latest" ? selected.latest : selected.related); });
  }).catch(function () { /* Optional navigation index: fail silently. */ });
}(typeof window !== "undefined" ? window : globalThis));
