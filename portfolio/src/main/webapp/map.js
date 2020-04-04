function getResults(zip) {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        // submit a get request to the restful service zipSearch or locSearch.
        url: "https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zip,
        dataType: 'jsonp',
        jsonpCallback: 'searchResultsHandler'
    });
}
//iterate through the JSON result object.
function searchResultsHandler(searchResults) {
    for (var key in searchresults) {
        alert(key);
        var results = searchresults[key];
        for (var i = 0; i < results.length; i++) {
            var result = results[i];
            console.log(result);
            for (var key in result) {
                if (i == 0) {
                    alert(result[key]);
                }
            }
        }
    }
}

function initMap() {
  const map = new google.maps.Map(
    document.getElementById('map'),
    {center: {lat: 39.498742, lng: -99.829330}, zoom: 5, styles:  [
            {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
            {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [{color: '#c9b2a6'}]
            },
            {
                featureType: 'administrative.land_parcel',
                elementType: 'geometry.stroke',
                stylers: [{color: '#dcd2be'}]
            },
            {
                featureType: 'administrative.land_parcel',
                elementType: 'labels.text.fill',
                stylers: [{color: '#ae9e90'}]
            },
            {
                featureType: 'landscape.natural',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
            },
            {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#93817c'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry.fill',
                stylers: [{color: '#a5b076'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#447530'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#f5f1e6'}]
            },
            {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{color: '#fdfcf8'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#f8c967'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#e9bc62'}]
            },
            {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry',
                stylers: [{color: '#e98d58'}]
            },
            {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry.stroke',
                stylers: [{color: '#db8555'}]
            },
            {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [{color: '#806b63'}]
            },
            {
                featureType: 'transit.line',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
            },
            {
                featureType: 'transit.line',
                elementType: 'labels.text.fill',
                stylers: [{color: '#8f7d77'}]
            },
            {
                featureType: 'transit.line',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#ebe3cd'}]
            },
            {
                featureType: 'transit.station',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
            },
            {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{color: '#b9d3c2'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#92998d'}]
            }
            ]
        });

    initMarkers(map);
    getResults("06824");
}

function initMarkers(map){
    /* ADD MARKERS*/
    addDearestData(map);
    addMtonomyData(map);
    addNextHealthData(map);
    addCSSIData(map);
    addBEAMData(map);
}

function addDearestData(map){
    const dearestString = 
        '<p>I worked at <b>Dearest</b>, last spring and worked on UX/UI Design for their native application. </p>';

    const dearestwindow = new google.maps.InfoWindow({
        content: dearestString,
        maxWidth: 200
    });

    const dearest = new google.maps.Marker({
        position: {lat: 40.727387, lng: -74.005995},
        map: map,
        animation: google.maps.Animation.DROP,
        title: 'Dearest Internship!'
    });

    dearest.addListener('click', function() {
        dearestwindow.open(map, dearest);
    });       
}

function addMtonomyData(map){
    const mtonomyString = 
        '<p>I worked at <b>MTonomy</b>, last spring and worked on UX/UI Design for their wallet page' +'</p>';
           
    const mtonomy = new google.maps.Marker({
        position: {lat: 42.372377, lng: -71.118532},
        map: map,
        animation: google.maps.Animation.DROP,
        title: 'MTonomy Internship!'
    });

    const mtonomywindow = new google.maps.InfoWindow({
        content: mtonomyString,
        maxWidth: 200
    });

    mtonomy.addListener('click', function() {
        mtonomywindow.open(map, mtonomy);
    });
}

function addNextHealthData(map){
    const nexthealthString = 
        '<p>I worked on UI/UX design at <b>NextHealth Technologies</b> in Denver.</p>';

    const nexthealth = new google.maps.Marker({
        position: {lat: 39.749048, lng: -104.991325},
        map: map,
        animation: google.maps.Animation.DROP,
        title: 'Next Health!'
    });

    const nexthealthwindow = new google.maps.InfoWindow({
        content: nexthealthString,
        maxWidth: 200
    });

    nexthealth.addListener('click', function() {
        nexthealthwindow.open(map, nexthealth);
    });
}

function addCSSIData(map){
    const cssiString = 
        '<p>I participated in an intensive, three-week coding bootcamp focused on programming and web app development at <b> CSSI </b>. My team developed and deployed a web application called Spiral Up that monitors emotional health using Python, JavaScript, HTML/CSS and Google App Engine during the program’s final week. </p>';

    const cssiwindow = new google.maps.InfoWindow({
        content: cssiString,
        maxWidth: 200
    });

    const cssi = new google.maps.Marker({
        position: {lat: 40.456805, lng: -79.915391},
        map: map,
        animation: google.maps.Animation.DROP,
        title: 'Google CSSI!'
    });

    cssi.addListener('click', function() {
        cssiwindow.open(map, cssi);
    });
}

function addBEAMData(map){
    const beamString = 
        '<p>As an Engineering Associate for <b>Stanford BEAM</b>, I develop and market events relevant to the engineering student community and provide the student perspective to employers. I also participate in pitching, planning, and executing events for engineering students such as alumni career panels or speaker series. </p>';

    const beam = new google.maps.Marker({
        position: {lat: 37.422680, lng: -122.166733},
        map: map,
        animation: google.maps.Animation.DROP,
        title: 'BEAM Associate!'
    });

    const beamwindow = new google.maps.InfoWindow({
        content: beamString,
        maxWidth: 200
    });

    beam.addListener('click', function() {
        beamwindow.open(map, beam);
    });
}