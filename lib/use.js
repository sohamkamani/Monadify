module.exports = function(Monadify){
  return function(library){
    Object.keys(library).forEach(function(key){
      if(Monadify.prototype[key]){
        return;
      }
      Monadify.prototype[key] = function(){
        var self = this;
        var libraryArguments = [];
        var functionArgs = arguments;
        Object.keys(functionArgs).forEach(function(key){
          libraryArguments[Number(key)] = functionArgs[key];
        });
        libraryArguments.unshift(self.input);
        self.input = library[key].apply(self, libraryArguments);
        return self;
      };
    });
  };
};
