var json;

$(document).ready(function() {

  // $('#side-menu').on('click', function() {
  //   var $this = $(this);
  //   if($this.hasClass('active')) {
  //     animateMenuOut();
  //   } else {
  //     animateMenuIn();
  //   }
  // });

  $('#side-menu').hover(function() {
    animateMenuIn();
  }, function() {
    animateMenuOut();
  });

  $('#filter-trucks').hover(function(){
    appendFilterIn();
  });

});

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

function appendFilterIn() {
  console.log("camila");
  // var filterInfo = $.ajax(function (){
  //   url: '/trucks/filter',
  //   method: 'GET',
  //   dataType: 'json'
  //   }).done(function(data){
  //     json = data;
  //     console.log(json);
  // });
  // $filter = $('#filter-trucks');
  // $filter.append("<li>" +  + "</li>")
}










