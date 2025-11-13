// Single-file: meta + solution + tests (no external helpers needed)

export const meta = {
  id: "01",
  title: "Primitives vs References",
  description:
    "Understand value vs reference semantics and practice immutable updates.",
};

// Reference implementation (for “Run Solution”)
export function runTestSolution() {
  let a = 10;
  let b = a;
  b = 20;
  console.log("a:", a, "b:", b);

  const arr1 = [1];
  const arr2 = arr1;
  arr2.push(2);
  console.log("arr1:", arr1, "arr2:", arr2);

  const arr3 = [...arr2, 3];
  console.log("arr2:", arr2, "arr3:", arr3);

  return { a, b, arr1, arr2, arr3 };
}

/* ========== Minimal test helpers ========== */
const eq = (a, b) => Object.is(a, b);
const deepEq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/* ========== Tests (exported) ========== */
export const checkpoints = [
  {
    id: "01-1",
    description: "Primitives copy by value; arrays by reference.",
    test({ returned }) {
      const { a, b, arr1, arr2 } = returned || {};
      return [
        {
          pass: eq(a, 10),
          message: "Variable 'a' stays 10 when 'b' is changed.",
        },
        {
          pass: eq(b, 20),
          message: "Variable 'b' becomes 20 independently.",
        },
        {
          pass: deepEq(arr1, [1, 2]),
          message: "arr1 should be mutated to [1,2].",
        },
        {
          pass: deepEq(arr2, [1, 2]),
          message: "arr2 should be same reference as arr1 (mutated together).",
        },
      ];
    },
  },
  {
    id: "01-2",
    description: "Create arr3 immutably by adding 3 without mutating arr2.",
    test({ returned }) {
      const { arr2, arr3 } = returned || {};
      if (arr3 === undefined) {
        return [
          {
            pass: false,
            message:
              "arr3 is undefined. TODO: create arr3 immutably (e.g. [...arr2, 3]).",
          },
        ];
      }
      return [
        {
          pass: deepEq(arr2, [1, 2]),
          message: "arr2 must remain [1,2].",
        },
        {
          pass: deepEq(arr3, [1, 2, 3]),
          message: "arr3 should be a new array [1,2,3].",
        },
        {
          pass: arr2 !== arr3,
          message: "arr3 must be a new reference (not the same as arr2).",
        },
      ];
    },
  },
];
