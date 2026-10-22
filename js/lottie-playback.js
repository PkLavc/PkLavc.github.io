(() => {
  const SPEED = 0.7;
  const END_HOLD_MS = 2200;
  const YOUTUBE_START_HOLD_MS = 2200;
  const supportedAssets = new Set([
    'blog', 'bluesky', 'dev', 'discord', 'email', 'github', 'hands',
    'instagram', 'link', 'linkedin', 'mastodon', 'model', 'pinterest',
    'sponsor', 'stack', 'store', 'telegram', 'threads', 'tiktok', 'youtube'
  ]);
  // These animated logo files use nested track mattes/masks. WebKit on iOS
  // can paint the outer circle while losing the masked logo glyph in SVG.
  // Canvas uses a separate compositor, and only changes the renderer on iOS.
  const iosWebKit = /iPad|iPhone|iPod/.test(navigator.userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const timers = new WeakMap();
  const states = new WeakMap();
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const state = states.get(entry.target);
          if (!state) continue;
          state.visible = entry.isIntersecting;
          if (!state.ready) continue;
          if (state.visible) {
            startVisible(entry.target, state);
          } else {
            clearPlayerTimer(entry.target);
            entry.target.pause?.();
          }
        }
      }, { rootMargin: '90px 0px', threshold: 0 })
    : null;

  function assetName(player) {
    const source = player.getAttribute('src') || '';
    const match = source.match(/\/([^/?]+)\.json(?:[?#]|$)/i);
    return match ? match[1].toLowerCase() : '';
  }

  function clearPlayerTimer(player) {
    const timer = timers.get(player);
    if (timer !== undefined) window.clearTimeout(timer);
    timers.delete(player);
  }

  function applyPlaybackSettings(player) {
    player.removeAttribute('loop');
    player.loop = false;
    player.autoplay = false;
    player.setAttribute('speed', String(SPEED));
    player.setLooping?.(false);
    player.setSpeed?.(SPEED);
  }

  function enableCanvasFrameClearing(animation) {
    // Lottie Player 2.x passes clearCanvas:false even for its canvas renderer.
    // Keep it enabled so old frames never accumulate over the logo.
    if (animation?.renderer?.rendererType === 'canvas' && animation.renderer.renderConfig) {
      animation.renderer.renderConfig.clearCanvas = true;
    }
  }

  function prepareIOSRenderer(player) {
    if (!iosWebKit || player.dataset.iosCanvas === 'ready') return;
    player.dataset.iosCanvas = 'ready';
    player.setAttribute('renderer', 'canvas');
    player.renderer = 'canvas';

    // Pages that load the Lottie custom element before this script may have
    // instantiated an SVG renderer already. Re-load just once in that case.
    if (typeof player.getLottie !== 'function') return;
    Promise.resolve(player.getLottie()).then((animation) => {
      if (!player.isConnected) return;
      enableCanvasFrameClearing(animation);
      if (player.dataset.iosCanvasReloaded) return;
      if (animation?.renderer?.rendererType === 'svg' && typeof player.load === 'function') {
        player.dataset.iosCanvasReloaded = 'true';
        player.load(player.getAttribute('src'));
      }
    }).catch(() => { /* A later ready event can still initialize the player. */ });
  }

  function pauseAtStart(player, state) {
    clearPlayerTimer(player);
    player.pause?.();
    player.seek?.(0);
    if (reduceMotion.matches || !state.visible) return;
    const delay = state.name === 'youtube' && !iosWebKit ? YOUTUBE_START_HOLD_MS : 0;
    if (!delay) {
      player.play?.();
      return;
    }
    timers.set(player, window.setTimeout(() => {
      timers.delete(player);
      if (state.visible && !reduceMotion.matches) player.play?.();
    }, delay));
  }

  function startVisible(player, state) {
    if (!state.ready || !state.visible) return;
    // Preserve the final-frame hold, even if IntersectionObserver fires again.
    if (state.completed && timers.has(player)) return;
    if (reduceMotion.matches) {
      clearPlayerTimer(player);
      player.pause?.();
      // Frame zero of many social assets only contains an empty outline.
      player.seek?.('70%');
      return;
    }
    if (!state.started || state.completed) {
      state.started = true;
      state.completed = false;
      pauseAtStart(player, state);
    } else if (!timers.has(player)) {
      player.play?.();
    }
  }

  function configurePlayer(player) {
    const name = assetName(player);
    if (!supportedAssets.has(name) || states.has(player)) return;
    const state = { name, ready: false, started: false, completed: false, visible: !observer };
    states.set(player, state);
    prepareIOSRenderer(player);
    applyPlaybackSettings(player);

    player.addEventListener('complete', () => {
      if (!state.visible || reduceMotion.matches) return;
      state.completed = true;
      clearPlayerTimer(player);
      player.pause?.();
      timers.set(player, window.setTimeout(() => {
        timers.delete(player);
        if (state.visible && !reduceMotion.matches) startVisible(player, state);
      }, END_HOLD_MS));
    });

    const onReady = () => {
      state.ready = true;
      state.started = false;
      state.completed = false;
      clearPlayerTimer(player);
      applyPlaybackSettings(player);
      if (iosWebKit) {
        enableCanvasFrameClearing(player._lottie);
        if (typeof player.getLottie === 'function') {
          Promise.resolve(player.getLottie()).then(enableCanvasFrameClearing).catch(() => {});
        }
      }
      if (state.visible) startVisible(player, state);
      else player.pause?.();
    };
    // Not "once": Lottie may reinitialize when switching SVG -> canvas.
    player.addEventListener('ready', onReady);
    observer?.observe(player);

    if (typeof player.getLottie === 'function') {
      Promise.resolve(player.getLottie()).then((animation) => {
        if (animation && !state.ready && player.isConnected) onReady();
      }).catch(() => {});
    }
  }

  function configureAll(root = document) {
    if (root.matches?.('lottie-player')) configurePlayer(root);
    root.querySelectorAll?.('lottie-player').forEach(configurePlayer);
  }

  function initialize() {
    configureAll();
    new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) configureAll(node);
        }
      }
    }).observe(document.documentElement, { childList: true, subtree: true });

    // Safari may suspend requestAnimationFrame after a tab is backgrounded.
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) configureAll();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
