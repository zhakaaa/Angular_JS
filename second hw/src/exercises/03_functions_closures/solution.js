// Single-file: meta + solution + tests (no external helpers needed)

export const meta = {
  id: "03",
  title: "Functions & Closures",
  description:
    "Practice function declarations, function expressions, and closure-based private state.",
};

// Reference implementation (manual check if you want to demo)
export function runTestSolution() {
  // function declaration
  function greet(name) {
    return `Hello, ${name}`;
  }

  // function expression
  const square = function (n) {
    return n * n;
  };

  // closure-based counter
  function createCounter(start = 0) {
    let count = start;
    return {
      inc() {
        count += 1;
        return count;
      },
      dec() {
        count -= 1;
        return count;
      },
      value() {
        return count;
      },
    };
  }

  const greetResult = greet("Alice");
  const squareResult = square(4);

  const counter = createCounter(0);
  const afterInc1 = counter.inc(); // 1
  const afterInc2 = counter.inc(); // 2
  const afterDec1 = counter.dec(); // 1
  const finalValue = counter.value(); // 1

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

/* ========== Minimal test helpers ========== */
const eq = (a, b) => Object.is(a, b);

/* ========== Tests (exported) ========== */
export const checkpoints = [
  {
    id: "03-1",
    description:
      "Create a function declaration greet(name) and a function expression square(n).",
    test({ returned }) {
      const { greetResult, squareResult } = returned || {};

      const checks = [];

      if (greetResult === undefined) {
        checks.push({
          pass: false,
          message:
            "greetResult is undefined. TODO: Implement function declaration greet(name) returning `Hello, ${name}`.",
        });
      } else {
        checks.push({
          pass: eq(greetResult, "Hello, Alice"),
          message: "greet('Alice') should return 'Hello, Alice'.",
        });
      }

      if (squareResult === undefined) {
        checks.push({
          pass: false,
          message:
            "squareResult is undefined. TODO: Implement function expression const square = function(n){...} and compute square(4).",
        });
      } else {
        checks.push({
          pass: eq(squareResult, 16),
          message: "square(4) should be 16.",
        });
      }

      return checks;
    },
  },
  {
    id: "03-2",
    description:
      "Implement closure-based counter with inc(), dec(), value(); verify the sequence 1, 2, 1, 1.",
    test({ returned }) {
      const { counter, afterInc1, afterInc2, afterDec1, finalValue } =
        returned || {};

      if (!counter) {
        return [
          {
            pass: false,
            message:
              "counter is undefined. TODO: Implement createCounter(start) that returns an object with inc, dec, value.",
          },
        ];
      }

      const checks = [
        {
          pass:
            typeof counter.inc === "function" &&
            typeof counter.dec === "function" &&
            typeof counter.value === "function",
          message: "counter should expose functions: inc(), dec(), value().",
        },
        {
          pass: eq(afterInc1, 1),
          message: "afterInc1 should be 1 (0 → inc → 1).",
        },
        {
          pass: eq(afterInc2, 2),
          message: "afterInc2 should be 2 (1 → inc → 2).",
        },
        {
          pass: eq(afterDec1, 1),
          message: "afterDec1 should be 1 (2 → dec → 1).",
        },
        {
          pass: eq(finalValue, 1),
          message: "finalValue should be 1 (value() after the above ops).",
        },
      ];

      return checks;
    },
  },
  {
    id: "03-3",
    description:
      "Closure privacy: the counter object must NOT expose a 'count' property.",
    test({ returned }) {
      const { counter } = returned || {};
      if (!counter) {
        return [
          {
            pass: false,
            message:
              "counter is undefined. TODO: return the counter so tests can verify closure privacy.",
          },
        ];
      }
      return [
        {
          pass: !("count" in counter),
          message:
            "The counter object must not have a 'count' property (use closure, not public fields).",
        },
      ];
    },
  },
];
