// lottie-init.js
// Lottie-web initialization for all social/contact icons, CLS-free, after DOMContentLoaded
import { LOTTIE_LINKEDIN, LOTTIE_LINK } from './lottie-icons.js';

function loadLottieIcon(containerId, animationData, link, title, size = 60) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const a = document.createElement('a');
  a.href = link;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.title = title;
  a.style.display = 'inline-block';
  const lottieDiv = document.createElement('div');
  lottieDiv.style.width = `${size}px`;
  lottieDiv.style.height = `${size}px`;
  lottieDiv.className = 'social-media';
  a.appendChild(lottieDiv);
  container.appendChild(a);
  lottie.loadAnimation({
    container: lottieDiv,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: { preserveAspectRatio: 'xMidYMid meet' }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  loadLottieIcon('linkedin-icon', LOTTIE_LINKEDIN, 'https://www.linkedin.com/in/pklavc/', 'LinkedIn Profile');
  loadLottieIcon('link-icon', LOTTIE_LINK, 'https://pklavc.com/', 'Personal Website');
  // Fallback for GitHub and Email: static SVG or placeholder
});
