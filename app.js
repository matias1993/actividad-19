/* VAR COORDS / IMAGE DARK SKY */
var coords = {
 	talca: {
 		lat: -35.4232444,
 		lng: -71.64848039999998
 	},
 	paris: {
 		lat: 48.856614,
 		lng: 2.3522219000000177
 	},
 	londres: {
 		lat: 51.5073509,
 		lng: -0.12775829999998223
 	}
 };

var image = {
    'clear-day':'https://icons.wxug.com/i/c/v4/clear.svg',
    'clear-night':'https://icons.wxug.com/i/c/v4/nt_clear.svg',
    'partly-cloudy-day':'https://icons.wxug.com/i/c/v4/partlycloudy.svg',
    'partly-cloudy-night':'https://icons.wxug.com/i/c/v4/nt_hazy.svg',
    'mostly-cloudly-night': 'https://icons.wxug.com/i/c/v4/nt_mostlycloudy.svg',
    'cloudy':'https://icons.wxug.com/i/c/v4/cloudy.svg',
    'rain':'https://icons.wxug.com/i/c/v4/rain.svg',
    'hazy':'https://icons.wxug.com/i/c/v4/hazy.svg'
  };

/* VAR GOOGLE MAPS */
var map = null;
var marker = null;

/* INIT GOOGLE MAPS */
function initMap() {
	var location = null;
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 11,
		center: location
	});

	marker = new google.maps.Marker({
		position: location,
		map: map
	});
}

/* VAR DARK SKY */
var proxy = 'https://crossorigin.me/';
var url = 'https://api.darksky.net/forecast/';
var apiKey = '9855a3c6cc3cc77070f7114eaff809d6';
var queryParams = ['exclude=[minutely,flags]', 'lang=es', 'units=auto'];

/* ONCHANGE SET GOOGLE MAP */
$('#select').on('change', function() {
	map.setCenter(coords[$(this).val()]);
	marker.setMap(null);
	marker = new google.maps.Marker({
		position: (coords[$(this).val()]),
		map: map
	});

	/* DARK SKY AJAX */
	$.ajax({
		url: proxy + url + apiKey + '/' + coords[$(this).val()].lat + ',' + coords[$(this).val()].lng + '?' + queryParams[0] + '&' + queryParams[1] + '&' + queryParams[2],
		method: 'GET',
		xhrFields: {cors: false}
	}).then(function(data) {
		console.log(data);
		$('#resumen').text(parseInt(data.currently.temperature) + '° ' + data.currently.summary);
		$('.img-responsive').attr('src',image[data.currently.icon]);
	});

});
