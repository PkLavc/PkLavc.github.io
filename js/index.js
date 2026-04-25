function isTouchOrMobile() {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0 ||
    window.innerWidth < 768
  );
}

function getParticlesConfig() {
  var config = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#ffffff'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000'
        },
        polygon: {
          nb_sides: 5
        },
        image: {
          src: 'images/github.svg',
          width: 100,
          height: 100
        }
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#ffffff',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 6,
        direction: 'none',
        random: false,
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
          enable: true,
          mode: 'repulse'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3
        },
        repulse: {
          distance: 200,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  };

  if (window.innerWidth < 768 || isTouchOrMobile()) {
    config.particles.number.value = Math.min(40, Math.round(config.particles.number.value * 0.4));
    config.interactivity.events.onhover.enable = false;
    config.interactivity.events.onclick.enable = false;
  }

  return config;
}

function initParticles() {
  if (typeof particlesJS === 'undefined' || !document.getElementById('particles')) {
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
      particlesContainer.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
    }
  }, 2000);
}

$(window).on('load', function() {
  document.body.classList.add('ready');
  if ($('#all').length) {
    gsap.to('#all', 0, { display: 'block' });
  }
  if ($('#header').length) {
    gsap.to('#header', 0, { display: 'block' });
  }
  if ($('#navigation-content').length) {
    $('#navigation-content').removeClass('is-open');
    gsap.to('#navigation-content', 0, { display: 'none' });
  }

  initParticles();
  applyParticlesFallback();

  window.addEventListener('resize', function() {
    if (window.pJSDom && window.pJSDom.length > 0) {
      window.pJSDom[0].pJS.fn.vendors.densityAutoParticles();
      window.pJSDom[0].pJS.fn.particlesRefresh();
    }
  });
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

function openNavigationMenu() {
  $('#navigation-content').addClass('is-open');
  gsap.to('#navigation-content', 0, { display: 'flex' });
  gsap.to('#navigation-content', 0.24, { y: 0 });
  isMenuOpen = true;
}

function closeNavigationMenu() {
  gsap.to('#navigation-content', 0.24, {
    y: '-100%',
    onComplete: function() {
      $('#navigation-content').removeClass('is-open');
      gsap.to('#navigation-content', 0, { display: 'none' });
    }
  });
  isMenuOpen = false;
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

  if (!mobilePointer) {
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