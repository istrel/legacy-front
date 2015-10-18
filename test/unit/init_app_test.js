'use strict';

let UserStatus  = require('user_status');
let Wishes      = require('wishes');
let getClusters = require('get_clusters');

let Faker       = require('faker');
let _           = require('lodash');

let initMap     = require('init_app');

describe('initMap', function() {
  beforeEach(function() {
    [UserStatus, Wishes].forEach(obj => {
      ['bind', 'poll'].forEach(method => {
        sinon.stub(obj, method);
      });
    });
  });

  afterEach(function() {
    [UserStatus, Wishes].forEach(obj => {
      ['bind', 'poll'].forEach(method => {
        obj[method].restore();
      });
    });
  });

  it('renders clustered wishes', function() {
    var markers = _.times(20, function() {
      return {
        latitude: Math.random(),
        longitude: Math.random(),
        id: Faker.random.number()
      };
    });

    // rewiring module
    var renderWishes = sinon.stub();

    // main call
    initMap(renderWishes);

    var callback = Wishes.bind.firstCall.args[0];
    callback(markers);

    sinon.assert.calledWith(renderWishes, getClusters(markers, 0.1) );
  });
});
