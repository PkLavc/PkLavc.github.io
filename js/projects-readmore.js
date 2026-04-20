(function () {

    function initProjectTechTicker() {
        const techNodes = document.querySelectorAll(".project-tech");

        function isDesktop() {
            return window.matchMedia("(min-width: 769px)").matches;
        }

        function prepareNode(node) {
            // Only prepare marquee for desktop
            if (!isDesktop()) {
                return;
            }

            if (node.querySelector(".project-tech-marquee")) {
                return;
            }

            const rawText = node.textContent.trim();
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
            const marquee = node.querySelector(".project-tech-marquee");
            if (marquee) {
                const text = marquee.textContent;
                node.textContent = text;
            }
        }

        function updateNode(node) {
            const marquee = node.querySelector(".project-tech-marquee");
            const firstItem = marquee ? marquee.querySelector(".project-tech-item") : null;
            if (!marquee || !firstItem) {
                return;
            }

            const itemWidth = Math.max(40, Math.ceil(firstItem.scrollWidth));
            const pxPerSecond = 30;
            const duration = Math.max(8, itemWidth / pxPerSecond);

            node.style.setProperty("--marquee-item-width", itemWidth + "px");
            node.style.setProperty("--marquee-duration", duration.toFixed(2) + "s");
        }

        techNodes.forEach(function (node) {
            if (isDesktop()) {
                prepareNode(node);
                updateNode(node);
            } else {
                removeMarquee(node);
            }
        });

        let resizeTimeout = null;
        window.addEventListener("resize", function () {
            if (resizeTimeout) {
                window.clearTimeout(resizeTimeout);
            }
            resizeTimeout = window.setTimeout(function () {
                techNodes.forEach(function (node) {
                    if (isDesktop()) {
                        prepareNode(node);
                        updateNode(node);
                    } else {
                        removeMarquee(node);
                    }
                });
            }, 150);
        });
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
