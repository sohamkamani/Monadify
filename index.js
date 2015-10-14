var clone = require('clone');

var bind = require('./lib/bind'),
  get = require('./lib/get'),
  use = require('./lib/use'),
  apply = require('./lib/apply'),
  send = require('./lib/send');

var Monadify = function(input) {
  var self = this;

  if(!(self instanceof Monadify)){
    return new Monadify(input);
  }

  self.input = clone(input);
};

Monadify.prototype.bind = bind;
Monadify.prototype.send = send;
Monadify.prototype.apply = apply;

module.exports = Monadify;
