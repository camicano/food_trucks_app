var json,
  trucks,
  myLatlng,
  map;

var markers = [];

var animation_duration = 500;

function geoFindMe() {
  var output = $("#out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    latitude  = position.coords.latitude;
    longitude = position.coords.longitude;
    output.innerHTML = "<p>Located</p>";
    myLatlng = new google.maps.LatLng(latitude,longitude);
    initialize();
  }

  function error() {
    output.html("Unable to retrieve your location");
  }

  output.innerHTML = "<p>Locating...</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}

function initialize() {
  var styles = [
    {
      stylers: [
        { hue: "#00D5FF" },
        { saturation: -100 },
        { lightness: -50 }
      ]
    },{
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        { hue: "#00aaff" },
        { saturation: -27 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];

  var mapOptions = {
      center: myLatlng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };

	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  map.setOptions({styles: styles});

  circle = new google.maps.Circle({
    strokeColor: '#c4630f',
    strokeOpacity: 0.7,
    strokeWeight: 2,
    fillColor: '#c4630f',
    fillOpacity: 0.3,
    map: map,
    center: myLatlng,
    radius: 1000
  });

  setMarkers(json);
}

function setMarkers(json) {
  $.each(json, function(index, truck){
    var location = new google.maps.LatLng(truck.latitude, truck.longitude);
    var icon = {
      url: '/assets/truck.png'
    };

    var marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: icon,
        title: truck.name
    });
    
    markers.push(marker);

    var infoWindow = new google.maps.InfoWindow({
      content: truck.name
      
    });

    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.open(map, marker);
    });
  });
}

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

// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}

$(function(){

  $.ajax({
    url: '/trucks.json',
    method: 'GET',
    dataType: 'json'
  }).done(function(data){
    json = data;
    geoFindMe();
  }); 

  $('#side-menu').hover(function() {
    animateMenuIn();
  }, function() {
    animateMenuOut();
  });

  // ADD bubble info
  // $(".").on('hover', function(bubble){
  //       bubble.preventDefault();
  //       var truck_tweets = $(this).html();
  //       var url = '/trucks/tweets/' + truck_tweets + '.json';
  //       $.ajax({
  //         url: url,
  //         method: 'GET',
  //         dataType: 'json'
  //       }).done(function(data){
  //         console.log(data);
  //         (data);
  //       });
  //     });

  // var infoWindow = new google.maps.InfoWindow({
  //     content: truck.name
  //   });
  // end bubble info



  $('#filter_trucks').on('click', function(e){
    e.preventDefault();
    $('#filter_items').empty();
    $.ajax({
      url: '/foods.json',
      method: 'GET',
      dataType: 'json'
    }).done(function(data){
      $.each(data, function(index, food){
        $('#filter_items').append("<li class='filter_item'>" + food.type_food + "</li>");
      });
          // created an ajax so that each time a type of food is called all tthe trucks that belong get call via json
      $(".filter_item").on('click', function(e){
        e.preventDefault();
        var foodType = $(this).html();
        var url = '/foods/show/' + foodType + '.json';
        $.ajax({
          url: url,
          method: 'GET',
          dataType: 'json'
        }).done(function(data){
          clearMarkers();
          setMarkers(data);
        });
      });   
    });
  });

  // Twitter Bubbles
  
  // google.maps.event.addDomListener(window, 'load', initialize);
});
