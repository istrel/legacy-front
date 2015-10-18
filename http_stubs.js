var sinon = require('sinon');
function HttpStubs() {
  this.stub = sinon.stub().returns(function (req, res, next) {
    next();
  });

  this.middleware = function(req) {
    var properMiddleware = this.stub(req);
    properMiddleware.apply(properMiddleware, arguments);
  }.bind(this);
}

module.exports = HttpStubs;
