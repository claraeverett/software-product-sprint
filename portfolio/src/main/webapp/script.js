// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

function loadComments() {
  fetch('/data').then(response => response.json()).then((comments) => {
    const commentListElement = document.getElementById('comment-list');
    comments.forEach((comment) => {
        commentListElement.appendChild(createListElement(comment));
    })
  });
}

function createListElement(text) {
    const liElement = document.createElement('li');
    liElement.innerText = text;
    return liElement;
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