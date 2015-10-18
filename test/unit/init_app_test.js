'use strict';

let UserStatus  = require('user_status');
let Wishes      = require('wishes');
let getClusters = require('get_clusters');

let Faker       = require('faker');
let _           = require('lodash');

let initMap     = require('init_app');

describe('initMap', function() {
  it('renders clustered wishes', function() {
    var markers = _.times(20, function() {
      return {
        latitude: Math.random(),
        longitude: Math.random(),
        id: Faker.random.number()
      };
    });

    // sinon stubs
    sinon.stub(UserStatus, 'bind');
    sinon.stub(UserStatus, 'poll');
    sinon.stub(Wishes, 'bind');
    sinon.stub(Wishes, 'poll');

    // rewiring module
    var renderWishes = sinon.stub();

    // main call
    initMap(renderWishes);

    var callback = Wishes.bind.firstCall.args[0];
    callback(markers);

    sinon.assert.calledWith(renderWishes, getClusters(markers, 0.1) );
  });
});
