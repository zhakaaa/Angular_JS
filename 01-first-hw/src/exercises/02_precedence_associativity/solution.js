// Single-file: meta + solution + tests (no external helpers needed)

export const meta = {
  id: "02",
  title: "Operator Precedence & Associativity",
  description:
    "Understand evaluation order and use parentheses to change the result.",
};

// Reference implementation (what 'Run Solution' would do)
export function runTestSolution() {
  // default precedence/associativity
  const base1 = 2 + 3 * 4; // 14
  const base2 = 100 / 10 / 2; // 5
  const base3 = 2 ** (3 ** 2); // 512

  console.log(base1);
  console.log(base2);
  console.log(base3);

  // override with parentheses
  const paren1 = (2 + 3) * 4; // 20
  const paren2 = 100 / (10 / 2); // 20
  const paren3 = (2 ** 3) ** 2; // 64

  console.log(paren1);
  console.log(paren2);
  console.log(paren3);

  return { base1, base2, base3, paren1, paren2, paren3 };
}

/* ========== Minimal test helpers ========== */
const eq = (a, b) => Object.is(a, b);

/* ========== Tests (exported) ========== */
export const checkpoints = [
  {
    id: "02-1",
    description: "Compute results using default precedence/associativity.",
    test({ returned }) {
      const { base1, base2, base3 } = returned || {};
      const missing =
        base1 === undefined || base2 === undefined || base3 === undefined;

      if (missing) {
        return [
          {
            pass: false,
            message:
              "Compute base1, base2, base3 (no parentheses). TODO: 2+3*4, 100/10/2, 2**3**2",
          },
        ];
      }

      return [
        { pass: eq(base1, 14), message: "base1 should be 14 (2 + 3 * 4)" },
        { pass: eq(base2, 5), message: "base2 should be 5 (100 / 10 / 2)" },
        {
          pass: eq(base3, 512),
          message: "base3 should be 512 (right-associative exponentiation)",
        },
      ];
    },
  },
  {
    id: "02-2",
    description: "Use parentheses to override evaluation order.",
    test({ returned }) {
      const { paren1, paren2, paren3 } = returned || {};
      const missing =
        paren1 === undefined || paren2 === undefined || paren3 === undefined;

      if (missing) {
        return [
          {
            pass: false,
            message:
              "Add paren1, paren2, paren3 using parentheses. TODO: (2+3)*4, 100/(10/2), (2**3)**2",
          },
        ];
      }

      return [
        { pass: eq(paren1, 20), message: "paren1 should be 20 ((2 + 3) * 4)" },
        {
          pass: eq(paren2, 20),
          message: "paren2 should be 20 (100 / (10 / 2))",
        },
        {
          pass: eq(paren3, 64),
          message: "paren3 should be 64 ((2 ** 3) ** 2)",
        },
      ];
    },
  },
];
