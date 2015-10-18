'use strict';

import Google       from './google_maps';

const DEFAULT_CENTER = {
  lat: -34.397,
  lng: 150.644
};
const ZOOM = 10;

const getCurrentLocation = new Promise( (resolve, reject) => {
  resolve(defaultLocation);
});

const MapPromise = new Promise(resolve => {
  Google.then(google => {
    function renderMap(center) {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: ZOOM,
        mapTypeControl: false,
        rotateControl: false,
        streetViewControl: false
      });

      resolve(map);
    }

    getCurrentLocation
      .then( renderMap )
      .catch( renderMap.bind(null, DEFAULT_CENTER) );

  });
});


export default MapPromise;
