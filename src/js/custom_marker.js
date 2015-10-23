'use strict';

import moment from 'moment';
import Google from './google_maps';

const showWish = function(markerId) {
  console.log(`triggered showWish with ${markerId} markerId`);
};

const renderedIds = [];

const CustomMarkerPromise = new Promise(resolve => {
  Google.then(google => {
    class CustomMarker extends google.maps.OverlayView {
      constructor(latlng, map, args) {
        super();

        this.latlng = latlng;
        this.args = args;
        this.setMap(map);
      }

      draw() {
        let self = this;

        let div = this.div;

        if (!div) {
          div = this.div = document.createElement('div');

          div.className = 'well wish-marker';

          let image = document.createElement('img');
          image.src = self.args.avatar;
          image.style.width = '25px';
          image.style.height = '25px';

          let title = document.createElement('span');
          title.className = 'wish-marker__title';
          title.innerHTML = self.args.title;

          let time = document.createElement('span');
          time.className = 'wish-marker__time';
          time.innerHTML = 'до ' + moment(self.args.date).format('D MMM hh:mm');

          div.appendChild(image);
          div.appendChild(title);
          div.appendChild(time);

          div.onclick = showWish.bind(null, this.args.markerId);

          if (typeof(this.args.markerId) !== 'undefined') {
            div.dataset.markerId = self.args.markerId;
            renderedIds.push(self.args.markerId);
          }

          google.maps.event.addDomListener(div, 'click', function() {
            google.maps.event.trigger(this, 'click');
          });

          const panes = this.getPanes();
          panes.overlayImage.appendChild(div);
        }

        const point = this.getProjection().fromLatLngToDivPixel(this.latlng);

        if (point) {
          div.style.left = point.x + 'px';
          div.style.top = point.y + 'px';
        }
      }

      remove() {
        var idx = renderedIds.indexOf( parseInt(this.div.dataset.markerId, 10) );
        if (idx > -1) {
          renderedIds.splice(idx, 1);
        }

        if (this.div) {
          this.div.parentNode.removeChild(this.div);
          this.div = null;
        }
      }

      getPosition() {
        return this.latlng;
      }
    }

    resolve(CustomMarker);
  });
});

export default CustomMarkerPromise;
