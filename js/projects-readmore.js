(function () {

    const desktopMedia = window.matchMedia("(min-width: 769px)");

    function initProjectTechTicker() {
        const techNodes = document.querySelectorAll(".project-tech");

        function prepareNode(node) {
            if (!desktopMedia.matches) {
                return;
            }

            if (node.querySelector(".project-tech-marquee")) {
                return;
            }

            const rawText = node.dataset.techText || node.textContent.trim();
            node.dataset.techText = rawText;
            node.textContent = "";

            const marquee = document.createElement("div");
            marquee.className = "project-tech-marquee";

            const itemA = document.createElement("span");
            itemA.className = "project-tech-item";
            itemA.textContent = "• " + rawText;

            const itemB = document.createElement("span");
            itemB.className = "project-tech-item";
            itemB.textContent = "• " + rawText;
            itemB.setAttribute("aria-hidden", "true");

            marquee.appendChild(itemA);
            marquee.appendChild(itemB);
            node.appendChild(marquee);
        }

        function removeMarquee(node) {
            if (node.dataset.techText) {
                node.textContent = node.dataset.techText;
            }
        }

        function syncNodes() {
            techNodes.forEach(function (node) {
                if (desktopMedia.matches) {
                    prepareNode(node);
                } else {
                    removeMarquee(node);
                }
            });
        }

        syncNodes();

        if (typeof desktopMedia.addEventListener === "function") {
            desktopMedia.addEventListener("change", syncNodes);
        } else if (typeof desktopMedia.addListener === "function") {
            desktopMedia.addListener(syncNodes);
        }
    }

    function createReadMoreForCard(card, index) {
        const titleNode = card.querySelector("h2");
        const featuresNode = card.querySelector(".project-features");
        const githubLink = card.querySelector(".project-link[href*='github.com']");
        const projectPageLink = titleNode ? titleNode.querySelector("a[href]") : null;

        if (!titleNode || !featuresNode || !githubLink) {
            return;
        }

        if (card.querySelector(".project-readmore-toggle-wrap")) {
            return;
        }

        if (!projectPageLink) {
            return;
        }

        if (!card.querySelector(".project-description")) {
            const directParagraphs = Array.from(card.children).filter(function (child) {
                return child.tagName === "P";
            });

            if (directParagraphs.length > 0) {
                const descriptionBlock = document.createElement("div");
                descriptionBlock.className = "project-description";
                card.insertBefore(descriptionBlock, directParagraphs[0]);
                directParagraphs.forEach(function (paragraph) {
                    descriptionBlock.appendChild(paragraph);
                });
            }
        }

        const toggleWrap = document.createElement("div");
        toggleWrap.className = "project-readmore-toggle-wrap";

        const button = document.createElement("button");
        button.className = "project-readmore-toggle";
        button.type = "button";
        button.textContent = "Read more";

        button.addEventListener("click", function () {
            window.location.href = projectPageLink.getAttribute("href");
        });

        toggleWrap.appendChild(button);
        card.insertBefore(toggleWrap, featuresNode);
    }

    const cards = document.querySelectorAll(".project-card");
    initProjectTechTicker();
    cards.forEach(createReadMoreForCard);
})();
