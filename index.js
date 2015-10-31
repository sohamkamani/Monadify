var clone = require('clone');

var bind = require('./lib/bind'),
  get = require('./lib/get'),
  use = require('./lib/use'),
  apply = require('./lib/apply'),
  send = require('./lib/send');

var Monadify = function(input, errorHandler) {
  var self = this;

  if (!(self instanceof Monadify)) {
    return new Monadify(input, errorHandler);
  }

  self.input = clone(input);
  self.errorHandler = errorHandler || function(e){
    throw new Error(e);
  };
};

Monadify.prototype.bind = bind;
Monadify.prototype.send = send;
Monadify.prototype.apply = apply;

module.exports = Monadify;
