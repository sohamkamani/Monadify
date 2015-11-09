# Monadify
Make your javascript code cleaner and more expressive with the power of monads and functional programming.

## Features
- Makes your code more expressive by using a form of function chaining, instead of wrapping the input inside multiple function calls.
- _Fail the way you want_, by passing custom error handling functions so that you don't have to abuse `try` and `catch` statements.
- _Does not mutate objects_, creates a new cloned object on each instantiation, to prevent bug spewing mutations on the original object.
- _Now with support for lodash/underscore (alpha)_ - Simply [use](#use) the popular utility library you want, and gain all the functionality it provides.

## Install

```sh
$ npm install --save monadify
```

## Usage

```javascript
var Monadify = require('monadify'),
  n = 1;

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

## Documentation
- [Constructor](#constructor)
- [bind](#bind)
- [send](#send)
- [apply](#apply)
- [Lodash/underscore support](#use)

<a name="constructor"/>

### Monadify(input, [errorHandler])
Returns a mutation (monad) of the `input` argument. Optional `errorHandler` function, which gets called if an error is thrown somewhere down the function chain.

#### Arguments
- `input` - The input for the monad. Objects given as input are cloned, to prevent mutation.
- `errorHandler(error)` - Callback function to handle error thrown anywhere in the function chain.

#### Examples

```javascript
var nMonad = Monadify(1);

var obj = {},
 objMonad = Monadify(obj);

//Objects passed to the constructor are cloned, which means any changes applied to 'obj' are not passed on to objMonad.
obj.a = 'a';
objMonad.send(console.log);
//=> {}
```

#### Error handling
Defaults to `throw new Error(e);`. Calls the `errorHandler` function, if present.

```js
var nMonad = Monadify(1, console.log);
// Logs any errors to the console, instead of throwing an error.

var notAFunction = null,

  identity = function(n){
    return n;
  };

nMonad.bind(identity)
  .bind(notAFunction)
  .bind(identity);

//=> [TypeError: object is not a function]
```

<a name="bind"/>

### bind(bindingFunction)
binds the given function to the current state of the input. Mutates the input into the returned value of `bindingFunction`.

#### Arguments
- `bindingFunction(input)` - Function to be bound to the current state of the input.

#### Examples

```js
var nMonad = Monadify(2);

nMonad.bind( n => n*3);
//current state of nMonad is 6
nMonad.send(console.log);
//=> 6

//Monads bound to console.log will subsequently return undefined, since the console.log function has no return value
nMonad.bind(console.log);
//=> 6
// current state of nMonad is undefined
nMonad.send(console.log);
//=> undefined
```

<a name="send"/>

### send(sentToFunction)
sends the current state of input to the given function. Does not affect or mutate the input, and retains input state before sending to `sentToFunction`.

#### Arguments
- `sentToFunction(input)` - Function to which the current state of input is passed as an argument. Return value is disregarded.

#### Examples

```js
var nMonad = Monadify(2);

nMonad.send( n => n*3);
//current state of nMonad is still 2
nMonad.send(console.log);
//=> 2

//Monads bound to console.log will subsequently return undefined, since the console.log function has no return value
nMonad.send(console.log);
//=> 2
// current state of nMonad is 2
nMonad.send(console.log);
//=> undefined
```

<a name="apply"/>

### apply()
Returns the current state of input.

#### Examples

```js
var nMonad = Monadify(2);
nMonad.bind( n => n*3);

var n = nMonad.apply();
//value of n is 6
console.log(n);
//=> 6
```

<a name="use" />

### Lodash/underscore support*
Monadify supports the use of external utility libraries like lodash. It extends their functionality to provide for a great and expressive new way to write code. Lodash functions of the form `_.someFunction(operand, argument)` can be used with Monadify as `someMonad.someFunction(argument).apply()` (see example).

\* This feature is still in development. Contributions are welcome :)

#### Examples

```js
var Monadify = require('monadify'),
  _ = require('lodash');

Monadify.use(_);

var nMonad = Monadify([1,2,3]);

nMonad.map(addOne)  //Native lodash function => [2,3,4]
  .max()  //Native lodash function => 4
  .bind(addOne) // Monadify bind function => 5
  .apply(); // => 5


function addOne(n){
  return n + 1;
};
```

## License
MIT © [Soham Kamani](http://sohamkamani.com)
