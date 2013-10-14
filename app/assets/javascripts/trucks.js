var latitude,
	longitude,
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

var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title:"Hello World!"
});

}



window.onload = function(){
	geoFindMe();
    // google.maps.event.addDomListener(window, 'load', initialize);
};



// Add trucks as markers to map -> function addmarker
function addMarker(location) {
        marker = new google.maps.Marker({
            position: location,
            map: map
        });
    }