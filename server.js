'use strict';

var express = require('express');
var app = express();
var Stubs = require('./stubs');
var webpackMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');
var config = require('./webpack.config');
var http = require('http');
var path = require('path');

require('./default_stubs');

app.set('port', process.env.PORT || 3000);

// stubs
app.use(Stubs.middleware);

// webpack
app.use(webpackMiddleware( webpack(config), {} ));

// index.html
app.get('/', function(req, res) {
  res.sendFile(path.resolve('index.html'));
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
