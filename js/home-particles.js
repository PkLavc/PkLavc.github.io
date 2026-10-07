(function () {
  "use strict";

  var containerId = "home-particles";
  var started = false;

  function shouldSkip() {
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    var constrainedConnection = connection && (connection.saveData || /(^|-)2g/.test(connection.effectiveType || ""));
    return reducedMotion || constrainedConnection;
  }

  function configuration() {
    var compact = window.matchMedia && window.matchMedia("(max-width: 700px)").matches;
    return {
      particles: {
        number: {
          value: compact ? 18 : 34,
          density: { enable: true, value_area: compact ? 480 : 920 }
        },
        color: { value: ["#00d1ff", "#ff2aaa", "#e8fbff"] },
        shape: { type: "circle" },
        opacity: { value: 0.42, random: true, anim: { enable: false } },
        size: { value: 2.2, random: true, anim: { enable: false } },
        line_linked: {
          enable: true,
          distance: compact ? 118 : 158,
          color: "#00d1ff",
          opacity: compact ? 0.2 : 0.27,
          width: 1
        },
        move: {
          enable: true,
          speed: compact ? 0.55 : 0.8,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false
        }
      },
      interactivity: {
        detect_on: "window",
        events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: false }, resize: true },
        modes: { grab: { distance: compact ? 120 : 180, line_linked: { opacity: compact ? 0.28 : 0.42 } } }
      },
      retina_detect: true
    };
  }

  function createParticles() {
    var container = document.getElementById(containerId);
    if (!container || started || shouldSkip() || typeof window.particlesJS !== "function") return;

    started = true;
    window.particlesJS(containerId, configuration());
    container.classList.add("is-ready");
  }

  function loadLibrary() {
    if (shouldSkip() || typeof window.particlesJS === "function") {
      createParticles();
      return;
    }

    var library = document.createElement("script");
    library.src = "/js/particles.min.js?v=faee7815a5";
    library.async = true;
    library.onload = createParticles;
    document.head.appendChild(library);
  }

  function startWhenIdle() {
    if (started || shouldSkip()) return;
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(loadLibrary, { timeout: 1800 });
    } else {
      window.setTimeout(loadLibrary, 250);
    }
  }

  function deferUntilHeroIsReadable() {
    if (document.body && document.body.dataset.heroContentReady === "true") {
      startWhenIdle();
      return;
    }
    window.addEventListener("pklavc:hero-content-ready", startWhenIdle, { once: true });
    window.setTimeout(startWhenIdle, 7000);
  }

  if (document.body) {
    deferUntilHeroIsReadable();
  } else {
    document.addEventListener("DOMContentLoaded", deferUntilHeroIsReadable, { once: true });
  }
}());
