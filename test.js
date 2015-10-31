var Monadify = require('./index');
var addOne = function(n) {
  return n + 1;
};
var errOne= '';

var mon1 = Monadify(1, console.log);
var mon10 = Monadify(10, console.log);

mon1
  .bind(addOne)
  .bind(addOne)
  .bind(addOne)
  .bind(addOne)
  .bind(console.log);

mon10
  .bind(addOne)
  .bind(addOne)
  .bind(addOne)
  .bind(addOne)
  .send(console.log);

console.log(mon10.apply());
