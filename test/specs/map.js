'use strict';

var Factory = require('../../factories');
var Stubs = require('../../stubs');
var match = require('sinon').match;
var _ = require('lodash');
var random = require('../helpers/random');

var defaultLocation = require('../../src/js/config').defaultLocation;

describe('my awesome website', function() {
  it('should do some chai assertions', function() {
    this.timeout(60e3);
    var markersLeft = _.times(10, function() {
      return Factory.build('wish', {
        latitude:  defaultLocation.lat + random(0.01),
        longitude: defaultLocation.lng - 0.2 + random(0.01)
      });
    });
    var markersRight = _.times(5, function() {
      return Factory.build('wish', {
        latitude:  defaultLocation.lat + random(0.01),
        longitude: defaultLocation.lng + 0.2 + random(0.01)
      });
    });

    var markers = _(markersLeft).union(markersRight).shuffle().value();

    Stubs.stub.withArgs( match.has('url', match('/wishes.json') ) )
      .returns(function(req, res) {
        res.json(markers);
      });

    return browser
      .url('http://localhost:3000')
      .waitForVisible('.wish-marker__title', 5000)
      .getText('.wish-marker__title')
      .then(function(titles) {
        return titles.sort();
      })
      .should.eventually.be.eql(['5', '10'].sort());
  });
});
