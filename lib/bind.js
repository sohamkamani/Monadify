module.exports = function(bindingFunction){
  var self = this;

  self.input = bindingFunction(self.input);

  return self;
};
