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

	// var mainmarker = new google.maps.Marker({
 //    position: myLatlng,
 //    map: map,
 //    title:"Hello World!"
	// });
  circle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: myLatlng,
      radius: 1000
    });
  setMarkers(json);
}

function setMarkers(trucks) {
  $.each(trucks, function(index, truck){
    console.log(truck.latitude);
  	var location = new google.maps.LatLng(truck.latitude, truck.longitude);
    // var image = {
    // url: '/app/assets/images/truck.png',
    // // This marker is 20 pixels wide by 32 pixels tall.
    // size: new google.maps.Size(20, 32),
    // // The origin for this image is 0,0.
    // origin: new google.maps.Point(0,0),
    // // The anchor for this image is the base of the flagpole at 0,32.
    // anchor: new google.maps.Point(0, 32)
    // };
 	  var marker = new google.maps.Marker({
        position: location,
        map: map,
        // icon: image,
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
