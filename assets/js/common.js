$(document).ready(function() {
  
  // Scroll to top upon landing/refresh
//  $(window).scrollTop(0);
 
  // Nav bar can be displayed when the screen's min-width is greater than the CSS styling
  // Only show nav bar when the user scrolls at or beyond the about-me section
  $(window).scroll(function() {
    
    // Offset by half so that there is some flexibility in showing navigation bar
    if ($(window).scrollTop() >= $('#about-me').height() / 2)
      $('#nav').fadeIn('slow');
    else if ($('#nav').is(':visible')) {
      $('#nav').fadeOut('slow');
    }
    
    // TODO: Determine whether or not to keep this logic for the embedded threejs application
//    if (($(window).scrollTop() >= $('#threejs').height()) && ($(window).scrollTop() <= $('#contact').height())) {
//      $('.nav-item').css('color', 'white');
//      $('#nav-about').css('color', 'white');
//    }
  });
  
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