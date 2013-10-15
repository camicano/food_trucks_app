var animation_duration = 500;

function animateMenuIn() {
  $side_menu = $('#side-menu');
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
  $side_menu = $('#side-menu');
  $side_menu.stop().animate({right: '-150px', opacity: 0.3}, animation_duration);
  $side_menu.removeClass('active');
}

$(document).ready(function() {

  $('#side-menu').hover(function() {
    animateMenuIn();
  }, function() {
    animateMenuOut();
  });

  $('#filter_trucks').on('click', function(e){
    e.preventDefault();
    $.ajax({
      url: '/foods.json',
      method: 'GET',
      dataType: 'json'
    }).done(function(data){
      $.each(data, function(index, food){
        $('#filter_items').append("<li>" + food.type_food + "</li>");    
      });
    });
  });
});











