'use strict';

_ = require('lodash');

export default function getClusters(markers, factor) {
  factor = factor || 1;

  var clusters = [];

  function distance(lhs, rhs) {
    return Math.abs(lhs.latitude - rhs.latitude) + Math.abs(lhs.longitude - rhs.longitude);
  }

  markers.forEach(function(marker) {
    var properCluster = _.find(clusters, function(cluster) {
      return distance(cluster, marker) < 2 * factor;
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
            cluster.id = _.pluck(cluster.markers, 'id').toString();
          })
          .map(function(cluster) {
            return (cluster.markers.length > 1 ? cluster : cluster.markers[0]);
          })
          .value();
}
