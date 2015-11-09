module.exports = function(Monadify){
  return function(library){
    Object.keys(library).forEach(function(key){
      if(Monadify.prototype[key]){
        console.log(key);
        return;
      }
      Monadify.prototype[key] = function(arg){
        var self = this;
        self.input = library[key](self.input, arg);
        return self;
      };
    });
  };
};
