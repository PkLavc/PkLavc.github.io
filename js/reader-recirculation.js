(function () {
  'use strict';

  var columns = document.querySelector('.blog-shell .blog-columns');
  var initialHero = columns && columns.querySelector(':scope > div:first-child .blog-post-hero');
  var initialArticle = columns && columns.querySelector(':scope > div:first-child .blog-article');
  if (!columns || !initialHero || !initialArticle) return;

  var leftColumn = columns.firstElementChild;
  if (!leftColumn || leftColumn.querySelector('[data-pklavc-continuous-feed]')) return;

  var path = window.location.pathname.replace(/\/index\.html$/i, '/');
  var locale = /^\/blog\/pt\//.test(path) ? 'pt' : /^\/blog\/es\//.test(path) ? 'es' : 'en';
  var slug = path.split('/').filter(Boolean).pop() || '';
  if (!slug || slug === 'blog' || slug === 'en' || slug === 'pt' || slug === 'es') return;

  var copy = {
    en: {
      eyebrow: 'KEEP READING',
      title: 'More from PkLavc',
      sentinel: 'Scroll for the next article',
    },
    pt: {
      eyebrow: 'CONTINUE LENDO',
      title: 'Mais do PkLavc',
      sentinel: 'Role para o próximo artigo',
    },
    es: {
      eyebrow: 'SIGUE LEYENDO',
      title: 'Más de PkLavc',
      sentinel: 'Desplázate para ver el siguiente artículo',
    }
  }[locale];

  var feed = document.createElement('section');
  feed.className = 'pklavc-continuous-feed';
  feed.setAttribute('data-pklavc-continuous-feed', '');
  feed.setAttribute('aria-label', copy.title);
  feed.innerHTML =
    '<div class="pklavc-continuous-feed__heading">' +
      '<span>' + copy.eyebrow + '</span>' +
      '<strong>' + copy.title + '</strong>' +
    '</div>' +
    '<div data-pklavc-continuous-items></div>' +
    '<div class="pklavc-continuous-feed__sentinel" data-pklavc-continuous-sentinel><span>' + copy.sentinel + '</span></div>';
  leftColumn.appendChild(feed);

  var items = feed.querySelector('[data-pklavc-continuous-items]');
  var sentinel = feed.querySelector('[data-pklavc-continuous-sentinel]');
  var loading = false;
  var postsPromise = null;
  var nextIndex = 1;
  var urlObserver = null;

  function slugFromUrl(value) {
    try {
      var parsed = new URL(value, window.location.origin);
      return parsed.pathname.split('/').filter(Boolean).pop() || '';
    } catch (_) {
      return '';
    }
  }

  function localizedPost(post) {
    if (!post) return null;
    if (locale === 'en') {
      var englishSlug = slugFromUrl(post.url);
      if (!englishSlug) return null;
      return {
        slug: englishSlug,
        url: post.url,
        title: String(post.title || ''),
        description: String(post.description || ''),
        category: String(post.category || ''),
        date: String(post.date || '')
      };
    }
    var source = post.localized && post.localized[locale];
    if (!source || !source.url || !source.title) return null;
    return {
      slug: slugFromUrl(source.url),
      url: source.url,
      title: String(source.title || ''),
      description: String(source.description || ''),
      category: String(source.category || ''),
      date: String(source.date || post.date || '')
    };
  }

  function posts() {
    if (!postsPromise) {
      postsPromise = fetch('/blog/posts.json', { credentials: 'same-origin', cache: 'no-store' })
        .then(function (response) {
          if (!response.ok) throw new Error('posts_unavailable');
          return response.json();
        })
        .then(function (raw) {
          if (!Array.isArray(raw)) throw new Error('posts_invalid');
          var localized = raw.map(localizedPost).filter(Boolean);
          var index = localized.findIndex(function (post) { return post.slug === slug; });
          if (index < 0) {
            nextIndex = 0;
            return localized.filter(function (post) { return post.slug !== slug; });
          }
          // Start with the article already open, then walk forward through the
          // archive. Once we reach its end, the same order repeats forever.
          return localized.slice(index).concat(localized.slice(0, index));
        });
    }
    return postsPromise;
  }

  function updateMetadata(url, title, description) {
    if (url && window.location.pathname !== url) {
      history.replaceState({ pklavcContinuous: true }, '', url);
    }
    if (title) document.title = title + ' | PkLavc Blog';
    var meta = document.querySelector('meta[name="description"]');
    if (meta && description) meta.setAttribute('content', description);
  }

  function observeHero(hero, post) {
    if (!('IntersectionObserver' in window) || !hero) return;
    if (!urlObserver) {
      urlObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var node = entry.target;
          updateMetadata(
            node.getAttribute('data-pklavc-url') || '',
            node.getAttribute('data-pklavc-title') || '',
            node.getAttribute('data-pklavc-description') || ''
          );
        });
      }, { rootMargin: '-18% 0px -66% 0px', threshold: 0 });
    }
    hero.setAttribute('data-pklavc-url', post.url);
    hero.setAttribute('data-pklavc-title', post.title);
    hero.setAttribute('data-pklavc-description', post.description);
    urlObserver.observe(hero);
  }

  var initialTitleNode = initialHero.querySelector('h1');
  var initialMeta = document.querySelector('meta[name="description"]');
  observeHero(initialHero, {
    url: path,
    title: initialTitleNode ? initialTitleNode.textContent.trim() : document.title.replace(/ \| PkLavc Blog$/i, ''),
    description: initialMeta ? initialMeta.content : ''
  });

  function buildContinuousArticle(doc, post) {
    var hero = doc.querySelector('.blog-shell .blog-columns > div:first-child .blog-post-hero');
    var article = doc.querySelector('.blog-shell .blog-columns > div:first-child .blog-article');
    if (!hero || !article) throw new Error('article_markup_missing');

    hero = hero.cloneNode(true);
    article = article.cloneNode(true);
    var breadcrumb = hero.querySelector('.blog-breadcrumb');
    if (breadcrumb) breadcrumb.remove();

    var wrapper = document.createElement('section');
    wrapper.className = 'pklavc-continuous-article';
    wrapper.innerHTML = '<div class="pklavc-continuous-divider"><span>' + copy.eyebrow + '</span></div>';
    wrapper.appendChild(hero);
    wrapper.appendChild(article);
    observeHero(hero, post);
    return wrapper;
  }

  function createAdSlot() {
    var slot = document.createElement('div');
    slot.className = 'pklavc-continuous-feed__ad';
    slot.setAttribute('data-blog-continuous-ad', '');
    slot.setAttribute('aria-label', locale === 'pt' ? 'Publicidade' : locale === 'es' ? 'Publicidad' : 'Advertisement');
    return slot;
  }

  function loadNext() {
    if (loading || !sentinel) return;
    loading = true;
    sentinel.classList.add('is-loading');

    posts().then(function (allPosts) {
      if (!allPosts.length) throw new Error('articles_unavailable');
      var post = allPosts[nextIndex % allPosts.length];
      nextIndex = (nextIndex + 1) % allPosts.length;
      return fetch(post.url, { credentials: 'same-origin' })
        .then(function (response) {
          if (!response.ok) throw new Error('article_unavailable');
          return response.text();
        })
        .then(function (html) {
          var doc = new DOMParser().parseFromString(html, 'text/html');
          if (!doc.querySelector('.blog-shell .blog-columns > div:first-child .blog-post-hero') ||
              !doc.querySelector('.blog-shell .blog-columns > div:first-child .blog-article')) {
            throw new Error('article_markup_missing');
          }
          var continuedArticle = buildContinuousArticle(doc, post);
          items.appendChild(createAdSlot());
          items.appendChild(continuedArticle);
          sentinel.classList.remove('is-loading');
        });
    }).catch(function () {
      sentinel.classList.remove('is-loading');
      // A stale or unavailable archive entry must not stop the endless feed.
      // Retry at the next post after a pause to avoid a hot fetch loop.
      postsPromise = null;
      window.setTimeout(loadNext, 2000);
    }).finally(function () {
      loading = false;
    });
  }

  if ('IntersectionObserver' in window) {
    var feedObserver = new IntersectionObserver(function (entries) {
      if (entries.some(function (entry) { return entry.isIntersecting; })) loadNext();
    }, { rootMargin: '0px 0px 520px 0px', threshold: 0 });
    feedObserver.observe(sentinel);

    // Prime the first continuation immediately. The observer remains responsible
    // for subsequent articles once the sentinel moves back into view.
    window.requestAnimationFrame(loadNext);
  } else {
    // Older browsers still get one continuation instead of stopping at the
    // sentinel; a failure falls back to the archive link inside loadNext().
    loadNext();
  }
}());
