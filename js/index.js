$(window).on("load",function(){
  document.body.classList.add('ready');
  // Check if elements exist before animating
  if ($("#all").length) {
    gsap.to("#all",0,{display:"block"});
  }
  if ($("#header").length) {
    gsap.to("#header",0,{display:"block"});
  }
  if ($("#navigation-content").length) {
    // Ensure navigation content is hidden on load. The menu will be shown via menubar click using GSAP animations.
    gsap.to("#navigation-content",0,{display:"none"});
  }
  
  // Fix for particles.js initialization
  if (typeof particlesJS !== "undefined" && document.getElementById("particles")) {
    // Re-initialize particles if needed
    setTimeout(function() {
      if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.densityAutoParticles();
        window.pJSDom[0].pJS.fn.particlesRefresh();
      }
    }, 100);
  }
})
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
});
var isMenuOpen = false;

$(function(){
     $(".menubar").on("click",function(e){
         e.preventDefault();
         e.stopPropagation();
         
         if (!isMenuOpen) {
             gsap.to("#navigation-content",0,{display:"flex"}); // Ensure it's display:flex before animating
             gsap.to("#navigation-content",.6,{y:0});
             isMenuOpen = true;
         } else {
             gsap.to("#navigation-content",.6,{y:"-100%", onComplete: function() { // Hide after animation completes
                 gsap.to("#navigation-content",0,{display:"none"});
             }});
             isMenuOpen = false;
         }
     });
     
     // Close menu when clicking outside
     $(document).on("click", function(e) {
         if (isMenuOpen && !$(e.target).closest("#navigation-content, .menubar").length) {
             gsap.to("#navigation-content",.6,{y:"-100%", onComplete: function() {
                 gsap.to("#navigation-content",0,{display:"none"});
             }});
             isMenuOpen = false;
         }
     });
     
     // Close menu when clicking on navigation links
     $("#navigation-content a").on("click", function() {
         if (isMenuOpen) {
             gsap.to("#navigation-content",.6,{y:"-100%", onComplete: function() {
                 gsap.to("#navigation-content",0,{display:"none"});
             }});
             isMenuOpen = false;
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
 var body =  document.querySelector("body");
 var $cursor = $(".cursor")
   function cursormover(e){
    
    gsap.to( $cursor, {
      x : e.clientX ,
      y : e.clientY,
      stagger:.002
     })
   }
   function cursorhover(e){
    gsap.to( $cursor,{
     scale:1.4,
     opacity:1
    })
    
  }
  function cursor(e){
    gsap.to( $cursor, {
     scale:1,
     opacity:.6
    }) 
  }
  $(window).on("mousemove",cursormover);
  $(".menubar").hover(cursorhover,cursor);
  $("a").hover(cursorhover,cursor);
  $(".navigation-close").hover(cursorhover,cursor);

})

function toggleCredits() {
    var x = document.getElementById("credits-list");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}