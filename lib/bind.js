module.exports = function(bindingFunction) {
  var self = this;

  try {
    self.input = bindingFunction(self.input);
  } catch (e) {
    self.errorHandler(e);
  }

  return self;
};
