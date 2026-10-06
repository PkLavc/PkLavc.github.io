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
  var reducedVisualBudget = (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) ||
    (navigator.connection && (navigator.connection.saveData || /2g/.test(navigator.connection.effectiveType || '')));
  var config = {
    particles: {
      number: {
        value: reducedVisualBudget ? 28 : 56,
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
    config.particles.number.value = reducedVisualBudget ? 22 : 40;
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
  var reduceMotionQuery = typeof window.matchMedia === 'function' ?
    window.matchMedia('(prefers-reduced-motion: reduce)') :
    null;

  function clearResumeTimer() {
    if (resumeTimer) {
      window.clearTimeout(resumeTimer);
      resumeTimer = null;
    }
  }

  function shouldAutoplay() {
    return !reduceMotionQuery || !reduceMotionQuery.matches;
  }

  function setAutoplaying(isAutoplaying) {
    carousel.classList.toggle('is-auto-scrolling', isAutoplaying && shouldAutoplay());
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

    if (!shouldAutoplay()) {
      setAutoplaying(false);
      lastTimestamp = timestamp;
      animationFrame = window.requestAnimationFrame(tick);
      return;
    }

    if (!lastTimestamp) {
      lastTimestamp = timestamp;
    }

    delta = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    if (!isPaused && !document.hidden) {
      setAutoplaying(true);
      track.scrollLeft += delta * speed;
      normalizeScrollPosition();
    } else {
      setAutoplaying(false);
    }

    animationFrame = window.requestAnimationFrame(tick);
  }

  function pause() {
    isPaused = true;
    carousel.classList.add('is-user-paused');
    setAutoplaying(false);
    clearResumeTimer();
  }

  function resumeSoon() {
    clearResumeTimer();
    resumeTimer = window.setTimeout(function() {
      isPaused = false;
      carousel.classList.remove('is-user-paused');
      setAutoplaying(true);
      lastTimestamp = 0;
      resumeTimer = null;
    }, 2400);
  }

  function start() {
    normalizeScrollPosition();
    setAutoplaying(!isPaused);
    if (!animationFrame) {
      animationFrame = window.requestAnimationFrame(tick);
    }
  }

  track.addEventListener('scroll', normalizeScrollPosition, { passive: true });
  track.addEventListener('wheel', function() {
    pause();
    resumeSoon();
  }, { passive: true });
  track.addEventListener('touchstart', pause, { passive: true });
  track.addEventListener('touchmove', normalizeScrollPosition, { passive: true });
  track.addEventListener('touchend', resumeSoon, { passive: true });
  track.addEventListener('touchcancel', resumeSoon, { passive: true });
  track.addEventListener('pointerdown', pause, { passive: true });
  track.addEventListener('pointerup', resumeSoon, { passive: true });
  track.addEventListener('pointercancel', resumeSoon, { passive: true });
  track.addEventListener('focusin', pause);
  track.addEventListener('focusout', resumeSoon);
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      setAutoplaying(false);
      return;
    }

    lastTimestamp = 0;
    if (!isPaused) {
      setAutoplaying(true);
    }
  });
  if (reduceMotionQuery && typeof reduceMotionQuery.addEventListener === 'function') {
    reduceMotionQuery.addEventListener('change', function() {
      setAutoplaying(!isPaused);
      lastTimestamp = 0;
    });
  }
  window.addEventListener('resize', normalizeScrollPosition, { passive: true });

  start();
}

var pageVisualsInitialized = false;

function initializeCriticalPageUi() {
  document.body.classList.add('ready');
  if ($('#all').length) {
    setElementDisplay('#all', 'block');
  }
  if ($('#header').length) {
    setElementDisplay('#header', 'block');
  }
}

function initializeDeferredPageVisuals() {
  if (pageVisualsInitialized) return;
  pageVisualsInitialized = true;

  initParticles();
  applyParticlesFallback();
  stabilizeMarkdownBadges();
  setupAboutProjectCarouselDrag();
}

