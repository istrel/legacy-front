'use strict';

var getClusters = require('get_clusters');

describe('clusterize', function() {
  it('returns markers as is', function() {
    var firstMarker = { latitude: 25, longitude: 25 };
    var secondMarker = { latitude: 30, longitude: -30 };

    var markers = [firstMarker, secondMarker];

    expect( getClusters(markers) ).to.eql(markers);
  });
});
