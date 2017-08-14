$(document).ready(function() {
  
  // Scroll to top upon landing/refresh
//  $(window).scrollTop(0);

  if (!isHomePage()) {
    $('#nav').fadeIn('slow');
  }
  else {
    // Nav bar can be displayed when the screen's min-width is greater than the CSS styling
    // Only show nav bar when the user scrolls at or beyond the about-me section
    $(window).scroll(function() {
      // Offset by half so that there is some flexibility in showing navigation bar
      if ($(window).scrollTop() >= $('#about-me').height() / 2)
        $('#nav').fadeIn('slow');
      else if ($('#nav').is(':visible'))
        $('#nav').fadeOut('slow');
    });
  }
  // Left to right scrolling background for the landing name
  let horizontal_scroll = 0;
  setInterval(function() {
    horizontal_scroll += 0.5;
    $('.name h1').css('background-position', horizontal_scroll + 'px 0');
  }, 10);
  
  // Animate scrolling to the about-me section of the page
  $('.scroll-button, #nav-about').on('click', function() {
    if (isHomePage())
      $('html, body').animate( { scrollTop: $('#about-me').offset().top }, 'slow');
  });
});

/**
 * Returns true if it does not have /portfolio or /blog in it's URL
 * Otherwise, returns false
 */
function isHomePage() {
  let paths = ['portfolio', 'blog'];
 
  for (let i = 0; i < paths.length; i++) {
    if (window.location.href.indexOf(paths[i]) > -1) 
      return false;
  };
  return true;
}