function scheduleDeferredPageVisuals() {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(initializeDeferredPageVisuals, { timeout: 1400 });
  } else {
    window.setTimeout(initializeDeferredPageVisuals, 300);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initializeCriticalPageUi();
    scheduleDeferredPageVisuals();
  }, { once: true });
} else {
  initializeCriticalPageUi();
  scheduleDeferredPageVisuals();
}
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
    $('a').hover(cursorhover, cursor);
  }
});

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
  document.addEventListener('DOMContentLoaded', setupAnimatedPageTitles, { once: true });
} else {
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

function isSkyletAssistantPage() {
  var path = window.location.pathname || '/';
  return /^\/(?:(?:pt|es)\/)?ia\/?$/i.test(path);
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
  script.src = 'https://cdn.jsdelivr.net/npm/@lottiefiles/lottie-player@2.0.12/dist/lottie-player.js';
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

function loadSkyletWidgetAssets() {
  if (isSkyletAssistantPage()) {
    return;
  }

  if (!document.getElementById('skylet-widget-style')) {
    var link = document.createElement('link');
    link.id = 'skylet-widget-style';
    link.rel = 'stylesheet';
    link.href = '/css/skylet-widget.css?v=4d85970dfe';
    document.head.appendChild(link);
  }

  if (!document.getElementById('skylet-widget-script')) {
    var script = document.createElement('script');
    script.id = 'skylet-widget-script';
    script.src = '/js/skylet-widget.js?v=20261002desktop6';
    script.defer = true;
    document.body.appendChild(script);
  }
}

// Spotlight navigation is the sole site navigation.
function loadSpotlightNavigationAssets() {
  function loadScript() {
    if (document.getElementById('spotlight-navigation-script')) {
      return;
    }

    var script = document.createElement('script');
    script.id = 'spotlight-navigation-script';
    script.src = '/js/spotlight-navigation.js?v=20261001j';
    script.defer = true;
    document.body.appendChild(script);
  }

  var existingStyle = document.getElementById('spotlight-navigation-style');

  if (!existingStyle) {
    var link = document.createElement('link');
    link.id = 'spotlight-navigation-style';
    link.rel = 'stylesheet';
    link.href = '/css/spotlight-navigation.css?v=20261001k';
    link.addEventListener('load', loadScript, { once: true });
    document.head.appendChild(link);
    return;
  }

  loadScript();
}


function isStoreRoute() {
  var path = String(window.location.pathname || '/').replace(/\/index\.html$/i, '/');
  return /^\/(?:pt\/|es\/)?store(?:\/|$)/i.test(path) || /^\/store(?:\/(?:pt|es))?(?:\/|$)/i.test(path);
}

function ensureAboutSocialContacts() {
  var path = String(window.location.pathname || '/');
  var isAbout = path === '/about/' || path === '/about/index.html' ||
    path === '/pt/sobre/' || path === '/pt/sobre/index.html' ||
    path === '/es/sobre/' || path === '/es/sobre/index.html';
  if (!isAbout) {
    return;
  }

  var grid = document.querySelector('.contact-inquiries-section .contact-grid');
  if (!grid) {
    return;
  }

  var locale = path.indexOf('/pt/') === 0 ? 'pt' : (path.indexOf('/es/') === 0 ? 'es' : 'en');
  var copy = {
    en: { button: 'Copy', title: 'Copy to clipboard', yt: 'Copy YouTube channel URL to clipboard', ig: 'Copy Instagram profile URL to clipboard' },
    pt: { button: 'Copiar', title: 'Copiar para a área de transferência', yt: 'Copiar URL do canal do YouTube para a área de transferência', ig: 'Copiar URL do perfil do Instagram para a área de transferência' },
    es: { button: 'Copiar', title: 'Copiar al portapapeles', yt: 'Copiar la URL del canal de YouTube al portapapeles', ig: 'Copiar la URL del perfil de Instagram al portapapeles' }
  }[locale];

  function appendContact(id, href, label, animation, aria) {
    if (grid.querySelector('[data-social-contact="' + id + '"]') || grid.querySelector('[data-href="' + href + '"]')) {
      return;
    }

    var item = document.createElement('div');
    item.className = 'contact-item';
    item.setAttribute('data-social-contact', id);
    item.innerHTML =
      '<a href="' + href + '" target="_blank" rel="noopener noreferrer">' +
        '<lottie-player src="' + animation + '" background="transparent" speed="1" class="contact-item-icon" loop autoplay aria-hidden="true"></lottie-player>' +
      '</a>' +
      '<span class="contact-value" data-href="' + href + '">' + label + '</span>' +
      '<button class="copy-btn" type="button" data-copy="' + href + '" title="' + copy.title + '" aria-label="' + aria + '">' +
        '<lottie-player src="/images/lottie/copy.json?v=a7cf92b17b" background="transparent" speed="0.55" class="copy-btn-icon" loop autoplay aria-hidden="true"></lottie-player>' +
        '<span>' + copy.button + '</span>' +
      '</button>';

    grid.appendChild(item);
  }

  appendContact('instagram', 'https://www.instagram.com/pklavc/', '@pklavc', '/images/lottie/instagram-pklavc-blue-20261002.json', copy.ig);
  appendContact('youtube', 'https://www.youtube.com/@PkLavc', '@PkLavc', '/images/lottie/youtube-pklavc-blue-20261002.json', copy.yt);

  [
    'https://github.com/PkLavc',
    'https://www.linkedin.com/in/pklavc/',
    'https://www.instagram.com/pklavc/',
    'https://www.youtube.com/@PkLavc',
    'mailto:contact@pklavc.com'
  ].forEach(function(href) {
    var value = grid.querySelector('[data-href="' + href + '"]');
    var item = value && value.closest('.contact-item');
    if (item) {
      grid.appendChild(item);
    }
  });
}

function normalizeUnifiedFooter() {
  if (isStoreRoute()) {
    return;
  }

  var path = String(window.location.pathname || '/');
  var locale = path.indexOf('/pt/') === 0 ? 'pt' : (path.indexOf('/es/') === 0 ? 'es' : 'en');
  var copy = {
    en: {
      nav: 'Social and contact links',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      editorial: 'Editorial Policy',
      credits: 'Credits',
      sponsor: 'Sponsor me',
      privacyHref: '/privacy-policy/',
      termsHref: '/terms-of-use/',
      editorialHref: '/editorial-policy/',
      creditsHref: '/credits/'
    },
    pt: {
      nav: 'Links sociais e de contato',
      privacy: 'Política de Privacidade',
      terms: 'Termos de Uso',
      editorial: 'Política Editorial',
      credits: 'Créditos',
      sponsor: 'Patrocine',
      privacyHref: '/pt/politica-de-privacidade/',
      termsHref: '/pt/termos-de-uso/',
      editorialHref: '/pt/politica-editorial/',
      creditsHref: '/pt/creditos/'
    },
    es: {
      nav: 'Enlaces sociales y de contacto',
      privacy: 'Política de Privacidad',
      terms: 'Términos de Uso',
      editorial: 'Política Editorial',
      credits: 'Créditos',
      sponsor: 'Patrocíname',
      privacyHref: '/es/politica-de-privacidad/',
      termsHref: '/es/terminos-de-uso/',
      editorialHref: '/es/politica-editorial/',
      creditsHref: '/es/creditos/'
    }
  }[locale];

  var footer = document.querySelector('footer.footer-minimal, footer');
  if (!footer) {
    footer = document.createElement('footer');
    document.body.appendChild(footer);
  }

  footer.classList.add('footer-minimal', 'footer-split', 'footer-projects');
  footer.setAttribute('data-unified-footer', 'true');
  footer.innerHTML =
    '<div class="footer-container">' +
      '<div class="footer-split-left">' +
        '<span class="footer-copyright-line">&copy; <span data-current-year></span> Patrick Araujo</span>' +
        '<span class="footer-legal-inline" aria-label="Legal links">' +
          '<a class="footer-legal-link" href="' + copy.privacyHref + '">' + copy.privacy + '</a><span aria-hidden="true">/</span>' +
          '<a class="footer-legal-link" href="' + copy.termsHref + '">' + copy.terms + '</a><span aria-hidden="true">/</span>' +
          '<a class="footer-legal-link" href="' + copy.editorialHref + '">' + copy.editorial + '</a><span aria-hidden="true">/</span>' +
          '<a class="footer-legal-link" href="' + copy.creditsHref + '">' + copy.credits + '</a>' +
        '</span>' +
      '</div>' +
      '<span class="footer-split-spacer" aria-hidden="true"></span>' +
      '<div class="footer-split-right">' +
        '<nav class="footer-social-icons" aria-label="' + copy.nav + '">' +
          '<a class="footer-social-icon-link" href="https://github.com/PkLavc" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><lottie-player src="/images/lottie/github.json?v=50cdc84fd8" background="transparent" speed="1" loop autoplay class="footer-social-lottie" aria-hidden="true"></lottie-player></a>' +
          '<a class="footer-social-icon-link" href="https://www.linkedin.com/in/pklavc/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><lottie-player src="/images/lottie/linkedin.json?v=86d0c9e071" background="transparent" speed="1" loop autoplay class="footer-social-lottie" aria-hidden="true"></lottie-player></a>' +
          '<a class="footer-social-icon-link" href="https://www.instagram.com/pklavc/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><lottie-player src="/images/lottie/instagram-pklavc-blue-20261002.json" background="transparent" speed="1" loop autoplay class="footer-social-lottie" aria-hidden="true"></lottie-player></a>' +
          '<a class="footer-social-icon-link" href="https://www.youtube.com/@PkLavc" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><lottie-player src="/images/lottie/youtube-pklavc-blue-20261002.json" background="transparent" speed="1" loop autoplay class="footer-social-lottie" aria-hidden="true"></lottie-player></a>' +
          '<a class="footer-social-icon-link" href="mailto:contact@pklavc.com" aria-label="Email"><lottie-player src="/images/lottie/mail.json?v=895f6ab30e" background="transparent" speed="1" loop autoplay class="footer-social-lottie" aria-hidden="true"></lottie-player></a>' +
          '<a class="footer-social-icon-link" href="https://github.com/sponsors/PkLavc" target="_blank" rel="noopener noreferrer" aria-label="' + copy.sponsor + '"><lottie-player src="/images/lottie/sponsor-pklavc-blue-20261002.json" background="transparent" speed="1" loop autoplay class="footer-social-lottie" aria-hidden="true"></lottie-player></a>' +
        '</nav>' +
      '</div>' +
    '</div>';

  footer.querySelectorAll('[data-current-year]').forEach(function(node) {
    node.textContent = String(new Date().getFullYear());
  });
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
  document.addEventListener('DOMContentLoaded', ensureAboutSocialContacts, { once: true });
  document.addEventListener('DOMContentLoaded', normalizeUnifiedFooter, { once: true });
  document.addEventListener('DOMContentLoaded', initSpaceReveals, { once: true });
  document.addEventListener('DOMContentLoaded', ensureLottiePlayerAssets, { once: true });
  document.addEventListener('DOMContentLoaded', loadSkyletWidgetAssets, { once: true });
  document.addEventListener('DOMContentLoaded', loadSpotlightNavigationAssets, { once: true });
  document.addEventListener('DOMContentLoaded', initIndexFooterAwareSocialLinks, { once: true });
} else {
  ensureAboutSocialContacts();
  normalizeUnifiedFooter();
  initSpaceReveals();
  ensureLottiePlayerAssets();
  loadSkyletWidgetAssets();
  loadSpotlightNavigationAssets();
  initIndexFooterAwareSocialLinks();
}


(function loadDynamicAdvertising() {
  var path = String(window.location.pathname || '/').replace(/\/index\.html$/i, '/');
  var shouldLoad =
    /^\/blog\/(?:(?:en|pt|es)\/)?[^/]+\/?$/.test(path) ||
    /^\/(?:pt|es)\/blog\/[^/]+\/?$/.test(path) ||
    /^\/store(?:\/(?:pt|es))?\/?$/.test(path);

  if (!shouldLoad) return;

  if (!document.getElementById('pklavc-ads-style')) {
    var style = document.createElement('link');
    style.id = 'pklavc-ads-style';
    style.rel = 'stylesheet';
    style.href = '/ads/ads.css?v=20261005amazon-white-logo1';
    document.head.appendChild(style);
  }

  function loadRuntime() {
    if (document.getElementById('pklavc-ads-runtime')) return;
    var runtime = document.createElement('script');
    runtime.id = 'pklavc-ads-runtime';
    runtime.src = '/ads/ads.js?v=20261005amazon-white-logo1';
    runtime.async = true;
    document.head.appendChild(runtime);
  }

  if (window.PKLAVC_BLOG_ADS) {
    loadRuntime();
    return;
  }

  var existingConfig = document.getElementById('pklavc-ads-config');
  if (existingConfig) {
    existingConfig.addEventListener('load', loadRuntime, { once: true });
    return;
  }

  var config = document.createElement('script');
  config.id = 'pklavc-ads-config';
  config.src = '/ads/config.js?v=20261005amazon-white-logo1';
  config.async = true;
  config.addEventListener('load', loadRuntime, { once: true });
  document.head.appendChild(config);
}());
