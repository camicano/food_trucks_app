$(document).ready(function() {
  $(window).scroll(function(e){
    parallax();
  });
  function parallax() {
    var scrolled = $(window).scrollTop();
    $('.bg').css('top', -(scrolled * 0.15) + 'px');
  }

  $('#side-menu').on('click', function() {
    var $this = $(this);
    if($this.hasClass('active')) {
      animateMenuOut();
    } else {
      animateMenuIn();
    }
  });

  $('#side-menu').hover(function() {
    animateMenuIn();
  }, function() {
    animateMenuOut();
  });
});

var animation_duration = 300;

function animateMenuIn() {
  $side_menu = $('#side-menu')
  $side_menu.stop().animate({
      right: '0px',
      opacity: 1
    }, 
    animation_duration, 
    "easeInOutQuad",
    function() {
      $side_menu.addClass('active');
    }
  );
}
function animateMenuOut() {
  $side_menu = $('#side-menu')
  $side_menu.stop().animate({right: '-150px', opacity: 0.5}, animation_duration);
  $side_menu.removeClass('active');
}