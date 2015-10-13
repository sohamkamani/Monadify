var bind = require('./lib/bind'),
  get = require('./lib/get'),
  use = require('./lib/use'),
  apply = require('./lib/apply');

var Monadify = function(input) {
  var self = this;

  if(!(self instanceof Monadify)){
    return new Monadify(input);
  }

  self.input = input;
};

Monadify.prototype.bind = bind;
Monadify.prototype.apply = apply;

module.exports = Monadify;
