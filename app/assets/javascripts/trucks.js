var json, 
  trucks,
	myLatlng,
	map;

function geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    latitude  = position.coords.latitude;
    longitude = position.coords.longitude;
    initialize(latitude, longitude);
    output.innerHTML = "<p>Located</p>";
    myLatlng = new google.maps.LatLng(latitude,longitude);
    initialize();
  };

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  };

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}

function initialize() {
    var mapOptions = {
        center: myLatlng,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
	map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);

  circle = new google.maps.Circle({
      strokeColor: '#555',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#555',
      fillOpacity: 0.35,
      map: map,
      center: myLatlng,
      radius: 1000
    });
  setMarkers(json);
}

function setMarkers(trucks) {
  $.each(trucks, function(index, truck){
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
  });
}

 var populationOptions = 

$(function(){
	
	
	var trucks = $.ajax({
		url: '/',
		method: 'GET',
		dataType: 'json'
	}).done(function(data){
    geoFindMe();
		json = data;
	});
    // google.maps.event.addDomListener(window, 'load', initialize);
});











