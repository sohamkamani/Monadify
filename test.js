var Monadify = require('./index');
var addOne = function(n){
  return n + 1;
};

var mon1 = Monadify(1);
var mon10 = Monadify(10);

mon1.bind(addOne).bind(addOne).bind(addOne).bind(addOne).bind(console.log);
mon10.bind(addOne).bind(addOne).bind(addOne).bind(addOne);

console.log(mon10.apply());
