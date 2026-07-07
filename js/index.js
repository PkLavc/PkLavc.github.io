var viewportHeightFrame = 0;
var lastViewportHeight = 0;

function getCurrentViewportHeight() {
  if (window.visualViewport && window.visualViewport.height) {
    return Math.ceil(window.visualViewport.height);
  }

  return Math.ceil(window.innerHeight || document.documentElement.clientHeight || 0);
}

function syncParticlesCanvasSize() {
  var particleInstance = window.pJSDom && window.pJSDom[0];

  if (
    !particleInstance ||
    !particleInstance.pJS ||
    !particleInstance.pJS.fn ||
    typeof particleInstance.pJS.fn.canvasSize !== 'function'
  ) {
    return;
  }

  particleInstance.pJS.fn.canvasSize();

  if (
    particleInstance.pJS.fn.vendors &&
    typeof particleInstance.pJS.fn.vendors.densityAutoParticles === 'function'
  ) {
    particleInstance.pJS.fn.vendors.densityAutoParticles();
  }
}

function setDynamicViewportHeight() {
  var viewportHeight = getCurrentViewportHeight();

  if (!viewportHeight || viewportHeight === lastViewportHeight) {
    return false;
  }

  lastViewportHeight = viewportHeight;
  document.documentElement.style.setProperty('--app-viewport-height', viewportHeight + 'px');
  return true;
}

function scheduleDynamicViewportHeightSync() {
  if (viewportHeightFrame) {
    return;
  }

  viewportHeightFrame = window.requestAnimationFrame(function() {
    viewportHeightFrame = 0;

    if (setDynamicViewportHeight()) {
      syncParticlesCanvasSize();
    }
  });
}

function initDynamicViewportHeight() {
  setDynamicViewportHeight();
  window.addEventListener('resize', scheduleDynamicViewportHeightSync, { passive: true });
  window.addEventListener('orientationchange', scheduleDynamicViewportHeightSync, { passive: true });

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', scheduleDynamicViewportHeightSync, { passive: true });
    window.visualViewport.addEventListener('scroll', scheduleDynamicViewportHeightSync, { passive: true });
  }
}

initDynamicViewportHeight();

function trackAggregatedGeoVisit() {
  var hostname = window.location.hostname.toLowerCase();
  var isProductionSite = hostname === 'pklavc.com' || hostname === 'www.pklavc.com';
  var sessionKey = 'pklavc.geoVisitTracked';

  if (!isProductionSite || navigator.globalPrivacyControl === true || typeof window.fetch !== 'function') {
    return Promise.resolve({ tracked: false });
  }

  try {
    if (!window.sessionStorage) {
      return Promise.resolve({ tracked: false, reason: 'session_storage_unavailable' });
    }

    if (window.sessionStorage.getItem(sessionKey)) {
      return Promise.resolve({ tracked: false, reason: 'session_already_counted' });
    }
  } catch (error) {
    return Promise.resolve({ tracked: false, reason: 'session_storage_unavailable' });
  }

  return window.fetch('https://api.pklavc.com/analytics/visit', {
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
    keepalive: true
  }).then(function(response) {
    if (!response.ok) {
      throw new Error('geo_visit_request_failed');
    }

    try {
      window.sessionStorage.setItem(sessionKey, '1');
    } catch (error) {
      // The write already succeeded; the next page may retry if storage changed.
    }

    return { tracked: true };
  }).catch(function() {
    return { tracked: false, reason: 'request_failed' };
  });
}

window.PkLavcGeoVisitReady = trackAggregatedGeoVisit();

function isTouchOrMobile() {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0 ||
    window.innerWidth < 768
  );
}

function isGsapAvailable() {
  return typeof window.gsap !== 'undefined' && typeof window.gsap.to === 'function';
}

function setElementDisplay(selector, displayValue) {
  if (isGsapAvailable()) {
    window.gsap.to(selector, 0, { display: displayValue });
    return;
  }

  $(selector).css('display', displayValue);
}

function animateElementY(selector, duration, yValue, onComplete) {
  if (isGsapAvailable()) {
    window.gsap.to(selector, duration, {
      y: yValue,
      onComplete: onComplete
    });
    return;
  }

  $(selector).css('transform', yValue === 0 ? 'translateY(0)' : 'translateY(' + yValue + ')');

  if (typeof onComplete === 'function') {
    onComplete();
  }
}

