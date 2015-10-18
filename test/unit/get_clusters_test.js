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

  describe('with two clusters', function() {
    beforeEach(function() {
      this.cluster = function(n, lat, lng) {
        return _.times(n, function() {
          return {
            latitude: lat + Math.random(),
            longitude: lng + Math.random()
          };
        })
      };
      var firstCluster = this.cluster(10, 25, 36);

      var secondCluster = this.cluster(10, -25, -36);

      this.shuffledMarkers =
        _(firstCluster)
          .union(secondCluster)
          .shuffle()
          .value();
    });

    it('returns two clusters for two parts of closely related markers', function() {
      expect( getClusters(this.shuffledMarkers) ).to.have.lengthOf(2);
    });

    it('returns proper value for first cluster', function() {
      var result = getClusters(this.shuffledMarkers);

      expect(result[0].latitude).to.be.within(-25, -24);
    });
  });

});
