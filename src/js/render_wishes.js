'use strict';

import CustomMarkerDefer from './custom_marker';
import Google from './google_maps';
import Map from './map';

let markers = {};

export default function renderWishes(wishes) {
  Promise.all([ CustomMarkerDefer, Google, Map ])
    .then( ([ CustomMarker, google, map ]) => {

      wishes.forEach(wish => {
        if (markers[wish.id] && wish.isClosed) {
          markers[wish.id].remove();
          delete markers[wish.id];
        } else if (wish.isClosed){
        } else {
          markers[wish.id] = markers[wish.id] || new CustomMarker(
            new google.maps.LatLng(wish.latitude, wish.longitude),
            map,
            {
              markerId: wish.id,
              title: wish.title,
              avatar: wish.avatar,
              date: wish.close_date
            }
          );
        }
      });

    });
}