function getParticlesConfig() {
  var mobilePointer = isTouchOrMobile();
  var config = {
    particles: {
      number: {
        value: 72,
        density: {
          enable: true,
          value_area: 860
        }
      },
      color: {
        value: ['#00d1ff', '#ff2aaa', '#e8fbff']
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000'
        },
        polygon: {
          nb_sides: 5
        }
      },
      opacity: {
        value: 0.48,
        random: true,
        anim: {
          enable: false,
          speed: 0.8,
          opacity_min: 0.18,
          sync: false
        }
      },
      size: {
        value: 2.6,
        random: true,
        anim: {
          enable: false,
          speed: 10,
          size_min: 0.4,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#00d1ff',
        opacity: 0.34,
        width: 1
      },
      move: {
        enable: true,
        speed: 1.9,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'window',
      events: {
        onhover: {
          enable: !mobilePointer,
          mode: 'grab'
        },
        onclick: {
          enable: false,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 210,
          line_linked: {
            opacity: 0.9
          }
        },
        bubble: {
          distance: 240,
          size: 18,
          duration: 2,
          opacity: 0.65,
          speed: 2
        },
        repulse: {
          distance: 140,
          duration: 0.35
        },
        push: {
          particles_nb: 2
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  };

  if (mobilePointer) {
    config.particles.number.value = 58;
    config.particles.number.density.value_area = 420;
    config.particles.line_linked.distance = 128;
    config.particles.line_linked.opacity = 0.28;
    config.particles.move.speed = 1.05;
  }

  return config;
}

function initParticles() {
  var particlesContainer = document.getElementById('particles');

  if (typeof particlesJS === 'undefined' || !particlesContainer) {
    return;
  }

  particlesJS('particles', getParticlesConfig());
  scheduleDynamicViewportHeightSync();

  setTimeout(function() {
    if (window.pJSDom && window.pJSDom.length > 0) {
      window.pJSDom[0].pJS.fn.vendors.densityAutoParticles();
      window.pJSDom[0].pJS.fn.particlesRefresh();
    }
  }, 500);
}

function applyParticlesFallback() {
  var particlesContainer = document.getElementById('particles');
  var header = document.getElementById('header');

  if (!particlesContainer || !header) {
    return;
  }

  setTimeout(function() {
    var canvas = particlesContainer.querySelector('canvas');
    if (!canvas || canvas.style.display === 'none') {
      header.classList.add('particles-fallback');
    }
  }, 2000);
}

function stabilizeMarkdownBadges() {
  var badgeImages = document.querySelectorAll('.markdown-body img');

  badgeImages.forEach(function(image) {
    image.decoding = 'async';

    if (image.src.indexOf('img.shields.io') !== -1) {
      image.loading = 'lazy';
      image.setAttribute('fetchpriority', 'low');
    }

    function syncIntrinsicSize() {
      if (image.naturalWidth > 0 && image.naturalHeight > 0) {
        image.width = image.naturalWidth;
        image.height = image.naturalHeight;
      }
    }

    if (image.complete) {
      syncIntrinsicSize();
      return;
    }

    image.addEventListener('load', syncIntrinsicSize, { once: true });
  });
}

function setupAboutProjectCarouselDrag() {
  var carousels = document.querySelectorAll('.about-project-carousel');

  carousels.forEach(function(carousel) {
    if (carousel.dataset.dragReady === 'true') {
      return;
    }

    var track = carousel.querySelector('.about-project-carousel-track');
    var offset = 0;
    var dragState = null;
    var suppressClick = false;
    var resumeTimer = null;

    if (!track) {
      return;
    }

    carousel.dataset.dragReady = 'true';

    function isNativeScrollMode() {
      return typeof window.matchMedia === 'function' &&
        window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
    }

    function getLoopWidth() {
      var firstCard = track.querySelector('.about-project-carousel-card:not(.is-carousel-clone)');
      var firstClone = track.querySelector('.about-project-carousel-card.is-carousel-clone');

      if (firstCard && firstClone) {
        return firstClone.offsetLeft - firstCard.offsetLeft;
      }

      return track.scrollWidth / 2;
    }

    if (isNativeScrollMode()) {
      setupNativeScrollProjectCarousel(carousel, track, getLoopWidth);
      return;
    }

    function syncLoopWidth() {
      var loopWidth = getLoopWidth();

      if (loopWidth) {
        track.style.setProperty('--about-carousel-loop-distance', Math.round(loopWidth * 100) / 100 + 'px');
      }

      return loopWidth;
    }

    function normalizeOffset(value) {
      var loopWidth = syncLoopWidth();

      if (!loopWidth) {
        return value;
      }

      var normalized = value % loopWidth;

      if (normalized > 0) {
        normalized -= loopWidth;
      }

      return normalized;
    }

    function setOffset(value) {
      offset = normalizeOffset(value);
      track.style.setProperty('--about-carousel-drag-offset', Math.round(offset * 100) / 100 + 'px');
      track.style.setProperty('--about-carousel-drag-position', Math.round(offset * 100) / 100 + 'px');
    }

    function clearResumeTimer() {
      if (resumeTimer) {
        window.clearTimeout(resumeTimer);
        resumeTimer = null;
      }
    }

    function pauseCarouselAt(value) {
      clearResumeTimer();
      setOffset(value);
      carousel.classList.add('is-user-paused');
    }

    function scheduleCarouselResume() {
      clearResumeTimer();
      resumeTimer = window.setTimeout(function() {
        carousel.classList.remove('is-user-paused');
        resumeTimer = null;
      }, 2600);
    }

    function getCurrentTranslateX() {
      var transform = window.getComputedStyle(track).transform;
      var match;

      if (!transform || transform === 'none') {
        return offset;
      }

      if (typeof window.DOMMatrixReadOnly === 'function') {
        return new window.DOMMatrixReadOnly(transform).m41;
      }

      match = transform.match(/^matrix\((.+)\)$/);

      if (match) {
        return parseFloat(match[1].split(',')[4]) || offset;
      }

      match = transform.match(/^matrix3d\((.+)\)$/);

      if (match) {
        return parseFloat(match[1].split(',')[12]) || offset;
      }

      return offset;
    }

    function beginDrag(clientX, clientY, pointerId, isTouchFallback) {
      clearResumeTimer();
      dragState = {
        pointerId: pointerId,
        startX: clientX,
        startY: clientY,
        startOffset: getCurrentTranslateX(),
        moved: false,
        captured: false,
        isTouchFallback: Boolean(isTouchFallback)
      };
    }

    function moveDrag(clientX, clientY, event) {
      var deltaX;
      var deltaY;

      if (!dragState) {
        return;
      }

      deltaX = clientX - dragState.startX;
      deltaY = clientY - dragState.startY;

      if (!dragState.moved) {
        if (Math.abs(deltaX) <= 6) {
          return;
        }

        if (dragState.isTouchFallback && Math.abs(deltaY) > Math.abs(deltaX)) {
          return;
        }

        dragState.moved = true;
        dragState.startOffset = getCurrentTranslateX() - deltaX;
        pauseCarouselAt(dragState.startOffset + deltaX);
        carousel.classList.add('is-dragging');

        if (!dragState.isTouchFallback && typeof carousel.setPointerCapture === 'function') {
          try {
            carousel.setPointerCapture(dragState.pointerId);
            dragState.captured = true;
          } catch (error) {
            dragState.captured = false;
          }
        }
      }

      setOffset(dragState.startOffset + deltaX);

      if (event && typeof event.preventDefault === 'function') {
        event.preventDefault();
      }
    }

    carousel.addEventListener('click', function(event) {
      if (!suppressClick) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
    }, true);

    carousel.addEventListener('pointerdown', function(event) {
      if (event.pointerType === 'mouse' && event.button !== 0) {
        return;
      }

      beginDrag(event.clientX, event.clientY, event.pointerId, false);
    });

    carousel.addEventListener('pointermove', function(event) {
      if (!dragState || dragState.pointerId !== event.pointerId) {
        return;
      }

      moveDrag(event.clientX, event.clientY, event);
    });

    function endDrag() {
      var moved;
      var captured;
      var pointerId;

      if (!dragState) {
        return;
      }

      moved = dragState.moved;
      captured = dragState.captured;
      pointerId = dragState.pointerId;
      dragState = null;
      carousel.classList.remove('is-dragging');
      setOffset(normalizeOffset(offset));

      if (captured && typeof carousel.releasePointerCapture === 'function') {
        try {
          carousel.releasePointerCapture(pointerId);
        } catch (error) {
          // Pointer capture may already have been released by the browser.
        }
      }

      if (moved) {
        suppressClick = true;
        scheduleCarouselResume();
        window.setTimeout(function() {
          suppressClick = false;
        }, 420);
      } else if (carousel.classList.contains('is-user-paused')) {
        scheduleCarouselResume();
      }
    }

    carousel.addEventListener('pointerup', endDrag);
    carousel.addEventListener('pointercancel', endDrag);
    carousel.addEventListener('lostpointercapture', endDrag);
    window.addEventListener('pointerup', function(event) {
      if (dragState && dragState.pointerId === event.pointerId) {
        endDrag();
      }
    }, true);
    window.addEventListener('pointercancel', function(event) {
      if (dragState && dragState.pointerId === event.pointerId) {
        endDrag();
      }
    }, true);

    carousel.addEventListener('touchstart', function(event) {
      var touch;

      if (dragState || event.touches.length !== 1) {
        return;
      }

      touch = event.touches[0];
      beginDrag(touch.clientX, touch.clientY, 'touch', true);
    }, { passive: true });

    carousel.addEventListener('touchmove', function(event) {
      var touch;

      if (!dragState || !dragState.isTouchFallback || event.touches.length !== 1) {
        return;
      }

      touch = event.touches[0];
      moveDrag(touch.clientX, touch.clientY, event);
    }, { passive: false });

    carousel.addEventListener('touchend', function() {
      if (dragState && dragState.isTouchFallback) {
        endDrag();
      }
    }, { passive: true });

    carousel.addEventListener('touchcancel', function() {
      if (dragState && dragState.isTouchFallback) {
        endDrag();
      }
    }, { passive: true });

    window.addEventListener('resize', function() {
      setOffset(normalizeOffset(offset));
    }, { passive: true });

    syncLoopWidth();
  });
}

function setupNativeScrollProjectCarousel(carousel, track, getLoopWidth) {
  var resumeTimer = null;
  var animationFrame = 0;
  var lastTimestamp = 0;
  var speed = 0.038;
  var isPaused = false;
  var isNormalizing = false;

  function clearResumeTimer() {
    if (resumeTimer) {
      window.clearTimeout(resumeTimer);
      resumeTimer = null;
    }
  }

  function normalizeScrollPosition() {
    var loopWidth;

    if (isNormalizing) {
      return;
    }

    loopWidth = getLoopWidth();
    if (!loopWidth) {
      return;
    }

    isNormalizing = true;
    if (track.scrollLeft >= loopWidth) {
      track.scrollLeft -= loopWidth;
    } else if (track.scrollLeft < 0) {
      track.scrollLeft += loopWidth;
    }
    isNormalizing = false;
  }

  function tick(timestamp) {
    var delta;

    if (!lastTimestamp) {
      lastTimestamp = timestamp;
    }

    delta = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    if (!isPaused && !document.hidden) {
      track.scrollLeft += delta * speed;
      normalizeScrollPosition();
    }

    animationFrame = window.requestAnimationFrame(tick);
  }

  function pause() {
    isPaused = true;
    carousel.classList.add('is-user-paused');
    clearResumeTimer();
  }

  function resumeSoon() {
    clearResumeTimer();
    resumeTimer = window.setTimeout(function() {
      isPaused = false;
      carousel.classList.remove('is-user-paused');
      lastTimestamp = 0;
      resumeTimer = null;
    }, 2400);
  }

  function start() {
    normalizeScrollPosition();
    if (!animationFrame) {
      animationFrame = window.requestAnimationFrame(tick);
    }
  }

  track.addEventListener('scroll', normalizeScrollPosition, { passive: true });
  track.addEventListener('touchstart', pause, { passive: true });
  track.addEventListener('touchmove', normalizeScrollPosition, { passive: true });
  track.addEventListener('touchend', resumeSoon, { passive: true });
  track.addEventListener('touchcancel', resumeSoon, { passive: true });
  track.addEventListener('pointerdown', pause, { passive: true });
  track.addEventListener('pointerup', resumeSoon, { passive: true });
  track.addEventListener('pointercancel', resumeSoon, { passive: true });
  track.addEventListener('focusin', pause);
  track.addEventListener('focusout', resumeSoon);
  window.addEventListener('resize', normalizeScrollPosition, { passive: true });

  start();
}

$(window).on('load', function() {
  document.body.classList.add('ready');
  if ($('#all').length) {
    setElementDisplay('#all', 'block');
  }
  if ($('#header').length) {
    setElementDisplay('#header', 'block');
  }
  if ($('#navigation-content').length) {
    $('#navigation-content').removeClass('is-open');
    setElementDisplay('#navigation-content', 'none');
  }

  initParticles();
  applyParticlesFallback();
  stabilizeMarkdownBadges();
  setupAboutProjectCarouselDrag();
});
$(function(){
  $(".color-panel").on("click",function(e) {
    e.preventDefault();
    $(".color-changer").toggleClass("color-changer-active");
  });

  $(".colors a").on("click",function(e) {
    e.preventDefault();
    var attr = $(this).attr("title");
    console.log(attr);
    $("head").append("<link rel=\"stylesheet\" href=\"css/"+attr+".css\">");
  });

  $(".email-link").on("click", function(e) {
    var user = $(this).data("email-user");
    var domain = $(this).data("email-domain");

    if (!user || !domain) {
      return;
    }

    e.preventDefault();
    window.location.href = "mailto:" + user + "@" + domain;
  });
});

var isMenuOpen = false;
var navigationScrollY = 0;

function lockNavigationScroll() {
  navigationScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
  document.body.classList.add('navigation-open');
  document.body.style.position = 'fixed';
  document.body.style.top = '-' + navigationScrollY + 'px';
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
}

function unlockNavigationScroll() {
  var top = document.body.style.top;
  document.body.classList.remove('navigation-open');
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';

  var restoredY = top ? Math.abs(parseInt(top, 10)) : navigationScrollY;
  if (restoredY) {
    window.scrollTo(0, restoredY);
  }
}

function ensureNavigationCloseButton() {
  var nav = document.getElementById('navigation-content');
  if (!nav || nav.querySelector('.navigation-close')) {
    return;
  }

  var closeButton = document.createElement('button');
  closeButton.className = 'navigation-close';
  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Close navigation menu');
  closeButton.innerHTML = '<span class="close-first"></span><span class="close-second"></span>';
  nav.insertBefore(closeButton, nav.firstChild);
}

function openNavigationMenu() {
  ensureNavigationCloseButton();
  if (window.PkLavcI18n && typeof window.PkLavcI18n.localizeNavigation === 'function') {
    window.PkLavcI18n.localizeNavigation();
  }
  if (window.PkLavcI18n && typeof window.PkLavcI18n.initLanguageMenu === 'function') {
    window.PkLavcI18n.initLanguageMenu();
  }
  resetNavigationLanguageMode();
  $('#navigation-content').addClass('is-open');
  setElementDisplay('#navigation-content', 'flex');
  animateElementY('#navigation-content', 0.24, 0);
  lockNavigationScroll();
  isMenuOpen = true;
}

function closeNavigationMenu() {
  resetNavigationLanguageMode();
  unlockNavigationScroll();
  animateElementY('#navigation-content', 0.24, '-100%', function() {
    $('#navigation-content').removeClass('is-open');
    setElementDisplay('#navigation-content', 'none');
  });
  isMenuOpen = false;
}

function resetNavigationLanguageMode() {
  if (window.PkLavcI18n && typeof window.PkLavcI18n.resetLanguageMenu === 'function') {
    window.PkLavcI18n.resetLanguageMenu();
    return;
  }

  var nav = document.getElementById('navigation-content');
  if (nav) {
    nav.classList.remove('is-language-mode');
  }
}

function ensureBlogNavigationLink() {
  var navLists = document.querySelectorAll('.navigation-links');

  navLists.forEach(function(navList) {
    if (navList.querySelector('#blog-link') || navList.querySelector('a[href="/blog/"]')) {
      return;
    }

    var projectsLink = navList.querySelector('#projects-link');
    var blogLink = document.createElement('a');
    var i18n = window.PkLavcI18n;
    var locale = i18n && typeof i18n.getCurrentLanguage === 'function' ? i18n.getCurrentLanguage() : 'en';

    blogLink.href = i18n && typeof i18n.getLocalizedRoute === 'function' ? i18n.getLocalizedRoute('/blog/', locale) : '/blog/';
    blogLink.id = 'blog-link';
    blogLink.setAttribute('data-text', 'BLOG');
    blogLink.textContent = 'BLOG';

    if (projectsLink && projectsLink.nextSibling) {
      navList.insertBefore(blogLink, projectsLink.nextSibling);
      return;
    }

    navList.appendChild(blogLink);
  });
}

function createNavigationLabelFragment(label) {
  var fragment = document.createDocumentFragment();

  Array.prototype.forEach.call(label, function(character) {
    var span = document.createElement('span');
    span.textContent = character;

    if (/[mia]/i.test(character)) {
      span.className = 'navigation-menu-letter-miami';
    }

    fragment.appendChild(span);
  });

  return fragment;
}

function getNavigationLinkLabel(link) {
  var storedLabel = link.getAttribute('data-nav-label');
  var visibleText = link.querySelector('.navigation-link-text');
  var dataText = link.getAttribute('data-text');

  return (storedLabel || (visibleText && visibleText.textContent) || link.textContent || dataText || '').trim();
}

function enhanceNavigationMenuLetters() {
  var links = document.querySelectorAll('.navigation-links a');

  links.forEach(function(link) {
    var label = getNavigationLinkLabel(link);

    if (!label) {
      return;
    }

    var visibleLabel = document.createElement('span');
    var hoverLabel = document.createElement('span');

    visibleLabel.className = 'navigation-link-text';
    visibleLabel.appendChild(createNavigationLabelFragment(label));

    hoverLabel.className = 'navigation-hover-text';
    hoverLabel.setAttribute('aria-hidden', 'true');
    hoverLabel.appendChild(createNavigationLabelFragment(label));

    link.textContent = '';
    link.setAttribute('data-text', label);
    link.setAttribute('data-nav-label', label);
    link.classList.add('is-navigation-enhanced');
    link.appendChild(visibleLabel);
    link.appendChild(hoverLabel);
  });
}

ensureBlogNavigationLink();
if (window.PkLavcI18n && typeof window.PkLavcI18n.localizeNavigation === 'function') {
  window.PkLavcI18n.localizeNavigation();
}
enhanceNavigationMenuLetters();
ensureNavigationCloseButton();
if (window.PkLavcI18n && typeof window.PkLavcI18n.initLanguageMenu === 'function') {
  window.PkLavcI18n.initLanguageMenu();
}

$(function(){
  $(".menubar").on("click",function(e){
    e.preventDefault();
    e.stopPropagation();

    if (!isMenuOpen) {
      openNavigationMenu();
    } else {
      closeNavigationMenu();
    }
  });

  $(document).on("click", function(e) {
    if (isMenuOpen && !$(e.target).closest("#navigation-content, .menubar").length) {
      closeNavigationMenu();
    }
  });

  $("#navigation-content a").on("click", function() {
    if (isMenuOpen) {
      closeNavigationMenu();
    }
  });

  $("#navigation-content").on("click", ".navigation-close", function(e) {
    e.preventDefault();
    e.stopPropagation();
    closeNavigationMenu();
  });

  $(document).on("keydown", function(e) {
    if (isMenuOpen && e.key === "Escape") {
      closeNavigationMenu();
    }
  });
});

$(function(){
    $("#about-link").on("click",function(){
      if (!isGsapAvailable()) {
        return;
      }

      if ($("#navigation-content").length) {
        gsap.to("#navigation-content",0,{display:"none"});
        gsap.to("#navigation-content",0,{y:'-100%'});
      }
      isMenuOpen = false;
      
      if ($("#header").length) gsap.to("#header",0,{display:"none"});
      if ($("#projects").length) gsap.to("#projects",0,{display:"none"});
      if ($("#portfolio").length) gsap.to("#portfolio",0,{display:"none"});
      if ($("#breaker").length) {
        gsap.to("#breaker",0,{display:"block"});
        gsap.to("#breaker-two",0,{display:"block"});
      }
      if ($("#contact").length) gsap.to("#contact",0,{display:"none"});
      if ($("#breaker").length) {
        gsap.to("#breaker",0,{display:"none"});
        gsap.to("#breaker-two",0,{display:"none"});
      }
      if ($("#about").length) gsap.to("#about",0,{display:"block"});
      if ($("#navigation-content").length) gsap.to("#navigation-content",0,{display:'flex'});
    })
    
    $("#contact-link").on("click",function(){
      if (!isGsapAvailable()) {
        return;
      }

      if ($("#navigation-content").length) {
        gsap.to("#navigation-content",0,{display:"none"});
        gsap.to("#navigation-content",0,{y:'-100%'});
      }
      isMenuOpen = false;
      
      if ($("#header").length) gsap.to("#header",0,{display:"none"});
      if ($("#about").length) gsap.to("#about",0,{display:"none"});
      if ($("#projects").length) gsap.to("#projects",0,{display:"none"});
      if ($("#portfolio").length) gsap.to("#portfolio",0,{display:"none"});
      if ($("#breaker").length) {
        gsap.to("#breaker",0,{display:"block"});
        gsap.to("#breaker-two",0,{display:"block"});
      }
      if ($("#breaker").length) {
        gsap.to("#breaker",0,{display:"none"});
        gsap.to("#breaker-two",0,{display:"none"});
      }
      if ($("#contact").length) gsap.to("#contact",0,{display:"block"});
      if ($("#navigation-content").length) gsap.to("#navigation-content",0,{display:'flex'});
    })
    
    $("#portfolio-link").on("click",function(){
      if (!isGsapAvailable()) {
        return;
      }

      if ($("#navigation-content").length) {
        gsap.to("#navigation-content",0,{display:"none"});
        gsap.to("#navigation-content",0,{y:'-100%'});
      }
      isMenuOpen = false;
      
      if ($("#header").length) gsap.to("#header",0,{display:"none"});
      if ($("#about").length) gsap.to("#about",0,{display:"none"});
      if ($("#contact").length) gsap.to("#contact",0,{display:"none"});
      if ($("#projects").length) gsap.to("#projects",0,{display:"none"});
      if ($("#breaker").length) {
        gsap.to("#breaker",0,{display:"block"});
        gsap.to("#breaker-two",0,{display:"block"});
      }
      if ($("#breaker").length) {
        gsap.to("#breaker",0,{display:"none"});
        gsap.to("#breaker-two",0,{display:"none"});
      }
      if ($("#portfolio").length) gsap.to("#portfolio",0,{display:"block"});
      if ($("#navigation-content").length) gsap.to("#navigation-content",0,{display:'flex'});
    })
    
    $("#projects-link").on("click",function(){
      if (!isGsapAvailable()) {
        return;
      }

      if ($("#navigation-content").length) {
        gsap.to("#navigation-content",0,{display:"none"});
        gsap.to("#navigation-content",0,{y:'-100%'});
      }
      isMenuOpen = false;
      
      if ($("#header").length) gsap.to("#header",0,{display:"none"});
      if ($("#about").length) gsap.to("#about",0,{display:"none"});
      if ($("#portfolio").length) gsap.to("#portfolio",0,{display:"none"});
      if ($("#contact").length) gsap.to("#contact",0,{display:"none"});
      if ($("#breaker").length) {
        gsap.to("#breaker",0,{display:"block"});
        gsap.to("#breaker-two",0,{display:"block"});
      }
      if ($("#breaker").length) {
        gsap.to("#breaker",0,{display:"none"});
        gsap.to("#breaker-two",0,{display:"none"});
      }
      if ($("#projects").length) gsap.to("#projects",0,{display:"block"});
      if ($("#navigation-content").length) gsap.to("#navigation-content",0,{display:'flex'});
    })
    
    $("#home-link").on("click",function(){
      if (!isGsapAvailable()) {
        return;
      }

      if ($("#navigation-content").length) {
        gsap.to("#navigation-content",0,{display:"none"});
        gsap.to("#navigation-content",0,{y:'-100%'});
      }
      isMenuOpen = false;
      
      if ($("#header").length) gsap.to("#header",0,{display:"none"});
      if ($("#about").length) gsap.to("#about",0,{display:"none"});
      if ($("#portfolio").length) gsap.to("#portfolio",0,{display:"none"});
      if ($("#contact").length) gsap.to("#contact",0,{display:"none"});
      if ($("#projects").length) gsap.to("#projects",0,{display:"none"});
      if ($("#breaker").length) {
        gsap.to("#breaker",0,{display:"block"});
        gsap.to("#breaker-two",0,{display:"block"});
      }
      if ($("#breaker").length) {
        gsap.to("#breaker",0,{display:"none"});
        gsap.to("#breaker-two",0,{display:"none"});
      }
      if ($("#header").length) gsap.to("#header",0,{display:"block"});
      if ($("#navigation-content").length) gsap.to("#navigation-content",0,{display:'flex'});
    })

})
$(function(){
  var mobilePointer = isTouchOrMobile();
  var $cursor = $('.cursor');
  var canAnimateCursor = false;

  function cursormover(e){
    if (mobilePointer) {
      return;
    }

    gsap.to($cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: mobilePointer ? 0.15 : 0.04,
      ease: mobilePointer ? 'power3.out' : 'power2.out',
      stagger: mobilePointer ? 0 : 0.002,
      overwrite: true
    });
  }

  function cursorhover(){
    gsap.to($cursor, {
      scale: 1.4,
      opacity: 1
    });
  }

  function cursor(){
    gsap.to($cursor, {
      scale: 1,
      opacity: 0.6
    });
  }

  if (canAnimateCursor) {
    $(window).on('mousemove', cursormover);
    $('.menubar').hover(cursorhover, cursor);
    $('a').hover(cursorhover, cursor);
    $('.navigation-close').hover(cursorhover, cursor);
    $('.navigation-language-toggle').hover(cursorhover, cursor);
  }
});

function toggleCredits() {
    var x = document.getElementById("credits-list");
    var trigger = document.getElementById("credits-trigger-btn");
    if (x.style.display === "block") {
        x.style.display = "none";
        if (trigger) {
            trigger.setAttribute("aria-expanded", "false");
        }
    } else {
        x.style.display = "block";
        if (trigger) {
            trigger.setAttribute("aria-expanded", "true");
        }
    }
}

function getSharedUiLanguage() {
  if (window.PkLavcI18n && typeof window.PkLavcI18n.getCurrentLanguage === 'function') {
    return window.PkLavcI18n.getCurrentLanguage();
  }

  var path = window.location.pathname || '/';
  if (/^\/pt(?:\/|$)/i.test(path)) return 'pt';
  if (/^\/es(?:\/|$)/i.test(path)) return 'es';
  return 'en';
}

function getCreditCopy() {
  var copy = {
    en: {
      particles: 'Particles by',
      icons: 'Animated icons by'
    },
    pt: {
      particles: 'Partículas por',
      icons: 'Ícones animados por'
    },
    es: {
      particles: 'Partículas por',
      icons: 'Iconos animados por'
    }
  };

  return copy[getSharedUiLanguage()] || copy.en;
}

function setupCreditDetails() {
  var creditButtons = document.querySelectorAll('[data-credit-detail]');
  var copy = getCreditCopy();

  creditButtons.forEach(function(button) {
    button.addEventListener('click', function(event) {
      event.preventDefault();

      var type = button.getAttribute('data-credit-detail');

      if (type === 'vfx') {
        button.outerHTML = '<span class="credits-detail-text">' + copy.particles + ' <a href="https://github.com/VincentGarreau/particles.js" target="_blank" rel="noopener noreferrer">Vincent Garreau</a></span>';
      } else if (type === 'icons') {
        button.outerHTML = '<span class="credits-detail-text">' + copy.icons + ' <a href="https://lordicon.com/" target="_blank" rel="noopener noreferrer">Lordicon</a></span>';
      }
    }, { once: true });
  });
}

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function setupIdentityShiftHeadings() {
  if (prefersReducedMotion()) {
    return;
  }

  var words = document.querySelectorAll('[data-identity-cycle]');

  words.forEach(function(word) {
    var values = (word.getAttribute('data-identity-cycle') || '')
      .split('|')
      .map(function(value) {
        return value.trim();
      })
      .filter(Boolean);

    if (values.length < 2) {
      return;
    }

    var index = 0;

    window.setInterval(function() {
      word.classList.add('is-heading-switching');

      window.setTimeout(function() {
        index = (index + 1) % values.length;
        word.textContent = values[index];
        word.classList.remove('is-heading-switching');
      }, 190);
    }, 1900);
  });
}

function buildBinaryHeadingCharacters(heading) {
  var segments = heading.querySelectorAll('[data-binary-segment]');

  segments.forEach(function(segment) {
    var fragment = document.createDocumentFragment();
    var text = segment.textContent || '';

    Array.prototype.forEach.call(text, function(character) {
      if (character.trim() === '') {
        fragment.appendChild(document.createTextNode(character));
        return;
      }

      var span = document.createElement('span');
      span.className = 'binary-heading-char';
      span.textContent = character;
      span.setAttribute('data-original-char', character);
      span.setAttribute('aria-hidden', 'true');
      fragment.appendChild(span);
    });

    segment.textContent = '';
    segment.appendChild(fragment);
  });
}

function setupBinaryShiftHeadings() {
  if (prefersReducedMotion()) {
    return;
  }

  var headings = document.querySelectorAll('[data-binary-heading]');
  var miamiBinaryBits = '0100110101101001011000010110110101101001';
  var binaryCharacterPositions = [11, 2, 14, 6, 0, 9, 4, 12, 1, 8, 15, 5, 10, 3, 13, 7];

  headings.forEach(function(heading) {
    buildBinaryHeadingCharacters(heading);

    var characters = heading.querySelectorAll('.binary-heading-char');

    if (!characters.length) {
      return;
    }

    var step = 0;

    function pulseNextCharacter() {
      var bit = miamiBinaryBits.charAt(step % miamiBinaryBits.length);
      var position = binaryCharacterPositions[step % binaryCharacterPositions.length];
      var character = characters[position % characters.length];
      var original = character.getAttribute('data-original-char') || character.textContent;

      character.classList.add('is-binary-switching');

      window.setTimeout(function() {
        character.textContent = bit;
        character.classList.remove('is-binary-switching');
        character.classList.add('is-binary-active');
      }, 140);

      window.setTimeout(function() {
        character.textContent = original;
        character.classList.remove('is-binary-active');
      }, 960);

      step += 1;
      window.setTimeout(pulseNextCharacter, 1450);
    }

    window.setTimeout(pulseNextCharacter, 700);
  });
}

function setupAnimatedPageTitles() {
  setupIdentityShiftHeadings();
  setupBinaryShiftHeadings();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupCreditDetails, { once: true });
  document.addEventListener('DOMContentLoaded', setupAnimatedPageTitles, { once: true });
} else {
  setupCreditDetails();
  setupAnimatedPageTitles();
}

function initSpaceReveals() {
  var revealSections = document.querySelectorAll('.space-reveal');

  if (!revealSections.length || !window.matchMedia) {
    return;
  }

  var desktopQuery = window.matchMedia('(min-width: 1025px) and (hover: hover) and (pointer: fine)');
  var reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function isRevealEnabled() {
    return desktopQuery.matches && !reducedMotionQuery.matches;
  }

  revealSections.forEach(function(section) {
    var frame = 0;
    var lastPointerEvent = null;

    function setRevealPosition(event) {
      var rect = section.getBoundingClientRect();
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;

      section.style.setProperty('--space-reveal-x', x + 'px');
      section.style.setProperty('--space-reveal-y', y + 'px');
    }

    function scheduleRevealPosition(event) {
      lastPointerEvent = event;

      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(function() {
        frame = 0;

        if (lastPointerEvent) {
          setRevealPosition(lastPointerEvent);
        }
      });
    }

    function handlePointerEnter(event) {
      if (!isRevealEnabled() || event.pointerType === 'touch') {
        return;
      }

      section.classList.add('is-revealing');
      scheduleRevealPosition(event);
    }

    function handlePointerMove(event) {
      if (!isRevealEnabled() || event.pointerType === 'touch') {
        return;
      }

      scheduleRevealPosition(event);
    }

    function handlePointerLeave() {
      section.classList.remove('is-revealing');
      lastPointerEvent = null;
    }

    function syncRevealState() {
      if (!isRevealEnabled()) {
        handlePointerLeave();
      }
    }

    section.addEventListener('pointerenter', handlePointerEnter);
    section.addEventListener('pointermove', handlePointerMove);
    section.addEventListener('pointerleave', handlePointerLeave);

    if (typeof desktopQuery.addEventListener === 'function') {
      desktopQuery.addEventListener('change', syncRevealState);
      reducedMotionQuery.addEventListener('change', syncRevealState);
    }
  });
}

function isSkylerAssistantPage() {
  var path = window.location.pathname || '/';
  return /^\/(?:(?:pt|es)\/)?skyler-assistant\/?$/i.test(path);
}

function loadLottiePlayerAssets(forceReload) {
  if (!document.querySelector('lottie-player')) {
    return;
  }

  if (window.customElements && window.customElements.get('lottie-player')) {
    return;
  }

  var existingScript = document.querySelector('script[data-lottie-player-loader], script[src*="@lottiefiles/lottie-player"]');
  if (existingScript && !forceReload) {
    return;
  }

  if (existingScript && existingScript.parentNode) {
    existingScript.parentNode.removeChild(existingScript);
  }

  var script = document.createElement('script');
  script.setAttribute('data-lottie-player-loader', 'true');
  script.src = 'https://cdn.jsdelivr.net/npm/@lottiefiles/lottie-player@1.5.7/dist/lottie-player.js';
  script.defer = true;
  document.head.appendChild(script);
}

function ensureLottiePlayerAssets() {
  loadLottiePlayerAssets(false);

  window.setTimeout(function() {
    if (document.querySelector('lottie-player') && (!window.customElements || !window.customElements.get('lottie-player'))) {
      loadLottiePlayerAssets(true);
    }
  }, 1800);
}

function loadSkylerWidgetAssets() {
  if (isSkylerAssistantPage()) {
    return;
  }

  if (!document.getElementById('skyler-widget-style')) {
    var link = document.createElement('link');
    link.id = 'skyler-widget-style';
    link.rel = 'stylesheet';
    link.href = '/css/skyler-widget.css?v=617c8e37ab';
    document.head.appendChild(link);
  }

  if (!document.getElementById('skyler-widget-script')) {
    var script = document.createElement('script');
    script.id = 'skyler-widget-script';
    script.src = '/js/skyler-widget.js?v=119543ea38';
    script.defer = true;
    document.body.appendChild(script);
  }
}

function syncIndexSocialFooterOffset() {
  if (!document.body || !document.body.classList.contains('page-index')) {
    return;
  }

  var footer = document.querySelector('.footer-minimal');
  var socialLinks = document.querySelector('.social-media-links');

  if (!footer || !socialLinks || typeof window.matchMedia !== 'function' || !window.matchMedia('(max-width: 550px)').matches) {
    document.documentElement.style.setProperty('--index-social-footer-offset', '0px');
    return;
  }

  var rect = footer.getBoundingClientRect();
  var viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
  var socialHeight = socialLinks.offsetHeight || 0;
  var footerGap = 18;
  var maxOffset = Math.max(0, viewportHeight - socialHeight - 12);
  var offset = Math.max(0, Math.min(Math.ceil(viewportHeight - rect.top + footerGap), maxOffset));

  document.documentElement.style.setProperty('--index-social-footer-offset', offset + 'px');
}

function initIndexFooterAwareSocialLinks() {
  syncIndexSocialFooterOffset();
  window.addEventListener('scroll', syncIndexSocialFooterOffset, { passive: true });
  window.addEventListener('resize', syncIndexSocialFooterOffset, { passive: true });
  window.addEventListener('orientationchange', syncIndexSocialFooterOffset, { passive: true });

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', syncIndexSocialFooterOffset, { passive: true });
    window.visualViewport.addEventListener('scroll', syncIndexSocialFooterOffset, { passive: true });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSpaceReveals, { once: true });
  document.addEventListener('DOMContentLoaded', ensureLottiePlayerAssets, { once: true });
  document.addEventListener('DOMContentLoaded', loadSkylerWidgetAssets, { once: true });
  document.addEventListener('DOMContentLoaded', initIndexFooterAwareSocialLinks, { once: true });
} else {
  initSpaceReveals();
  ensureLottiePlayerAssets();
  loadSkylerWidgetAssets();
  initIndexFooterAwareSocialLinks();
}
