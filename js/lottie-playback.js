(() => {
  const SPEED = 0.7;
  const END_HOLD_MS = 2200;
  const YOUTUBE_START_HOLD_MS = 2200;
  const supportedAssets = new Set([
    'blog', 'bluesky', 'dev', 'discord', 'email', 'github', 'hands',
    'instagram', 'link', 'linkedin', 'mastodon', 'model', 'pinterest',
    'sponsor', 'stack', 'store', 'telegram', 'threads', 'tiktok', 'youtube'
  ]);
  const timers = new WeakMap();
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function assetName(player) {
    const source = player.getAttribute('src') || '';
    const match = source.match(/\/([^/?]+)\.json(?:[?#]|$)/i);
    return match ? match[1].toLowerCase() : '';
  }

  function clearPlayerTimer(player) {
    const timer = timers.get(player);
    if (timer) window.clearTimeout(timer);
    timers.delete(player);
  }

  function applyPlaybackSettings(player) {
    player.removeAttribute('loop');
    player.setAttribute('speed', String(SPEED));
    player.loop = false;
    if (typeof player.setLooping === 'function') player.setLooping(false);
    if (typeof player.setSpeed === 'function') player.setSpeed(SPEED);
  }

  function pauseAtStart(player, delay) {
    clearPlayerTimer(player);
    if (typeof player.pause === 'function') player.pause();
    if (typeof player.seek === 'function') player.seek(0);

    if (reduceMotion.matches) return;
    const timer = window.setTimeout(() => {
      timers.delete(player);
      applyPlaybackSettings(player);
      if (typeof player.play === 'function') player.play();
    }, delay);
    timers.set(player, timer);
  }

  function restartAfterHold(player, name) {
    clearPlayerTimer(player);
    if (typeof player.pause === 'function') player.pause();

    const timer = window.setTimeout(() => {
      timers.delete(player);
      if (name === 'youtube') {
        pauseAtStart(player, YOUTUBE_START_HOLD_MS);
        return;
      }
      if (reduceMotion.matches) {
        if (typeof player.seek === 'function') player.seek(0);
        return;
      }
      applyPlaybackSettings(player);
      if (typeof player.seek === 'function') player.seek(0);
      if (typeof player.play === 'function') player.play();
    }, END_HOLD_MS);
    timers.set(player, timer);
  }

  function configurePlayer(player) {
    const name = assetName(player);
    if (!supportedAssets.has(name) || player.dataset.lottiePlayback === 'slow-hold') return;

    player.dataset.lottiePlayback = 'slow-hold';
    applyPlaybackSettings(player);
    player.addEventListener('complete', () => restartAfterHold(player, name));

    const onReady = () => {
      applyPlaybackSettings(player);
      if (name === 'youtube') pauseAtStart(player, YOUTUBE_START_HOLD_MS);
      else if (reduceMotion.matches && typeof player.pause === 'function') player.pause();
    };

    player.addEventListener('ready', onReady, { once: true });
    if (typeof player.getLottie === 'function' && player.getLottie()) onReady();
  }

  function configureAll(root = document) {
    if (root.matches?.('lottie-player')) configurePlayer(root);
    root.querySelectorAll?.('lottie-player').forEach(configurePlayer);
  }

  function initialize() {
    configureAll();
    new MutationObserver((mutations) => {
      mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) configureAll(node);
      }));
    }).observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
