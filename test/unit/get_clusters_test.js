'use strict';

var _ = require('lodash');
var getClusters = require('get_clusters');

describe('clusterize', function() {
  it('returns markers as is', function() {
    var firstMarker = { latitude: 25, longitude: 25 };
    var secondMarker = { latitude: 30, longitude: -30 };

    var markers = [firstMarker, secondMarker];

    expect( getClusters(markers) ).to.eql(markers);
  });

  it('returns two clusters for two parts of closely related markers', function() {
    var firstCluster = _.times(10, function() {
      return {
        latitude: 25 + Math.random(),
        longitude: 36 + Math.random()
      }
    });

    var secondCluster = _.times(10, function() {
      return {
        latitude: -25 + Math.random(),
        longitude: -36 + Math.random()
      }
    });

    var shuffledMarkers =
      _(firstCluster)
        .union(secondCluster)
        .shuffle()
        .value();

    expect( getClusters(shuffledMarkers) ).to.have.lengthOf(2);
  });

  it('returns proper value for first cluster', function() {
    var firstCluster = _.times(10, function() {
      return {
        latitude: 25 + Math.random(),
        longitude: 36 + Math.random()
      }
    });

    var secondCluster = _.times(10, function() {
      return {
        latitude: -25 + Math.random(),
        longitude: -36 + Math.random()
      }
    });

    var shuffledMarkers =
      _(firstCluster)
        .union(secondCluster)
        .shuffle()
        .value();

    var result = getClusters(shuffledMarkers);

    expect(result[0].latitude).to.be.within(-25, -24);
  });
});
