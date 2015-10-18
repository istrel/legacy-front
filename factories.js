'use strict';

var Faker = require('faker');
var Factory = require('rosie').Factory;
var defaultLocation = require('./src/js/config').defaultLocation;
var random = require('./test/helpers/random');

Factory.define('wish')
    .sequence('id')
    .attr('is_closed', true)
    .attr('close_date',  function() { return new Date().toISOString(); })
    .attr('latitude',    function() { return defaultLocation.lat + random(0.5); })
    .attr('longitude',   function() { return defaultLocation.lng + random(0.5); })
    .attr('title',       Faker.name.findName)
    .attr('description', Faker.lorem.sentence)
    .attr('avatar',      Faker.image.avatar);

Factory.define('user')
    .attr('karma', Faker.random.number);

module.exports = Factory;
