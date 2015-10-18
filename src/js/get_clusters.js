'use strict';

export default function getClusters(markers) {
  var sortedMarkers =
    _(markers).sortBy(function(marker) {
      return marker.latitude;
    });

  var minMarker = sortedMarkers.first();
  var maxMarker = sortedMarkers.last();

  return [minMarker, maxMarker];
}
