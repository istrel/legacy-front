'use strict';

import * as GoogleMapsLoader from 'google-maps';

GoogleMapsLoader.KEY = 'AIzaSyAlq3BnOstb1Ye3mP2C30dvxYbA-wEWyII';

const GooglePromise = new Promise(resolve => {
  GoogleMapsLoader.load( google => {
    resolve(google);
  });
});

export default GooglePromise;
