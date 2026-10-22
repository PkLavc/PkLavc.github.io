(() => {
  const SPEED = 0.7;
  const END_HOLD_MS = 2200;
  const YOUTUBE_START_HOLD_MS = 2200;
  const supportedAssets = new Set([
    'blog', 'bluesky', 'dev', 'discord', 'email', 'github', 'hands',
    'instagram', 'link', 'linkedin', 'mastodon', 'model', 'pinterest',
    'sponsor', 'stack', 'store', 'telegram', 'threads', 'tiktok', 'youtube'
  ]);
  // On iOS all browsers use WebKit. Complex Lottie track mattes can display
  // only an outline there. Use lightweight, accessible SVGs with CSS motion for
  // the five affected logos; retain the original Lotties everywhere else.
  // No masks, clipping, external assets, or canvas rendering are involved.
  const iosWebKit = /iPhone|iPad|iPod/.test(navigator.userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const iosFallbackPaths = {
    youtube: '<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="currentColor"/>',
    github: '<path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.28-5.27-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18A10.99 10.99 0 0 1 12 6.12c.98 0 1.96.13 2.88.39 2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.07.79 2.16v3.24c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" fill="currentColor"/>',
    telegram: '<path d="m21.5 3-7.6 18-3.4-7.5L3 10.1 21.5 3Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="m10.5 13.5 11-10.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" fill="none"/>',
    pinterest: '<path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" fill="currentColor"/>',
    sponsor: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"/><path class="lottie-ios-ecg" d="M5.7 12h3l1.5-2.8 2.5 5.6 1.35-2.8h4.3" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>'
  };

  function installIosFallbackStyles() {
    if (document.getElementById('pklavc-ios-lottie-fallback-style')) return;
    const style = document.createElement('style');
    style.id = 'pklavc-ios-lottie-fallback-style';
    style.textContent = `
      .lottie-ios-fallback{display:inline-flex!important;align-items:center;justify-content:center;vertical-align:middle;pointer-events:none;color:#00d1ff}
      .lottie-ios-fallback svg{display:block;width:78%;height:78%;overflow:visible;fill:none;stroke:none;transform-origin:50% 50%;animation:lottie-ios-gentle 3.6s ease-in-out infinite}
      .lottie-ios-fallback--youtube svg{animation:lottie-ios-gentle 3.5s ease-in-out infinite}
      .lottie-ios-fallback--telegram svg{animation:lottie-ios-paper-plane 3.3s ease-in-out infinite}
      .lottie-ios-fallback--sponsor svg{animation:lottie-ios-heart 2s ease-in-out infinite}
      .lottie-ios-fallback .lottie-ios-ecg{stroke-dasharray:30;stroke-dashoffset:30;animation:lottie-ios-ecg 2s ease-in-out infinite}
      @keyframes lottie-ios-gentle{0%,65%,100%{transform:scale(1)}30%{transform:scale(1.08)}}
      @keyframes lottie-ios-paper-plane{0%,65%,100%{transform:translate(0,0)}30%{transform:translate(1px,-1px)}}
      @keyframes lottie-ios-heart{0%,55%,100%{transform:scale(1)}20%,38%{transform:scale(1.09)}}
      @keyframes lottie-ios-ecg{0%,15%{stroke-dashoffset:30;opacity:.2}45%,78%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:-30;opacity:.2}}
      @media(prefers-reduced-motion:reduce){.lottie-ios-fallback svg,.lottie-ios-fallback .lottie-ios-ecg{animation:none!important;stroke-dashoffset:0}}
    `;
    document.head.appendChild(style);
  }

  function replaceIosMaskedLottie(player, name) {
    if (!iosWebKit || !Object.prototype.hasOwnProperty.call(iosFallbackPaths, name)) return false;
    installIosFallbackStyles();
    const replacement = document.createElement('span');
    replacement.className = [player.className, 'lottie-ios-fallback', 'lottie-ios-fallback--' + name].filter(Boolean).join(' ');
    replacement.setAttribute('aria-hidden', 'true');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = iosFallbackPaths[name];
    replacement.appendChild(svg);
    player.replaceWith(replacement);
    return true;
  }

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
    if (replaceIosMaskedLottie(player, name)) return;
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
