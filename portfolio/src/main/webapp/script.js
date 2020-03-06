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

function createMap() {
  const map = new google.maps.Map(
      document.getElementById('map'),
      {center: {lat: 39.498742, lng: -99.829330}, zoom: 5}
   );

    var dearest = new google.maps.Marker({
        position: {lat: 40.727387, lng: -74.005995},
        map: map,
        animation: google.maps.Animation.DROP,
        title: 'Dearest Internship!'
    });

    var mtonomyString = 
        '<p>I worked at <b>MTonomy</b>, last spring and worked on UX/UI Design for their wallet page' +'</p>';
           
    var mtonomy = new google.maps.Marker({
        position: {lat: 42.372377, lng: -71.118532},
        map: map,
        animation: google.maps.Animation.DROP,
        title: 'MTonomy Internship!'
    });

    var mtonomywindow = new google.maps.InfoWindow({
          content: mtonomyString,
          maxWidth: 200
    });

    mtonomy.addListener('click', function() {
          mtonomywindow.open(map, mtonomy);
    });

    var cssi = new google.maps.Marker({
        position: {lat: 40.456805, lng: -79.915391},
        map: map,
        animation: google.maps.Animation.DROP,
        title: 'Google CSSI!'
    });

    var beam = new google.maps.Marker({
        position: {lat: 37.422680, lng: -122.166733},
        map: map,
        animation: google.maps.Animation.DROP,
        title: 'BEAM Associate!'
    });

    var nexthealth = new google.maps.Marker({
        position: {lat: 39.749048, lng: -104.991325},
        map: map,
        animation: google.maps.Animation.DROP,
        title: 'Next Health!'
    });
}