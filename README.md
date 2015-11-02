# Monadify

Make your javascript code cleaner and more expressive with the power of monads and functional programming.

## Usage

```javascript
var Monadify = require('monadify');

var n = 1;

function add(n){
  return n + 1;
}

//The old way
console.log(add(add(add(n))));
//=> 4

//With Monadify
var nMonad = Monadify(n)
  .bind(add)
  .bind(add)
  .bind(add)
  .send(console.log);
//=> 4

//To return the result
var result = nMonad.apply();
console.log(result);
//=> 4


```
