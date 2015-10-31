var clone = require('clone');

module.exports = function(sendingFunction) {

  var self = this;
  try {
    sendingFunction(clone(self.input));
  } catch (e) {
    self.errorHandler(e);
  }
  return self;
};
