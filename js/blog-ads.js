(function () {
    "use strict";

    var config = window.PKLAVC_ADSENSE_CONFIG || {};
    var clientId = typeof config.clientId === "string" ? config.clientId.trim() : "";
    var slotId = typeof config.blogSlotId === "string" ? config.blogSlotId.trim() : "";

    if (!/^ca-pub-\d+$/.test(clientId)) {
        return;
    }

    if (!/^\/(?:pt\/|es\/)?blog\/[^/]+\/?$/.test(window.location.pathname)) {
        return;
    }

    function loadAdSense() {
        var existing = document.querySelector('script[src^="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]');
        if (existing) {
            return;
        }

        var script = document.createElement("script");
        script.async = true;
        script.crossOrigin = "anonymous";
        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + encodeURIComponent(clientId);
        document.head.appendChild(script);
    }

    function createSlot(label) {
        var wrapper = document.createElement("aside");
        wrapper.className = "blog-ad-slot-wrapper";
        wrapper.setAttribute("aria-label", "Advertisement");
        wrapper.dataset.blogAdSlot = label;

        var slot = document.createElement("ins");
        slot.className = "adsbygoogle blog-ad-slot";
        slot.style.display = "block";
        slot.dataset.adClient = clientId;
        slot.dataset.adSlot = slotId;
        slot.dataset.adFormat = "auto";
        slot.dataset.fullWidthResponsive = "true";

        wrapper.appendChild(slot);
        return wrapper;
    }

    function pushSlot() {
        window.adsbygoogle = window.adsbygoogle || [];
        try {
            window.adsbygoogle.push({});
        } catch (_error) {
            return;
        }
    }

    function injectManualSlots() {
        if (!/^\d+$/.test(slotId)) {
            return;
        }

        var article = document.querySelector(".blog-article");
        if (!article || article.dataset.blogAdsReady === "true") {
            return;
        }

        var paragraphs = Array.prototype.slice.call(article.querySelectorAll(":scope > p")).filter(function (paragraph) {
            return paragraph.textContent.trim().length > 100;
        });

        if (paragraphs.length < 6) {
            return;
        }

        var positions = [3, Math.floor(paragraphs.length / 2)];
        if (paragraphs.length >= 16) {
            positions.push(paragraphs.length - 2);
        }

        Array.prototype.slice.call(new Set(positions))
            .filter(function (position) {
                return position > 1 && position < paragraphs.length;
            })
            .sort(function (a, b) {
                return b - a;
            })
            .forEach(function (position, index) {
                var target = paragraphs[position];
                var slot = createSlot("blog-" + String(index + 1));
                target.insertAdjacentElement("afterend", slot);
                pushSlot();
            });

        article.dataset.blogAdsReady = "true";
    }

    loadAdSense();

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", injectManualSlots, { once: true });
    } else {
        injectManualSlots();
    }
}());
