// #########GLOBAL VARIABLES#########
// ##################################
var json,
  json2,
  trucks,
  myLatlng,
  coordinates,
  map,
  infoBubble;

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
    coordinates = latitude + ", " + longitude;
    myLatlng = new google.maps.LatLng(latitude,longitude);
    find_trucks();
    initialize();
  }
  function error() {
    output.html("Unable to retrieve your location");
    myLatlng = new google.maps.LatLng(40.7, -74);
    coordinates = "40.7, -74";
    find_trucks();
    initialize();
  }
  output.html("<p>Locating...</p>");
  navigator.geolocation.getCurrentPosition(success, error);
}

// Function that requests foursquare information.
function find_trucks(){
  var url = "https://api.foursquare.com/v2/venues/search?client_id=RJSWD24SW0YBT3ARBT3UES4HFRZCE5XZR5HPN0MIC11KJXDX&client_secret=AARRX54N1DZKWZ5SPOJ3QPCDUJD2XN4TT0BJAIRUVI51DUSS&ll="+coordinates+"&radius=30000&limit=50&categoryId=4bf58dd8d48988d1cb941735&intent=browse";
  $.ajax({
    url: url,
    method: 'GET',
    dataType: json
  }).done(function(data){
    json = data['response']['groups'][0]['items'];
    setMarkers(json);
  });
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
    zoom: 14,
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
}

// Function that sets multiple markers
function setMarkers(trucks) {
  $.each(trucks, function(index, truck){
    if(truck['name'] != "Starbucks" && truck['name'] != "Red Hook Ballfield Food Vendors" && truck['name'] != "Smorgasburg Pier 5" && truck['name'] != "Smorgasburg Williamsburg" && truck['name'] != "Bc Catering" && truck['name'] != "Tony 'The Dragon' Dragonas" && truck['name'] != "DUMBO Food Truck Lot" && truck['name'] != "Amali" ) {  
    var location = new google.maps.LatLng(truck['location']['lat'], truck['location']['lng']);
    var icon = { url: '/assets/truck.png' };
    
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: icon,
        title: truck['name']
    });
    
    markers.push(marker);

// infobubble
    google.maps.event.addListener(marker, 'click', function(){  
      if(infoBubble){
        infoBubble.close();
      }

      if(truck['contact']['twitter'] != undefined){
        twitter = '@'+truck['contact']['twitter'];
      }else{
        twitter = " ";
      }

      infoBubble = new InfoBubble({
        width: 250,
        content: '<div class="bubblediv">'+'<p>'+truck['name']+'</p>'+'<a href="https://www.twitter.com/'+twitter+'"><p>'+twitter+'</p></a>'+'</div>',
        position: location,
        borderColor: '#cccccc',
        arrowStyle: 1
      });
        infoBubble.open(map, marker);      
      });
    }
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
  $('#search').show();
}

function animateMenuOut() {
  $side_menu = $('#side-menu');
  $side_menu.stop().animate({right: '-140px', opacity: 0.8}, animation_duration);
  $side_menu.removeClass('active');
  $('#search').hide();
}


// #########ONLOAD FUNCTIONS############
// #####################################
$(function(){

$('#wrapper').hide();
$('#search').hide();
geoFindMe();

// MENU EVENT LISTENERS
// Menu hover function
  $('#side-menu').hover(function() {
    animateMenuIn();
  }, function() {
    animateMenuOut();
    $('#wrapper').hide();
  }),

// Add all trucks function
  $('#all_trucks').on('click', function() {
    clearMarkers();
    setMarkers(json);
  }),

  $('#search').on('keyup', function(e){
    var query = $(this).val().split(' ').join('%20');
    var url = "https://api.foursquare.com/v2/venues/search?client_id=RJSWD24SW0YBT3ARBT3UES4HFRZCE5XZR5HPN0MIC11KJXDX&client_secret=AARRX54N1DZKWZ5SPOJ3QPCDUJD2XN4TT0BJAIRUVI51DUSS&ll="+coordinates+"&radius=30000&limit=50&categoryId=4bf58dd8d48988d1cb941735&query=Truck%20"+query+"&intent=browse";
    if(e.keyCode === 13){
      $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json'
      }).done(function(data){
        var json3 = data['response']['groups'][0]['items'];
        clearMarkers();
        setMarkers(json3);
      });
    }
  })
});
