var assert = require('assert'),
_ = require('lodash'),
expect = require('chai').expect;

var Monadify = require('./'),
  addOne = function(n) {
    return n + 1;
  },
  mutateObj = function(obj) {
    obj.a = 'a';
    return obj;
  },
  errOne = '';

describe('initialization', function() {
  it('should be an instance of monadify', function() {
    var monad = Monadify();
    assert.equal(monad instanceof Monadify, true);
  });

  it('should initialize with error handler', function() {
    var errorHandler = function() {},
      monad = Monadify(null, errorHandler);
    assert.equal(monad.errorHandler, errorHandler);
  });
});

describe('value', function() {
  it('returns the current value present in the monad', function() {
    var mon1 = Monadify(1);
    assert.equal(mon1.value(), 1);
  });

  it('returns a new cloned object and not a reference', function() {
    var obj = {},
      mon = Monadify(obj);
    assert.notEqual(mon.value(), obj);
    assert.deepEqual(mon.value(), obj);
  });
});

describe('Bind', function() {
  it('binds a function to a monad, and returns itself', function() {
    var mon1 = Monadify(1, console.log);
    assert.equal(mon1.bind(addOne) instanceof Monadify, true);
  });

  it('can bind multiple functions one after the other and return the result through value', function() {
    var mon10 = Monadify(10, console.log);
    mon10
      .bind(addOne)
      .bind(addOne)
      .bind(addOne)
      .bind(addOne);
    assert.equal(mon10.value(), 14);
  });

  it('mutates an object if sent to it', function() {
    var monObj = Monadify({});
    monObj.bind(mutateObj);
    assert.equal(monObj.value().a, 'a');
  });
});

describe('Send', function() {
  it('applies a function to the input, without mutating it or deriving the functions return value', function() {
    var mon10 = Monadify(10, console.log);
    mon10
      .bind(addOne)
      .bind(addOne)
      .bind(addOne)
      .bind(addOne)
      .send(addOne);
    assert.equal(mon10.value(), 14);
  });

  it('can send to multiple functions one after the other and return the result through value', function() {
    var mon10 = Monadify(10, console.log);
    mon10
      .send(addOne)
      .send(addOne)
      .send(addOne)
      .send(addOne);
    assert.equal(mon10.value(), 10);
  });

  it('does not mutate an object if sent to it', function() {
    var monObj = Monadify({});
    monObj.send(mutateObj);
    assert.equal(monObj.value().a, undefined);
  });
});


describe('Error handling', function(){
  it('throws standard error if error handler is not given', function(){
    var monObj = Monadify({}),
    errorRiddenFunction = function(){
      monObj.send(errOne);
    };
    expect(errorRiddenFunction).to.throw(Error);
  });
  it('does not throw standard error if error handler is given', function(){
    var monObj = Monadify({}, function(){}),
    errorRiddenFunction = function(){
      monObj.send(errOne);
    };
    expect(errorRiddenFunction).to.not.throw(Error);
  });
});

describe('Lodash support', function(){
  Monadify.use(_);

  it('can use two argument lodash functions', function(){
    var monArr = Monadify([1,2,3]),
    monObj = Monadify({'one' : 1});
    assert.deepEqual(monArr.map(addOne).value(), [2,3,4]);
    assert.deepEqual(monObj.assign({two: 'two'}).value(), {one : 1, two : 'two'});
  });
  it('can use single argument lodash functions', function(){
    var monArr = Monadify([3,1,2]),
    monObj = Monadify({'one' : 1});
    assert.deepEqual(monArr.sortBy().value(), [1,2,3]);
    assert.deepEqual(monObj.assign({two: 'two'}).value(), {one : 1, two : 'two'});
  });
});
