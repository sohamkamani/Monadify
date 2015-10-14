module.exports = function(bindingFunction) {
  var self = this;

  if (self.error) {
    return self;
  }

  try {
    self.input = bindingFunction(self.input);
  } catch (e) {
    if (!self.errorHandler) {
      self.error = new Error(e);
    }else{
      throw new Error(e);
    }
  }

  return self;
};
