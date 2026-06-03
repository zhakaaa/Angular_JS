// Students edit this file ONLY
export function runStarter() {
  // 1) Function declaration: greet(name) -> "Hello, {name}"
  function greet(name) {
    // TODO: return `Hello, ${name}`
    return `Hello, ${name}`;
  }

  // 2) Function expression: const square = function(n) { ... }
  const square = function (n) {
    // TODO: return n * n
    return n * n;
  };

  // 3) Closure-based counter: createCounter(start)
  //    Returns an object with { inc(), dec(), value() } using a private variable.
  function createCounter(start = 0) {
    // TODO:
    // let count = start;
    // return {
    //   inc(){ /* ++count */ },
    //   dec(){ /* --count */ },
    //   value(){ /* return count */ }
    // };
    let count = start;
    return {
      inc() {
        return ++count;
      },
      dec() {
        return --count;
      },
      value() {
        return count;
      },
    };
  }

  // Use the functions so tests can verify results
  const greetResult = greet("Alice");
  const squareResult = square(4);

  const counter = createCounter(0);
  const afterInc1 = counter.inc(); // expect 1
  const afterInc2 = counter.inc(); // expect 2
  const afterDec1 = counter.dec(); // expect 1
  const finalValue = counter.value(); // expect 1

  // (Optional) demo logs
  console.log(greetResult);
  console.log(squareResult);
  console.log(afterInc1, afterInc2, afterDec1, finalValue);

  return {
    greetResult,
    squareResult,
    afterInc1,
    afterInc2,
    afterDec1,
    finalValue,
    counter,
  };
}
