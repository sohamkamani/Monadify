module.exports = function(Monadify){
  return function(lodash){
    Object.keys(lodash).forEach(function(key){
      Monadify.prototype[key] = function(arg){
        var self = this;
        self.input = lodash[key](self.input, arg);
        return self;
      };
    });
  };
};
