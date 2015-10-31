module.exports = function(attemptedFunction){
  var self = this;
  console.log(self);

  try {
    attemptedFunction();
  } catch (e) {
    if (self.errorHandler !== undefined) {
      self.errorHandler(e);
    } else {
      var E = new Error(e);
      console.log(E);
      throw E;
    }
  }

};
