(function () {
    "use strict";

    var checks = [
        {
            id: "site",
            label: "Portfolio delivery",
            url: "/",
            ok: function (response) { return response.ok; }
        },
        {
            id: "api",
            label: "Public API health",
            url: "https://api.pklavc.com/health",
            ok: function (response) { return response.ok; }
        },
        {
            id: "visitors",
            label: "Visitor analytics API",
            url: "https://api.pklavc.com/analytics/map",
            ok: function (response) { return response.ok; }
        },
        {
            id: "feed",
            label: "RSS feed",
            url: "/feed.xml",
            ok: function (response) { return response.ok; }
        },
        {
            id: "sitemap",
            label: "Sitemap",
            url: "/sitemap.xml",
            ok: function (response) { return response.ok; }
        }
    ];

    function setStatus(id, state, detail) {
        var row = document.querySelector('[data-status-row="' + id + '"]');
        if (!row) return;

        var pill = row.querySelector("[data-status-pill]");
        var detailNode = row.querySelector("[data-status-detail]");
        if (pill) {
            pill.className = "status-pill " + state;
            pill.textContent = state === "ok" ? "Online" : state === "down" ? "Issue" : "Unknown";
        }
        if (detailNode) {
            detailNode.textContent = detail;
        }
    }

    function updateTimestamp() {
        var node = document.querySelector("[data-status-updated]");
        if (!node) return;
        node.textContent = new Date().toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short"
        });
    }

    function runCheck(check) {
        var controller = new AbortController();
        var timeout = window.setTimeout(function () {
            controller.abort();
        }, 6500);

        return window.fetch(check.url, {
            method: "GET",
            cache: "no-store",
            signal: controller.signal
        }).then(function (response) {
            window.clearTimeout(timeout);
            if (check.ok(response)) {
                setStatus(check.id, "ok", check.label + " responded with HTTP " + response.status + ".");
                return;
            }

            setStatus(check.id, "down", check.label + " responded with HTTP " + response.status + ".");
        }).catch(function () {
            window.clearTimeout(timeout);
            setStatus(check.id, "warn", "Browser could not confirm this check. CORS or network policy may block direct probing.");
        });
    }

    function init() {
        updateTimestamp();
        checks.forEach(function (check) {
            runCheck(check);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
}());
