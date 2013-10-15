var json,
  trucks,
  myLatlng,
  map;

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

  setMarkers();
}

function setMarkers() {
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

    var infoWindow = new google.maps.InfoWindow({
      content: truck.name
    });

    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.open(map, marker);
    });
  });
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

  // google.maps.event.addDomListener(window, 'load', initialize);
});
