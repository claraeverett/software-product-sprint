var map;
var geocoder;

function initMap() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(37.42, -122.16);
    var mapOptions = {
      zoom: 8,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    getResults("94305");
}

function getResults(zip) {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        // submit a get request to the restful service zipSearch or locSearch.
        url: "https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zip,
        dataType: 'jsonp',
        jsonpCallback: 'searchResultsHandler',
    });
}

//iterate through the JSON result object.
function searchResultsHandler(searchresults) {
    for (var key in searchresults) {
        var results = searchresults[key];
        for (var i = 0; i < results.length; i++) {
            var result = results[i];
            var code = result['id'];
            getDetails(code);
        }
    }
}

function getDetails(id) {
    console.log("whats up");
    console.log(id);
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        // submit a get request to the restful service mktDetail.
        url: "https://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id,
        dataType: 'jsonp',
        jsonpCallback: 'detailResultHandler'
    });
}
//iterate through the JSON result object.
function detailResultHandler(detailresults) {
    console.log("hel");
    for (var key in detailresults) {
        var results = detailresults[key];
        var products = results['Products'];
        var schedule = results['Schedule'];
        var address = results['Address'];
        console.log("heyo");
        codeAddress(schedule, address, products);
    }
}

function codeAddress(titles, address, products) {
    console.log("hello");
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        console.log("YO");
        map.setCenter(results[0].geometry.location);
        var windowS = new google.maps.InfoWindow({
            content: '<p> Date & Time: ' + titles + 'Products sold: ' + products + ' </p>',
            maxWidth: 200
        });
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            animation: google.maps.Animation.DROP,
            title: "Farmers Market"
        });
        marker.addListener('click', function() {
            windowS.open(map, marker);
        });

      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

