'use strict';

export default function getClusters(markers) {
  var clusters = [];

  function distance(lhs, rhs) {
    return Math.abs(lhs.latitude - rhs.latitude) + Math.abs(lhs.longitude - rhs.longitude);
  }

  markers.forEach(function(marker) {
    var properCluster = _.find(clusters, function(cluster) {
      return distance(cluster, marker) < 2;
    });

    if (properCluster) {
      properCluster.markers.push(marker);
    } else {
      clusters.push({
        latitude: marker.latitude,
        longitude: marker.longitude,
        markers: [ marker ]
      });
    }
  });

  return _(clusters)
          .sortBy('latitude')
          .each(function (cluster) {
            cluster.title = cluster.markers.length.toString();
          })
          .map(function(cluster) {
            return (cluster.markers.length > 1 ? cluster : cluster.markers[0]);
          })
          .value();
}
