var clone = require('clone');

module.exports = function(sendingFunction){

  var self = this;
  sendingFunction(clone(self.input));
  return self;
};
