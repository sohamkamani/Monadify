var assert = require('assert');
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

describe('Apply', function() {
  it('returns the current value present in the monad', function() {
    var mon1 = Monadify(1);
    assert.equal(mon1.apply(), 1);
  });

  it('returns a new cloned object and not a reference', function() {
    var obj = {},
      mon = Monadify(obj);
    assert.notEqual(mon.apply(), obj);
    assert.deepEqual(mon.apply(), obj);
  });
});

describe('Bind', function() {
  it('binds a function to a monad, and returns itself', function() {
    var mon1 = Monadify(1, console.log);
    assert.equal(mon1.bind(addOne) instanceof Monadify, true);
  });

  it('can bind multiple functions one after the other and return the result through apply', function() {
    var mon10 = Monadify(10, console.log);
    mon10
      .bind(addOne)
      .bind(addOne)
      .bind(addOne)
      .bind(addOne);
    assert.equal(mon10.apply(), 14);
  });

  it('mutates an object if sent to it', function() {
    var monObj = Monadify({});
    monObj.bind(mutateObj);
    assert.equal(monObj.apply().a, 'a');
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
    assert.equal(mon10.apply(), 14);
  });

  it('can send to multiple functions one after the other and return the result through apply', function() {
    var mon10 = Monadify(10, console.log);
    mon10
      .send(addOne)
      .send(addOne)
      .send(addOne)
      .send(addOne);
    assert.equal(mon10.apply(), 10);
  });

  it('does not mutate an object if sent to it', function() {
    var monObj = Monadify({});
    monObj.send(mutateObj);
    assert.equal(monObj.apply().a, undefined);
  });
});
