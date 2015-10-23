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

  describe('with clusters', function() {
    beforeEach(function() {
      this.cluster = function(n, lat, lng, factor) {
        factor = factor || 1;

        return _.times(n, function() {
          return {
            latitude: lat + Math.random()  * factor,
            longitude: lng + Math.random() * factor
          };
        })
      };
    });

    describe('with two clusters and 0.1 distance provided', function() {
      beforeEach(function() {
        var firstCluster  = this.cluster(10, 25, 36.0, 0.1);
        var secondCluster = this.cluster(10, 25, 36.3, 0.1);

        this.shuffledMarkers =
          _(firstCluster)
            .union(secondCluster)
            .shuffle()
            .value();
      });

      it('creates 2 clusters', function() {
        expect( getClusters(this.shuffledMarkers, 0.1) ).to.have.lengthOf(2);
      });
    });

    describe('with two clusters', function() {
      beforeEach(function() {
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

    describe('with three clusters', function() {
      beforeEach(function() {
        var firstCluster  = this.cluster(4,  25, -1);
        var secondCluster = this.cluster(5,  25, 24);
        var thirdCluster  = this.cluster(6,  25, 6);

        this.shuffledMarkers =
          _(firstCluster)
            .union(secondCluster)
            .union(thirdCluster)
            .shuffle()
            .value();
      });

      it('returns three clusters', function() {
        expect( getClusters(this.shuffledMarkers) ).to.have.lengthOf(3);
      });

      it('sets title for created clusters', function() {
        var titles =
          _( getClusters(this.shuffledMarkers) )
            .pluck('title')
            .sort()
            .value();

        expect(titles).to.eql(['4', '5', '6']);
      });
    });
  });
});
