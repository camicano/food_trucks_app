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

	var mainmarker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title:"Hello World!"
	});
  setMarkers(json);
}

function setMarkers(trucks) {
  $.each(trucks, function(index, truck){
    console.log(truck.latitude);
  	var location = new google.maps.LatLng(truck.latitude, truck.longitude);
 	  var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: truck.name
    }); 
  });
}


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











