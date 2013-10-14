var data;

function listNames(data){
	data = data;

	// $.each(data, function(truck){
	// 	console.log(truck);
	// 	$('#names').append("<p>" + truck.name + "</p>");
	// });
}

$(document).ready(function(){
	var map = L.mapbox.map('map', 'camicano.map-iyrwvy16');
	var marker = L.mapbox.markerLayer();

	$.ajax({
   		url: '/',
		type: 'GET',
		dataType: 'json',
	}).done(function(data){
		console.log(data);
		$.each(data, function(index, truck){
			$('#names').append("<p>" + truck.name + "</p>");
		})
	});
});