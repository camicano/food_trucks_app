// #########GLOBAL VARIABLES#########
// ##################################
var json,
  trucks,
  myLatlng,
  map;
var markers = [];
var animation_duration = 500;

// ############Functions############
// #################################

// function that finds the location of the devise.
function geoFindMe() {
  var output = $("#out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }
  function success(position) {
    latitude  = position.coords.latitude;
    longitude = position.coords.longitude;
    output.html("<p>Located</p>");
    myLatlng = new google.maps.LatLng(latitude,longitude);
    initialize();
  }
  function error() {
    output.html("Unable to retrieve your location");
    myLatlng = new google.maps.LatLng(40.6700, -73.9400);
    initialize();
  }
  output.html("<p>Locating...</p>");
  navigator.geolocation.getCurrentPosition(success, error);
}

// Function that initializes the googla map and set the main marker and circle around it
function initialize() {
  var styles = [{
    stylers: [
      { hue: "#cccccc" },
      { saturation: -200 },
      { lightness: -50 }
    ]},{
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        { visibility: "on" },
        { "weight": 0.2 },
        { "hue": "#6DE7F7" },
        { "saturation": 56 },
        { "lightness": 72 }
    ]},{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { "visibility": "off" },
        { "hue": "#cccccc" }
      ]
    }
  ];
  var mapOptions = {
    center: myLatlng,
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  map.setOptions({styles: styles});

// Main marker and circle
  var mainmarker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    icon: '/assets/main.png'

    });
  circle = new google.maps.Circle({
    strokeColor: '#04454d',
    strokeOpacity: 0.6,
    strokeWeight: 2,
    fillColor: '#6DE7F7',
    fillOpacity: 0.2,
    map: map,
    center: myLatlng,
    radius: 500
  });

  setMarkers(json);
}

//  Function that sets one marker
function setMarker(truck) {
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

// info bubble for that marker
  var infoBubble = new InfoBubble({
    width: 250,
    content: '<div class="bubblediv">'+'<ul>'+truck.name+'</ul>'+'</div>',
    position: location,
    borderColor: '#cccccc',
    arrowStyle: 0
  });
  google.maps.event.addListener(marker, 'click', function(){
    if(!infoBubble.isOpen()){
      infoBubble.open(map, marker);
    }
    else
    {
      infoBubble.close();
    }  
  });
}

// Function that sets multiple markers
function setMarkers(json) {
  $.each(json, function(index, truck){
    var location = new google.maps.LatLng(truck.latitude, truck.longitude);
    var icon = { url: '/assets/truck.png' };
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: icon,
        title: truck.name
    });
    
    markers.push(marker);

    var infoBubble = new InfoBubble({
      width: 250,
      content: '<div class="bubblediv">'+'<ul>'+truck.name+'</ul>'+'</div>',
      position: location,
      borderColor: '#cccccc',
      arrowStyle: 1
    });
    google.maps.event.addListener(marker, 'click', function(){
      if(!infoBubble.isOpen()){
        infoBubble.open(map, marker);
      }
      else
      {
        infoBubble.close();
      } 
    });
  });
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

// Functions that animates the menu
function animateMenuIn() {
  $side_menu = $('#side-menu');
  $side_menu.stop().animate({
    right: '0px',
    opacity: 1
  },
  animation_duration,
  "easeInOutQuad",
  function() { $side_menu.addClass('active'); }
  );
}

function animateMenuOut() {
  $side_menu = $('#side-menu');
  $side_menu.stop().animate({right: '-150px', opacity: 0.3}, animation_duration);
  $side_menu.removeClass('active');
}

// #########ONLOAD FUNCTIONS############
// #####################################
$(function(){
  $('#wrapper').hide();

// AJAX that reteives the initial markers for the map
  $.ajax({
    url: '/trucks.json',
    method: 'GET',
    dataType: 'json'
  }).done(function(data){
    json = data;
    geoFindMe();
  }),

// MENU EVENT LISTENERS
// Menu hover function
  $('#side-menu').hover(function() {
    animateMenuIn();
  }, function() {
    animateMenuOut();
  }),

// Add all trucks function
  $('#all_trucks').on('click', function() {
    clearMarkers();
    setMarkers(json);
  }),

// Select by truck function
  $('#filter_trucks').on('click', function(){
    $('.force-overflow').empty();
    $('#wrapper').show();
    $.each(markers, function(index, truck){
      $('.force-overflow').append('<p class="filter_item">'+truck.title+"</p>");
    })
    $(".filter_item").on('click', function(e){
      e.preventDefault();
      var truckName = $(this).html();
      var url = '/trucks/ajax/' + truckName.split(' ').join('%20') + '.json';
      $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json'
      }).done(function(data){
        clearMarkers();
        setMarker(data);
      });
    }); 
  });
});
