(() => {
  const button = document.querySelector('[data-share]');
  if (button) {
    const title = document.title;
    const original = button.getAttribute('aria-label') || 'Share';
    const copied = button.dataset.copied || 'Copied!';
    button.addEventListener('click', async () => {
      const url = location.href;
      if (navigator.share) {
        try { await navigator.share({ title, url }); return; }
        catch (error) { if (error?.name === 'AbortError') return; }
      }
      try {
        await navigator.clipboard.writeText(url);
        button.setAttribute('aria-label', copied);
        button.title = copied;
        window.setTimeout(() => { button.setAttribute('aria-label', original); button.title = original; }, 1800);
      } catch (error) {
        window.prompt(original, url);
      }
    });
  }

  const LOTTIE_PLAYER_SRC = 'https://cdn.jsdelivr.net/npm/@lottiefiles/lottie-player@2.0.12/dist/lottie-player.js';
  const LOTTIE_DIRECTORY = '/images/lottie/';
  const useMobileCanvas = /iPad|iPhone|iPod/.test(navigator.userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const canvasAssets = new Set(['youtube', 'github', 'telegram', 'pinterest', 'sponsor']);

  function iconNameFor(anchor) {
    const rawHref = anchor.getAttribute('href');
    if (!rawHref) return null;

    if (rawHref.toLowerCase().startsWith('mailto:')) return 'email';

    let url;
    try { url = new URL(rawHref, window.location.href); }
    catch (error) { return null; }

    const host = url.hostname.replace(/^www\./, '').toLowerCase();
    const path = url.pathname.toLowerCase();

    if (host === window.location.hostname && path.includes('/blog/')) return 'blog';
    if (host === window.location.hostname && path.includes('/store/')) return 'store';
    if (host === 'discord.gg' || host.endsWith('.discord.com')) return 'discord';
    if (host === 't.me' || host === 'telegram.me') return 'telegram';
    if (host === 'youtube.com' || host === 'youtu.be') return 'youtube';
    if (host === 'instagram.com') return 'instagram';
    if (host === 'tiktok.com') return 'tiktok';
    if (host === 'threads.com' || host === 'threads.net') return 'threads';
    if (host === 'bsky.app') return 'bluesky';
    if (host === 'mastodon.social') return 'mastodon';
    if (host === 'pinterest.com') return 'pinterest';
    if (host === 'linkedin.com') return 'linkedin';
    if (host === 'dev.to') return 'dev';
    if (host === 'github.com' && path.startsWith('/sponsors/')) return 'sponsor';
    if (host === 'github.com') return 'github';
    return null;
  }

  function createLottieIcon(name, compact) {
    const player = document.createElement('lottie-player');
    player.setAttribute('src', `${LOTTIE_DIRECTORY}${name}.json?v=20261022-social-refresh`);
    if (useMobileCanvas || canvasAssets.has(name)) player.setAttribute('renderer', 'canvas');
    player.setAttribute('background', 'transparent');
    player.setAttribute('speed', '0.7');
    player.setAttribute('autoplay', '');
    player.setAttribute('aria-hidden', 'true');
    player.className = compact ? 'connect-lottie connect-lottie-mini' : 'connect-lottie';
    return player;
  }

  function applyLottieIcons() {
    document.querySelectorAll('.mini-social a, .link-card').forEach((anchor) => {
      const name = iconNameFor(anchor);
      if (!name) return;

      const icon = anchor.matches('.mini-social a') ? anchor : anchor.querySelector('.icon');
      if (!icon || icon.querySelector('lottie-player')) return;
      icon.replaceChildren(createLottieIcon(name, anchor.matches('.mini-social a')));
    });
  }

  function loadLottiePlayer() {
    if (customElements.get('lottie-player')) {
      applyLottieIcons();
      return;
    }

    const existing = document.querySelector(`script[src="${LOTTIE_PLAYER_SRC}"]`);
    const script = existing || document.createElement('script');
    if (!existing) {
      script.src = LOTTIE_PLAYER_SRC;
      script.defer = true;
      document.head.appendChild(script);
    }

    script.addEventListener('load', () => {
      customElements.whenDefined('lottie-player').then(applyLottieIcons);
    }, { once: true });
  }

  loadLottiePlayer();
})();
