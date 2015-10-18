'use strict';

// Karma configuration
var webpackConfig = require('./webpack.config');

module.exports = function(config) {
  config.set({
    basePath: '',

    browsers: ['PhantomJS2'],

    frameworks: ['mocha', 'sinon-chai'],

    files: [
      'test/unit/**/*_test.js'
    ],

    preprocessors: {
      'test/unit/**/*_test.js': ['webpack']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    },

    plugins: [
      'karma-phantomjs2-launcher',
      'karma-mocha',
      'karma-sinon-chai',
      require('karma-webpack')
    ],

    reporters: ['progress'],

    client: {
      mocha: {
        ui: 'bdd'
      }
    },
    captureTimeout: 60000,
    browserNoActivityTimeout: 180000,

    port: 8080,
    colors: true,
    autoWatch: true
  });
};
