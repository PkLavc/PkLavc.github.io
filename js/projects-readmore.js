(function () {
    const markdownCache = Object.create(null);
    let mermaidInitialized = false;

    const readmeFileByProject = {
        "Google Auth Worker": "readmes/google-auth-worker.md",
        "Zoho Integration Worker": "readmes/zoho-integration-worker.md",
        "Hablla Integration Worker": "readmes/hablla-integration-worker.md",
        "Zenvia Integration Worker": "readmes/zenvia-integration-worker.md",
        "SIGE Integration Worker": "readmes/sige-integration-worker.md",
        "Omie Integration Worker": "readmes/omie-integration-worker.md",
        "CodePulse Monorepo": "readmes/codepulse-monorepo.md",
        "OS Resource Optimizer": "readmes/os-resource-optimizer.md",
        "Multi-Tenant SaaS Platform": "readmes/multi-tenant-saas-platform.md",
        "Cipher Gate Proxy": "readmes/cipher-gate-proxy.md",
        "Event-Driven Service": "readmes/event-driven-service.md",
        "Aegis Sentinel": "readmes/aegis-sentinel.md",
        "Cloud Deployment Showcase": "readmes/cloud-deployment-showcase.md"
    };

    function getModalElements() {
        let overlay = document.querySelector(".readme-overlay");
        if (overlay) {
            return {
                overlay: overlay,
                title: overlay.querySelector(".readme-modal-title"),
                body: overlay.querySelector(".readme-modal-body"),
                repoLink: overlay.querySelector(".readme-modal-link")
            };
        }

        overlay = document.createElement("div");
        overlay.className = "readme-overlay";
        overlay.setAttribute("aria-hidden", "true");

        const modal = document.createElement("div");
        modal.className = "readme-modal";
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute("aria-label", "Project README");

        const closeButton = document.createElement("button");
        closeButton.className = "readme-modal-close";
        closeButton.type = "button";
        closeButton.setAttribute("aria-label", "Close README");
        closeButton.textContent = "X";

        const header = document.createElement("div");
        header.className = "readme-modal-header";

        const title = document.createElement("h3");
        title.className = "readme-modal-title";
        title.textContent = "README";

        const repoLink = document.createElement("a");
        repoLink.className = "readme-modal-link";
        repoLink.href = "#";
        repoLink.target = "_blank";
        repoLink.rel = "noopener noreferrer";
        repoLink.textContent = "View on GitHub";

        const body = document.createElement("div");
        body.className = "readme-modal-body markdown-body";

        header.appendChild(title);
        header.appendChild(repoLink);
        modal.appendChild(closeButton);
        modal.appendChild(header);
        modal.appendChild(body);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        function closeModal() {
            overlay.classList.remove("is-open");
            overlay.setAttribute("aria-hidden", "true");
            document.body.classList.remove("readme-open");
        }

        closeButton.addEventListener("click", closeModal);
        overlay.addEventListener("click", function (event) {
            if (event.target === overlay) {
                closeModal();
            }
        });
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && overlay.classList.contains("is-open")) {
                closeModal();
            }
        });

        return {
            overlay: overlay,
            title: title,
            body: body,
            repoLink: repoLink
        };
    }

    function openModalWithContent(projectTitle, githubUrl, htmlContent) {
        const modal = getModalElements();
        modal.title.textContent = projectTitle + " README";
        modal.repoLink.href = githubUrl;
        modal.body.innerHTML = htmlContent;
        modal.overlay.classList.add("is-open");
        modal.overlay.setAttribute("aria-hidden", "false");
        document.body.classList.add("readme-open");
    }

    function parseRepoFromUrl(url) {
        try {
            const parsed = new URL(url);
            if (parsed.hostname !== "github.com") {
                return null;
            }

            const parts = parsed.pathname.split("/").filter(Boolean);
            if (parts.length < 2) {
                return null;
            }

            return {
                owner: parts[0],
                repo: parts[1]
            };
        } catch (error) {
            return null;
        }
    }

    function isRelativeUrl(value) {
        return value && !/^(https?:|mailto:|tel:|#|\/)/i.test(value);
    }

    function fixRelativeLinks(container, repoData) {
        if (!repoData) {
            return;
        }

        container.querySelectorAll("a[href]").forEach(function (anchor) {
            const href = anchor.getAttribute("href") || "";
            if (isRelativeUrl(href)) {
                anchor.setAttribute("href", "https://github.com/" + repoData.owner + "/" + repoData.repo + "/blob/main/" + href);
            }
            anchor.setAttribute("target", "_blank");
            anchor.setAttribute("rel", "noopener noreferrer");
        });

        container.querySelectorAll("img[src]").forEach(function (image) {
            const src = image.getAttribute("src") || "";
            if (isRelativeUrl(src)) {
                image.setAttribute("src", "https://raw.githubusercontent.com/" + repoData.owner + "/" + repoData.repo + "/main/" + src);
            }
            image.setAttribute("loading", "lazy");
        });
    }

    async function renderMarkdownLocally(markdown, repoData) {
        if (!window.marked || typeof window.marked.parse !== "function") {
            throw new Error("Markdown engine is not available");
        }

        window.marked.setOptions({
            gfm: true,
            breaks: false,
            headerIds: false,
            mangle: false
        });

        const html = window.marked.parse(markdown);
        const temp = document.createElement("div");
        temp.innerHTML = html;

        fixRelativeLinks(temp, repoData);

        const mermaidBlocks = temp.querySelectorAll("pre code.language-mermaid");
        if (mermaidBlocks.length > 0 && window.mermaid) {
            if (!mermaidInitialized) {
                window.mermaid.initialize({
                    startOnLoad: false,
                    securityLevel: "loose",
                    theme: "dark"
                });
                mermaidInitialized = true;
            }

            mermaidBlocks.forEach(function (block, index) {
                const code = block.textContent || "";
                const parentPre = block.closest("pre");
                if (!parentPre) {
                    return;
                }

                const container = document.createElement("div");
                const diagramId = "mermaid-diagram-" + Date.now() + "-" + index;

                try {
                    const rendered = window.mermaid.render(diagramId, code);
                    if (rendered && typeof rendered.then === "function") {
                        rendered.then(function (result) {
                            container.innerHTML = result.svg;
                        }).catch(function () {
                            container.innerHTML = "<pre><code>" + code.replace(/</g, "&lt;") + "</code></pre>";
                        });
                    } else if (rendered && rendered.svg) {
                        container.innerHTML = rendered.svg;
                    }
                } catch (error) {
                    container.innerHTML = "<pre><code>" + code.replace(/</g, "&lt;") + "</code></pre>";
                }

                parentPre.replaceWith(container);
            });
        }

        return temp.innerHTML;
    }

    async function loadLocalReadme(path) {
        if (markdownCache[path]) {
            return markdownCache[path];
        }

        const response = await fetch(path);
        if (!response.ok) {
            throw new Error("Local README not found");
        }

        const markdown = await response.text();
        markdownCache[path] = markdown;
        return markdown;
    }

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

        if (!titleNode || !featuresNode || !githubLink) {
            return;
        }

        if (card.querySelector(".project-readmore-toggle-wrap")) {
            return;
        }

        const repoData = parseRepoFromUrl(githubLink.href);

        const localReadmePath = readmeFileByProject[titleNode.textContent.trim()];
        if (!localReadmePath) {
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

        button.addEventListener("click", async function () {
            button.disabled = true;
            const originalLabel = button.textContent;
            button.textContent = "Loading...";

            try {
                const markdown = await loadLocalReadme(localReadmePath);
                const html = await renderMarkdownLocally(markdown, repoData);
                openModalWithContent(titleNode.textContent.trim(), githubLink.href, html);
            } catch (error) {
                openModalWithContent(
                    titleNode.textContent.trim(),
                    githubLink.href,
                    "<p>Could not load the local README content for this project.</p>"
                );
            } finally {
                button.disabled = false;
                button.textContent = originalLabel;
            }
        });

        toggleWrap.appendChild(button);
        card.insertBefore(toggleWrap, featuresNode);
    }

    const cards = document.querySelectorAll(".project-card");
    initProjectTechTicker();
    cards.forEach(createReadMoreForCard);
})();
