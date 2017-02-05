/**
 * Created by liamvovk on 2017-02-05.
 */

function initMap() {
    console.log(document.getSelection().toString());
    var map = new google.maps.Map(document.getElementById('map-wrapper'), {
        zoom: 17,
        center: {lat: -33.8666, lng: 151.1958}
    });

    var marker = new google.maps.Marker({
        map: map,
        // Define the place with a location, and a query string.
        place: {
            location: {lat: -33.8666, lng: 151.1958},
            query: 'Google, Sydney, Australia'

        },
        // Attributions help users find your site again.
        attribution: {
            source: 'Google Maps JavaScript API',
            webUrl: 'https://developers.google.com/maps/'
        }
    });

    // Construct a new InfoWindow.
    var infoWindow = new google.maps.InfoWindow({
        content: 'Google Sydney'
    });

    // Opens the InfoWindow when marker is clicked.
    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });
};