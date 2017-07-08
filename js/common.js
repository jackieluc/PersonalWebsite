$(function(){
  
  // Left to right scrolling background for the landing name
  let x = 0;
  setInterval(function() {
    x += 1;
    $('.name h1').css('background-position', x + 'px 0');
  }, 10);
  
  // Animate scrolling to the about-me section of the page
  $('.scroll-button').on('click', function() {
    $('html, body').animate( { scrollTop: $('#about-me').offset().top }, 'slow');
  });
  
});