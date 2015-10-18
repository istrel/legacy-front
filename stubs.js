'use strict';

var sinon = require('sinon');

var Stubs = {
    stub: sinon.stub().returns(function (req, res, next) {
        next();
    }),
    middleware: function(req) {
        var stub = Stubs.stub(req);
        stub.apply(stub, arguments);
    }
};

module.exports = Stubs;
