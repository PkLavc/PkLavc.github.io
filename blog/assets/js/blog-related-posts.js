(function (global) {
  "use strict";

  function isProjectMounted() {
    // The CommonJS selector tests do not provide a browser location.  Their
    // inputs use public /blog routes, so keep those routes intact by default.
    if (!global.location) return true;
    return /^\/blog(?:\/|$)/.test(global.location.pathname || "");
  }

  function normalizedPath(value) {
    try {
      var url = new URL(value, "https://pklavc.com");
      if (url.origin !== "https://pklavc.com" && url.origin !== global.location.origin) return "";
      var pathname = url.pathname;
      if (!isProjectMounted() && pathname.indexOf("/blog/") === 0) pathname = pathname.slice(5) || "/";
      return pathname.endsWith("/") ? pathname : pathname + "/";
    } catch (_) { return ""; }
  }

  function languageFor(path) {
    return path.indexOf("/blog/pt/") === 0 || path.indexOf("/pt/") === 0 ? "pt" :
      path.indexOf("/blog/es/") === 0 || path.indexOf("/es/") === 0 ? "es" : "en";
  }

  function englishPath(path) {
    if (path.indexOf("/blog/") === 0) return path.replace(/^\/blog\/(?:en\/|pt\/|es\/)?/, "/");
    return path.replace(/^\/(?:en|pt|es)\//, "/");
  }

  function localized(post, language) {
    var variant = post.localized && post.localized[language];
    if (!variant) return { url: post.url, title: post.title, category: post.category, tags: post.tags || [], date: post.date };
    return {
      url: variant.url || post.url,
      title: variant.title || post.title,
      category: variant.category || post.category,
      tags: Array.isArray(variant.tags) ? variant.tags : (post.tags || []),
      date: variant.date || post.date
    };
  }

  function compareRecent(a, b) {
    return String(b.date || "").localeCompare(String(a.date || "")) || String(a.url).localeCompare(String(b.url));
  }

  function select(posts, currentUrl) {
    var current = normalizedPath(currentUrl);
    var currentEnglish = englishPath(current);
    var language = languageFor(current);
    var seen = new Set();
    var valid = (Array.isArray(posts) ? posts : []).filter(function (post) {
      var path = normalizedPath(post && post.url);
      if (!path || !(path.startsWith("/blog/") || /^\/(?:en|pt|es)\//.test(path)) || !post || typeof post.title !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(post.date || "")) return false;
      var key = englishPath(path);
      if (key === currentEnglish || seen.has(key)) return false;
      seen.add(key);
      return true;
    }).map(function (post) {
      var result = localized(post, language);
      result.key = englishPath(normalizedPath(post.url));
      result.tags = Array.isArray(result.tags) ? result.tags : [];
      return result;
    });
    var recent = valid.slice().sort(compareRecent);
    var currentEntry = (Array.isArray(posts) ? posts : []).find(function (post) { return englishPath(normalizedPath(post && post.url)) === currentEnglish; }) || {};
    var currentVariant = localized(currentEntry, language);
    var tags = new Set((Array.isArray(currentVariant.tags) ? currentVariant.tags : []).map(function (tag) { return String(tag).toLowerCase(); }));
    var category = String(currentVariant.category || "").toLowerCase();
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
    while (list.firstChild) list.removeChild(list.firstChild);
    posts.forEach(function (post) {
      var li = global.document.createElement("li");
      var link = global.document.createElement("a");
      var target = post.url;
      if (!isProjectMounted() && target.indexOf("/blog/") === 0) target = target.slice(5) || "/";
      link.href = target;
      link.textContent = post.title;
      li.appendChild(link);
      list.appendChild(li);
    });
  }

  function ensureSidebarLists() {
    var sidebar = global.document.querySelector(".blog-article-grid");
    if (!sidebar) return;
    var language = languageFor(global.location.pathname);
    var titles = language === "pt" ? ["Publicações recentes", "Publicações relacionadas"] : language === "es" ? ["Publicaciones recientes", "Publicaciones relacionadas"] : ["Latest posts", "Related posts"];
    var cards = Array.prototype.slice.call(sidebar.querySelectorAll(".blog-sidebar-card"));
    var aliases = {
      latest: [titles[0], "Latest posts", "Publicações recentes", "Publicaciones recientes"],
      related: [titles[1], "Related posts", "Publicações relacionadas", "Publicaciones relacionadas", "Leitura relacionada", "Artigos relacionados", "Artículos relacionados"]
    };
    function find(title) {
      return cards.find(function (card) { var h = card.querySelector("h2"); return h && h.textContent.trim().toLowerCase() === title.toLowerCase(); });
    }
    function ensure(title, key, before) {
      var card = null;
      for (var i = 0; i < aliases[key].length && !card; i += 1) card = find(aliases[key][i]);
      var list = card && card.querySelector("[data-blog-post-list]");
      if (!card) {
        card = global.document.createElement("section");
        card.className = "blog-sidebar-card";
        var heading = global.document.createElement("h2");
        heading.textContent = title;
        list = global.document.createElement("ul");
        list.setAttribute("aria-live", "polite");
        card.appendChild(heading);
        card.appendChild(list);
        if (before && before.parentNode === sidebar) sidebar.insertBefore(card, before);
        else sidebar.appendChild(card);
        cards.push(card);
      } else if (!list) {
        Array.prototype.slice.call(card.children).forEach(function (child) {
          if (child.tagName.toLowerCase() !== "h2") card.removeChild(child);
        });
        list = global.document.createElement("ul");
        list.setAttribute("aria-live", "polite");
        card.appendChild(list);
      }
      list.setAttribute("data-blog-post-list", key);
      return list;
    }
    var related = find(titles[1]);
    ensure(titles[0], "latest", related);
    ensure(titles[1], "related", null);
  }

  function promoteArticleArtwork() {
    if (!global.document) return;
    var hero = global.document.querySelector(".blog-post-hero");
    if (!hero || hero.querySelector(".blog-story-hero-image")) return;
    var figure = global.document.querySelector(".blog-article > .blog-source-image");
    var sourceImage = figure && figure.querySelector("img");
    var image = null;
    if (sourceImage) {
      image = sourceImage.cloneNode(false);
    } else {
      var socialImage = global.document.querySelector('meta[property="og:image"]');
      if (!socialImage || !socialImage.content) return;
      image = global.document.createElement("img");
      image.src = socialImage.content;
      image.alt = (global.document.querySelector("h1") || {}).textContent || "Article artwork";
    }

    image.className = "blog-story-hero-image";
    image.removeAttribute("loading");
    image.setAttribute("fetchpriority", "high");
    image.setAttribute("decoding", "async");
    var sourceLink = figure && figure.querySelector("a[href]");
    if (sourceLink) image.setAttribute("data-source-url", sourceLink.href);
    hero.classList.add("blog-story-hero");
    hero.insertBefore(image, hero.firstChild);

    var originalCaption = figure && figure.querySelector("figcaption");
    if (originalCaption) {
      var credit = global.document.createElement("span");
      credit.className = "blog-story-image-credit";
      credit.innerHTML = originalCaption.innerHTML;
      hero.appendChild(credit);
    }
    if (figure) figure.hidden = true;
  }

  if (typeof module !== "undefined" && module.exports) module.exports = { select: select, normalizedPath: normalizedPath };
  if (!global.document || typeof global.fetch !== "function") return;
  promoteArticleArtwork();
  ensureSidebarLists();
  var postsIndex = isProjectMounted() ? "/blog/posts.json" : "/en/posts.json";
  global.fetch(postsIndex, { credentials: "same-origin" }).then(function (response) {
    if (!response.ok) return null;
    return response.json();
  }).then(function (posts) {
    if (!Array.isArray(posts)) return;
    var lists = global.document.querySelectorAll("[data-blog-post-list]");
    var selected = select(posts, global.location.pathname);
    lists.forEach(function (list) { fill(list, list.getAttribute("data-blog-post-list") === "latest" ? selected.latest : selected.related); });
  }).catch(function () { /* Optional navigation index: fail silently. */ });
}(typeof window !== "undefined" ? window : globalThis));
