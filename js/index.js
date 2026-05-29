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
        value: 56,
        density: {
          enable: true,
          value_area: 900
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
      detect_on: 'canvas',
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
          distance: 170,
          line_linked: {
            opacity: 0.72
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
    config.particles.number.value = 24;
    config.particles.number.density.value_area = 900;
    config.particles.line_linked.distance = 115;
    config.particles.line_linked.opacity = 0.22;
    config.particles.move.speed = 0.85;
  }

  return config;
}

function initParticles() {
  var particlesContainer = document.getElementById('particles');

  if (typeof particlesJS === 'undefined' || !particlesContainer) {
    return;
  }

  particlesJS('particles', getParticlesConfig());

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
  $('#navigation-content').addClass('is-open');
  setElementDisplay('#navigation-content', 'flex');
  animateElementY('#navigation-content', 0.24, 0);
  lockNavigationScroll();
  isMenuOpen = true;
}

function closeNavigationMenu() {
  unlockNavigationScroll();
  animateElementY('#navigation-content', 0.24, '-100%', function() {
    $('#navigation-content').removeClass('is-open');
    setElementDisplay('#navigation-content', 'none');
  });
  isMenuOpen = false;
}

function ensureBlogNavigationLink() {
  var navLists = document.querySelectorAll('.navigation-links');

  navLists.forEach(function(navList) {
    if (navList.querySelector('#blog-link') || navList.querySelector('a[href="/blog/"]')) {
      return;
    }

    var projectsLink = navList.querySelector('#projects-link');
    var blogLink = document.createElement('a');

    blogLink.href = '/blog/';
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

  return (storedLabel || dataText || (visibleText && visibleText.textContent) || link.textContent || '').trim();
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
enhanceNavigationMenuLetters();
ensureNavigationCloseButton();

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
  var canAnimateCursor = !mobilePointer && $cursor.length && isGsapAvailable();

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

function loadSkylerWidgetAssets() {
  var path = window.location.pathname || '/';
  if (/^\/skyler-assistant\/?$/i.test(path)) {
    return;
  }

  if (!document.getElementById('skyler-widget-style')) {
    var link = document.createElement('link');
    link.id = 'skyler-widget-style';
    link.rel = 'stylesheet';
    link.href = '/css/skyler-widget.css?v=fb1586a89d';
    document.head.appendChild(link);
  }

  if (!document.getElementById('skyler-widget-script')) {
    var script = document.createElement('script');
    script.id = 'skyler-widget-script';
    script.src = '/js/skyler-widget.js?v=2efd98d1b1';
    script.defer = true;
    document.body.appendChild(script);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSpaceReveals, { once: true });
  document.addEventListener('DOMContentLoaded', loadSkylerWidgetAssets, { once: true });
} else {
  initSpaceReveals();
  loadSkylerWidgetAssets();
}
