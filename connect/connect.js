(() => {
  const button = document.querySelector('[data-share]');
  if (!button) return;
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
})();