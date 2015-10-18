'use strict';

var Factory = require('./factories');
var stub = require('./stubs').stub;
var match = require('sinon').match;
var _ = require('underscore');

var user = {
  status: 'authorized',
  user: Factory.build('user')
};

var wishes = _.times(5, Factory.build.bind(Factory, 'wish') );

stub.withArgs( match.has('url', match(/\/status$/) ) )
  .returns(function(req, res) {
    res.json(user);
  });

stub.withArgs( match.has('url', match(/\/wishes.json$/) ) )
  .returns(function(req, res) {
    res.json(wishes);
  });
