(function (root) {
  'use strict';

  // Small dynamic retrieval engine that runs in the visitor's browser.
  // The JSON is generated from public page descriptions, blog/posts.json,
  // About experience and store/products.json whenever GitHub Pages builds.
  // Unknown/low-confidence questions MUST go to the existing server chat.
  var dataPromise = null;
  var STOP = new Set([
    'a','o','os','as','de','da','do','dos','das','em','no','na','nos','nas','um','uma','uns','umas',
    'e','ou','com','pra','para','por','sobre','que','qual','quais','como','quando','onde','porque',
    'tem','tenho','tens','faz','fez','é','ser','foi','pode','sabe','me','diz','fala','falar','contar','mostra',
    'the','a','an','and','about','which','what','how','where','when','who','was','were','is','are',
    'of','for','with','do','does','did','to','in','on','at','can','you','your','me','my','tell',
    'el','la','los','las','un','una','en','con','del','de','sobre','cual','que','como','donde',
    'pklavc','patrick','site','website','pagina','paginas','page','pages','eu','ele','dele',
    'blog','post','posts','postagem','postagens','artigo','artigos','materia','materias','noticia','noticias',
    'projeto','projetos','project','projects','producto','productos','produto','produtos','loja','store',
    'please','favor','gostaria','queria','quero','preciso','mais','alguma','algum','todos','todas',
    'recente','recentes','ultimo','ultimos','latest','recent','recently','atual','hoje','today'
  ]);
  var STATIC_PATH = '/assets/skylet/knowledge.json';
  var groupWords = {
    projects: /\b(projetos?|projects?|proyectos?|portfolio|portafolio|portf[oó]lio|aplicacoes?|sistemas?\s+(?:criados?|feitos?))\b/i,
    blogs: /\b(blogs?|artigos?|articles?|materias?|mat[eé]rias?|postagens?|posts?|not[ií]cias?|publicou|publicadas?|publicou|publications?|publicaciones?|news)\b/i,
    stores: /\b(loja|store|shop|tienda|produtos?|products?|art[ií]culos?|productos?|itens?|items?|ofertas?|pre[cç]os?|prices?|comprar|buy|dispon[ií]veis?|availability|stock|cat[aá]logo|catalogo)\b/i,
    work: /\b(trabalh[a-z]*|empregos?|trabalho|carreira|experi[eê]ncia|cargos?|empresas?|funcao|fun[cç][aã]o|role|roles|jobs?|worked|work|career|employment|experience|empresa|trabajo|trabaj[oa]|empleos?|profissional|profesional)\b/i,
    channels: /\b(discord|telegram|youtube|instagram|tiktok|linkedin|github|whatsapp|threads|bluesky|pinterest|mastodon|canal|canais|channel|channels|redes?|social|seguir|follow|community|comunidade|perfil|profiles?|conectar|connect|videos?|v[ií]deos?|shorts?|reels?)\b/i,
    profile: /\b(quem [eé]|who is|sobre o patrick|sobre patrick|about patrick|bio|biografia|perfil|profile|skills?|habilidades?|linguagens?|stacks?|tecnologias?|formacao|forma[cç][aã]o|certifica[cç][oõ]es?)\b/i,
  };

  function norm(value) {
    return String(value || '').slice(0, 700).toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ');
  }
  function words(value) {
    return Array.from(new Set(norm(value).split(' ').filter(function (word) {
      return (word.length > 1 || /^[0-9]$/.test(word)) && !STOP.has(word);
    }))).slice(0, 15);
  }
  function localized(locale, pt, en, es) {
    return locale === 'pt' ? pt : locale === 'es' ? es : en;
  }
  function siteLink(pathname) {
    if (typeof pathname !== 'string' || !/^\/[a-z0-9/_-]*\/?$/i.test(pathname)) return '';
    return 'https://pklavc.com' + pathname;
  }
  function load() {
    if (dataPromise) return dataPromise;
    dataPromise = fetch(STATIC_PATH, { mode: 'same-origin', credentials: 'omit', cache: 'no-cache' })
      .then(function (response) {
        if (!response.ok) throw new Error('skylet_index_unavailable');
        return response.json();
      }).then(function (index) {
        if (!index || index.version !== 1 || !Array.isArray(index.pages) ||
            !Array.isArray(index.posts) || !Array.isArray(index.products) ||
            !Array.isArray(index.channels)) throw new Error('skylet_invalid_index');
        return index;
      }).catch(function () { return null; });
    return dataPromise;
  }

  function matches(queryTokens, recordTokens, text, query) {
    if (!queryTokens.length) return 0;
    var score = queryTokens.reduce(function (total, token) {
      var exact = recordTokens.indexOf(token) !== -1;
      // Don't substring-match 2- or 3-character words: avoids unrelated
      // short terms, especially when a visitor mentions a specific product.
      var partial = token.length > 3 && recordTokens.some(function (candidate) {
        return candidate.startsWith(token) || token.startsWith(candidate) && candidate.length > 3;
      });
      return total + (exact ? 3 : partial ? 1 : 0);
    }, 0);
    var queryNorm = norm(query);
    if (queryNorm.length > 6 && norm(text).includes(queryNorm)) score += 12;
    return score;
  }
  function top(entries, query, fields, n, minScore) {
    var tokens = words(query);
    if (!tokens.length) return [];
    return entries.map(function (record) {
      var main = fields.map(function (name) { return record[name] || ''; }).join(' ');
      return { record: record, score: matches(tokens, norm(main).split(' '), main, query) };
    }).filter(function (row) {
      // A single token in a long question is usually a false positive.
      return row.score >= minScore && (tokens.length <= 2 || row.score >= 5);
    }).sort(function (a, b) { return b.score - a.score; }).slice(0, n).map(function (x) { return x.record; });
  }
  function recent(query) {
    return /\b(ultim[oa]s?|recente[s]?|newest|latest|recent|atual|hoje|today)\b/i.test(norm(query));
  }
  function listing(query) {
    return /\b(quais|lista|liste|list|mostr[ea]|show|tem|existe|have|has|h[aá]|qu[eé]|que tipo|tipos|categorias?|categories?|recomenda|encontr[ao]|find|buscar|busco)\b/i.test(norm(query));
  }
  function summary(query) {
    return /\b(sobre|resum[aoe]|resumo|resume|summary|explica|explique|explain|about|o que|what is|what does|como funciona|how it works)\b/i.test(norm(query));
  }
  function highlight(title, description, path) {
    return title + (description ? ' — ' + description : '') + (path ? '\n' + path : '');
  }
  function resolveChannel(query, index, locale) {
    var q = norm(query);
    if (!groupWords.channels.test(q)) return null;
    var name = /discord|telegram|youtube|instagram|tiktok|linkedin|github|whatsapp|threads|bluesky|pinterest|mastodon/.exec(q);
    var matchesLinks = name ? index.channels.filter(function (channel) { return channel.n === name[0]; }) : [];
    if (matchesLinks.length) {
      return localized(locale, 'Links oficiais encontrados:', 'Official links found:', 'Enlaces oficiales encontrados:') +
        '\n' + matchesLinks.slice(0, 5).map(function (link) { return link.n + ': ' + link.u; }).join('\n');
    }
    // A link to the channel is not a claim about individual video content.
    return localized(locale,
      'Os canais, vídeos e redes oficiais do PkLavc estão reunidos aqui: https://pklavc.com/pt/connect/',
      'Official PkLavc channels, videos and social profiles are listed here: https://pklavc.com/connect/',
      'Los canales, vídeos y redes de PkLavc están aquí: https://pklavc.com/es/connect/');
  }
  function resolveWork(query, index, locale) {
    var q = norm(query);
    var work = Array.isArray(index.work) ? index.work : [];
    var named = work.find(function (entry) {
      return norm(entry.n).length > 3 && q.includes(norm(entry.n));
    });
    if (!groupWords.work.test(q) && !named) return null;
    if (named) {
      var roles = (named.roles || []).slice(0, 4).map(function (role) { return role.join(' — '); }).join('; ');
      return highlight(named.n, [named.d, roles].filter(Boolean).join(' '), 'https://pklavc.com/about/');
    }
    if (!work.length) return null;
    var selected = work.slice(0, 8);
    return localized(locale, 'Experiências profissionais publicadas no portfólio:', 'Published professional experience:', 'Experiencia profesional publicada:') +
      '\n' + selected.map(function (entry) {
        return '- ' + entry.n + (entry.roles && entry.roles[0] ? ' — ' + entry.roles[0][0] : '');
      }).join('\n') + '\nhttps://pklavc.com/about/';
  }
  function resolveProjects(query, index, locale) {
    var q = norm(query);
    var entries = index.pages.filter(function (p) {
      return p.l === (locale === 'en' ? 'en' : locale) &&
        /^\/(?:projects|pt\/projetos|es\/proyectos)\//.test(p.u) &&
        p.u.split('/').filter(Boolean).length > 1;
    });
    if (!entries.length) entries = index.pages.filter(function (p) {
      return p.l === 'en' && p.u.startsWith('/projects/') && p.u !== '/projects/';
    });
    var named = entries.find(function (p) {
      var name = norm(String(p.t).split(/[|—–]/)[0]);
      return name.length >= 7 && q.includes(name);
    });
    if (!groupWords.projects.test(q) && !named) return null;
    var chosen = named ? [named] : top(entries, query, ['t','d'], 4, 3);
    if (!chosen.length && listing(query)) chosen = entries.slice(0, 6);
    if (!chosen.length) return null;
    var intro = named ? '' : localized(locale,'Projetos relacionados:','Related projects:','Proyectos relacionados:') + '\n';
    return intro + chosen.map(function (p) { return highlight(p.t, p.d, siteLink(p.u)); }).join('\n\n');
  }
  function resolveBlog(query, index, locale) {
    var q = norm(query);
    if (!groupWords.blogs.test(q)) return null;
    var posts = index.posts;
    var entries = posts.map(function (p) {
      var trans = p.i && p.i[locale];
      return { t: trans ? trans[0] : p.t,
        d: trans ? trans[1] : p.d, u: trans ? trans[2] : p.u,
        tags: Array.isArray(p.tags) ? p.tags.join(' ') : '', c: p.c,
        date: p.dt };
    });
    var chosen = top(entries, query, ['t','tags','c','d'], 4, 3);
    if (!chosen.length && recent(query)) chosen = entries.slice(0, 4);
    if (!chosen.length && listing(query) && words(query).length === 0) chosen = entries.slice(0, 4);
    if (!chosen.length) return null;
    var prefix = localized(locale,'Matérias encontradas no blog:','Articles found in the blog:','Artículos encontrados en el blog:');
    return prefix + '\n' + chosen.map(function (p) {
      return highlight(p.t + (p.date ? ' (' + p.date + ')' : ''), p.d, siteLink(p.u));
    }).join('\n\n');
  }
  function resolveStore(query, index, locale) {
    var q = norm(query);
    if (!groupWords.stores.test(q)) return null;
    var products = index.products;
    if (!products.length) {
      // The public build may have an empty catalog. Never invent inventory.
      return localized(locale,
        'Consulte o catálogo atualizado na Store. Preços e disponibilidade dependem das lojas parceiras: https://pklavc.com/store/pt/',
        'View the current Store catalog. Prices and stock are controlled by the partner shops: https://pklavc.com/store/',
        'Consulta el catálogo actualizado. Los precios y existencias dependen de las tiendas asociadas: https://pklavc.com/store/es/');
    }
    if (/\b(categorias?|categories|tipos?|types|classes)\b/.test(q)) {
      var counts = {};
      products.forEach(function (p) { if (p.c) counts[p.c] = (counts[p.c] || 0) + 1; });
      var ordered = Object.keys(counts).sort(function (a,b) { return counts[b] - counts[a]; }).slice(0, 12);
      return localized(locale,'Categorias do catálogo:','Catalog categories:','Categorías del catálogo:') +
        '\n' + ordered.map(function (c) { return '- ' + c + ' (' + counts[c] + ')'; }).join('\n') +
        '\nhttps://pklavc.com/store/';
    }
    var chosen = top(products.filter(function (p) { return p.a !== false; }), query, ['n','c','b','d','s'], 5, 3);
    if (!chosen.length && recent(query) && words(query).length === 0) chosen = products.slice(0, 4);
    if (!chosen.length) return null;
    return localized(locale,'Produtos encontrados no catálogo:','Products found in the catalog:','Productos encontrados en el catálogo:') +
      '\n' + chosen.map(function (p) {
        var money = p.pr && p.cur ? ' — ' + p.pr.toLocaleString(locale === 'pt' ? 'pt-BR' : locale === 'es' ? 'es-ES' : 'en-US', { style:'currency', currency:p.cur }) : '';
        var url = p.id ? 'https://pklavc.com/store/?product=' + encodeURIComponent(p.id) : 'https://pklavc.com/store/';
        return '- ' + p.n + money + (p.c ? ' (' + p.c + ')' : '') + '\n' + url;
      }).join('\n') +
      '\n' + localized(locale,'Confira preço e estoque na loja parceira.','Confirm price and stock with the partner shop.','Confirma precio y disponibilidad en la tienda asociada.');
  }
  function resolveProfile(query, index, locale) {
    var q = norm(query);
    if (!groupWords.profile.test(q) && !/\bpatrick(?: araujo)?\b/.test(q)) return null;
    if (groupWords.work.test(q)) return null;
    var path = locale === 'pt' ? '/pt/sobre/' : locale === 'es' ? '/es/sobre/' : '/about/';
    var page = index.pages.find(function (p) { return p.u === path; }) ||
      index.pages.find(function (p) { return p.u === '/about/'; });
    if (!page) return null;
    return highlight(page.t, page.d, siteLink(page.u));
  }

  function answerFrom(index, question, history, locale) {
    var q = norm(question);
    if (!q || q.length > 600) return null;
    // Never hijack clearly unrelated conversations. In such cases, Skylet's
    // server still applies its own safety, website-scope and budget policies.
    if (/\b(previsao do tempo|weather|loteria|lottery|piada|joke|receita|bolo|cake|horoscopo)\b/.test(q)) return null;
    var lang = /^(pt|es)$/.test(locale) ? locale : 'en';
    var prior = Array.isArray(history) ? history.slice().reverse().find(function (m) {
      return m && m.role === 'user' && typeof m.content === 'string';
    }) : null;
    var actualQuestion = question;
    // Referential short follow-ups remain attached to the previous topic.
    if (prior && q.length < 52 && /^(e |mas |e o |e a |quanto custa|what about|and |y |precio|preco|onde fica)/.test(q)) {
      actualQuestion = prior.content.slice(0, 150) + ' ' + question;
    }
    var nameQuestion = norm(actualQuestion);
    var namesKnownEmployer = Array.isArray(index.work) && index.work.some(function (entry) {
      return norm(entry.n).length > 3 && nameQuestion.includes(norm(entry.n));
    });
    if (namesKnownEmployer || groupWords.work.test(nameQuestion)) return resolveWork(actualQuestion, index, lang);
    if (groupWords.channels.test(nameQuestion)) return resolveChannel(actualQuestion, index, lang);
    if (groupWords.stores.test(nameQuestion)) return resolveStore(actualQuestion, index, lang);
    if (groupWords.blogs.test(nameQuestion)) return resolveBlog(actualQuestion, index, lang);
    if (groupWords.projects.test(nameQuestion)) return resolveProjects(actualQuestion, index, lang);
    var project = resolveProjects(actualQuestion, index, lang);
    if (project) return project;
    return resolveProfile(actualQuestion, index, lang);
  }

  root.PkLavcSkyletLocal = {
    answer: function (question, history, locale) {
      if (typeof question !== 'string' || !question.trim()) return Promise.resolve(null);
      // Only ask GitHub Pages for static data on site-related questions.
      // Generic chit-chat continues through Skylet's existing route.
      var q = norm(question);
      var relevant = Object.keys(groupWords).some(function (kind) { return groupWords[kind].test(q); }) ||
        /\b(patrick|pklavc|lavc systems|skylet|loja do sapo|icaiu|codepulse|aegis|cipher gate)\b/.test(q);
      if (!relevant) return Promise.resolve(null);
      return load().then(function (data) { return data ? answerFrom(data, question, history, locale) : null; });
    }
  };
}(window));
