$(document).ready(function() {
  
  // Scroll to top upon landing/refresh
//  window.scrollTo(0,0);
  
  // Left to right scrolling background for the landing name
  let horizontal_scroll = 0;
  setInterval(function() {
    horizontal_scroll += 0.5;
    $('.name h1').css('background-position', horizontal_scroll + 'px 0');
  }, 10);
  
  // Animate scrolling to the about-me section of the page
  $('.scroll-button, #nav-about').on('click', function() {
    $('html, body').animate( { scrollTop: $('#about-me').offset().top }, 'slow');
  });
  
});