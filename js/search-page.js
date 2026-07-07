(function () {
    "use strict";

    var staticPages = [
        {
            title: "Home",
            url: "/",
            description: "Patrick Araujo portfolio home for backend, AI, automation, and software engineering work.",
            tags: "portfolio backend ai automation software"
        },
        {
            title: "About",
            url: "/about/",
            description: "Professional background, engineering model, stack, experience, and contact information.",
            tags: "about experience stack engineering contact"
        },
        {
            title: "Projects",
            url: "/projects/",
            description: "Backend, AI, API integration, automation, data pipeline, and software engineering projects.",
            tags: "projects backend ai api automation data"
        },
        {
            title: "Blog",
            url: "/blog/",
            description: "Engineering articles about AI systems, backend architecture, cloud, security, automation, and APIs.",
            tags: "blog articles ai backend cloud security"
        },
        {
            title: "Resume",
            url: "/resume/",
            description: "Resume-style summary for backend engineering, AI systems, automation, and integrations.",
            tags: "resume cv backend ai"
        },
        {
            title: "Uses",
            url: "/uses/",
            description: "Current tools, stack, and working setup behind the portfolio.",
            tags: "uses tools stack"
        },
        {
            title: "Now",
            url: "/now/",
            description: "Current project tracks and engineering focus areas.",
            tags: "now current projects"
        },
        {
            title: "Status",
            url: "/status/",
            description: "Public status checks for the portfolio, API, visitor analytics, feed, and sitemap.",
            tags: "status health api"
        },
        {
            title: "Media Kit",
            url: "/media-kit/",
            description: "Short bio, long bio, official links, focus areas, and contact details.",
            tags: "media kit press bio"
        },
        {
            title: "Certifications",
            url: "/certifications/",
            description: "Academic background, cloud exposure, AI studies, backend engineering, security, and reliability learning areas.",
            tags: "certifications education cloud ai security"
        }
    ];

    function normalize(value) {
        return String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function escapeHtml(value) {
        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function parseFeed(xmlText) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(xmlText, "application/xml");
        return Array.prototype.slice.call(doc.querySelectorAll("item")).map(function (item) {
            return {
                title: item.querySelector("title") ? item.querySelector("title").textContent : "",
                url: item.querySelector("link") ? item.querySelector("link").textContent.replace("https://pklavc.com", "") : "",
                description: item.querySelector("description") ? item.querySelector("description").textContent : "",
                tags: Array.prototype.slice.call(item.querySelectorAll("category")).map(function (category) {
                    return category.textContent;
                }).join(" ")
            };
        }).filter(function (item) {
            return item.title && item.url;
        });
    }

    function score(item, query) {
        var haystack = normalize([item.title, item.description, item.tags, item.url].join(" "));
        var terms = normalize(query).split(/\s+/).filter(Boolean);
        var value = 0;

        terms.forEach(function (term) {
            if (normalize(item.title).includes(term)) value += 6;
            if (normalize(item.url).includes(term)) value += 3;
            if (haystack.includes(term)) value += 2;
        });

        return value;
    }

    function render(results, query) {
        var container = document.querySelector("[data-search-results]");
        if (!container) return;

        if (!query) {
            container.innerHTML = '<p class="site-page-note">Type a term to search portfolio pages and blog articles.</p>';
            return;
        }

        if (!results.length) {
            container.innerHTML = '<p class="site-page-note">No matching pages found.</p>';
            return;
        }

        container.innerHTML = results.slice(0, 24).map(function (item) {
            return '<article class="site-search-result">' +
                '<h2><a href="' + escapeHtml(item.url) + '">' + escapeHtml(item.title) + '</a></h2>' +
                '<p>' + escapeHtml(item.description) + '</p>' +
                '</article>';
        }).join("");
    }

    function init(items) {
        var form = document.querySelector("[data-search-form]");
        var input = document.querySelector("[data-search-input]");
        var params = new URLSearchParams(window.location.search);
        var initialQuery = params.get("q") || "";

        function run() {
            var query = input.value.trim();
            var results = items.map(function (item) {
                return { item: item, score: score(item, query) };
            }).filter(function (entry) {
                return entry.score > 0;
            }).sort(function (a, b) {
                return b.score - a.score;
            }).map(function (entry) {
                return entry.item;
            });

            render(results, query);
        }

        if (!form || !input) return;
        input.value = initialQuery;
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            var query = input.value.trim();
            var url = query ? "/search/?q=" + encodeURIComponent(query) : "/search/";
            window.history.replaceState(null, "", url);
            run();
        });
        input.addEventListener("input", run);
        run();
    }

    window.fetch("/feed.xml", { cache: "force-cache" })
        .then(function (response) { return response.ok ? response.text() : ""; })
        .then(function (text) { init(staticPages.concat(text ? parseFeed(text) : [])); })
        .catch(function () { init(staticPages); });
}());
