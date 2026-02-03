$(window).on('load',function(){
  gsap.to('#all',0,{display:"block"});
  gsap.to('#header',0,{display:"block"});
  gsap.to('#navigation-content',0,{display:"none"});
  gsap.to('#navigation-content',0,{display:"flex",delay:1});
})
$(function(){
  $('.color-panel').on("click",function(e) {
    e.preventDefault();
    $('.color-changer').toggleClass('color-changer-active');
});
$('.colors a').on("click",function(e) {
  e.preventDefault();
  var attr = $(this).attr("title");
  console.log(attr);
  $('head').append('<link rel="stylesheet" href="css/'+attr+'.css">');
});
});
var isMenuOpen = false;

$(function(){
     $('.menubar').on('click',function(){
         if (!isMenuOpen) {
             gsap.to('#navigation-content',.6,{y:0});
             isMenuOpen = true;
         } else {
             gsap.to('#navigation-content',.6,{y:"-100%"});
             isMenuOpen = false;
         }
     });
   });

$(function(){
    $('#about-link').on('click',function(){
      gsap.to('#navigation-content',0,{display:"none"});
      gsap.to('#navigation-content',0,{y:'-100%'});
      isMenuOpen = false;
  gsap.to('#header',0,{display:"none"});
gsap.to('#projects',0,{display:"none"});
gsap.to('#portfolio',0,{display:"none"});
   gsap.to('#breaker',0,{display:"block"});
   gsap.to('#breaker-two',0,{display:"block"});
gsap.to('#contact',0,{display:"none"});
   gsap.to('#breaker',0,{display:"none"});
   gsap.to('#breaker-two',0,{display:"none"});
   gsap.to('#about',0,{display:"block"});
   gsap.to('#navigation-content',0,{display:'flex'});
 })
 $('#contact-link').on('click',function(){
   gsap.to('#navigation-content',0,{display:"none"});
   gsap.to('#navigation-content',0,{y:'-100%'});
   isMenuOpen = false;
gsap.to('#header',0,{display:"none"});
gsap.to('#about',0,{display:"none"});
gsap.to('#projects',0,{display:"none"});
gsap.to('#portfolio',0,{display:"none"});
gsap.to('#breaker',0,{display:"block"});
gsap.to('#breaker-two',0,{display:"block"});
gsap.to('#breaker',0,{display:"none"});
gsap.to('#breaker-two',0,{display:"none"});
gsap.to('#contact',0,{display:"block"});
gsap.to('#navigation-content',0,{display:'flex'});
})
$('#portfolio-link').on('click',function(){
  gsap.to('#navigation-content',0,{display:"none"});
  gsap.to('#navigation-content',0,{y:'-100%'});
  isMenuOpen = false;
gsap.to('#header',0,{display:"none"});
gsap.to('#about',0,{display:"none"});
gsap.to('#contact',0,{display:"none"});
gsap.to('#projects',0,{display:"none"});
gsap.to('#breaker',0,{display:"block"});
gsap.to('#breaker-two',0,{display:"block"});
gsap.to('#breaker',0,{display:"none"});
gsap.to('#breaker-two',0,{display:"none"});
gsap.to('#portfolio',0,{display:"block"});
gsap.to('#navigation-content',0,{display:'flex'});
})
$('#projects-link').on('click',function(){
  gsap.to('#navigation-content',0,{display:"none"});
  gsap.to('#navigation-content',0,{y:'-100%'});
  isMenuOpen = false;
gsap.to('#header',0,{display:"none"});
gsap.to('#about',0,{display:"none"});
gsap.to('#portfolio',0,{display:"none"});
gsap.to('#contact',0,{display:"none"});
gsap.to('#breaker',0,{display:"block"});
gsap.to('#breaker-two',0,{display:"block"});
gsap.to('#breaker',0,{display:"none"});
gsap.to('#breaker-two',0,{display:"none"});
gsap.to('#projects',0,{display:"block"});
gsap.to('#navigation-content',0,{display:'flex'});
})
$('#home-link').on('click',function(){
  gsap.to('#navigation-content',0,{display:"none"});
  gsap.to('#navigation-content',0,{y:'-100%'});
  isMenuOpen = false;
gsap.to('#header',0,{display:"none"});
gsap.to('#about',0,{display:"none"});
gsap.to('#portfolio',0,{display:"none"});
gsap.to('#contact',0,{display:"none"});
gsap.to('#projects',0,{display:"none"});
gsap.to('#breaker',0,{display:"block"});
gsap.to('#breaker-two',0,{display:"block"});
gsap.to('#breaker',0,{display:"none"});
gsap.to('#breaker-two',0,{display:"none"});
gsap.to('#header',0,{display:"block"});
gsap.to('#navigation-content',0,{display:'flex'});
})

})
$(function(){
 var body =  document.querySelector('body');
 var $cursor = $('.cursor')
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
  $(window).on('mousemove',cursormover);
  $('.menubar').hover(cursorhover,cursor);
  $('a').hover(cursorhover,cursor);
  $('.navigation-close').hover(cursorhover,cursor);

})

function toggleCredits() {
    var x = document.getElementById("credits-list");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}