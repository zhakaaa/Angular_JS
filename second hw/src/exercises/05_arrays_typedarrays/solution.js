// Single-file: meta + solution + tests (no external helpers needed)

export const meta = {
  id: "05",
  title: "Arrays & Typed Arrays",
  description:
    "Practice Array methods (indexOf, push) and understand TypedArray wrapping with Int8Array. Bonus: ArrayBuffer + DataView.",
};

// Reference implementation for demo/comparison
export function runTestSolution() {
  // ----- Arrays -----
  const arr = [10, 20, 30];
  const idx20 = arr.indexOf(20); // 1

  // Show a mutating method (push)
  arr.push(40);
  const arrAfterPush = arr; // [10, 20, 30, 40]

  // ----- Typed Arrays (Int8 range: -128..127; wraps mod 256) -----
  // 128 -> -128, -129 -> 127
  const ta = new Int8Array([127, 128, -129, 0]); // [127, -128, 127, 0]

  // ----- ArrayBuffer + DataView (bonus) -----
  const buf = new ArrayBuffer(4);
  const view = new DataView(buf);
  view.setInt8(0, 127);
  view.setInt8(1, -128);
  view.setInt8(2, -1);
  view.setInt8(3, 0);
  // Read back into a plain array for easy testing
  const dataViewBytes = [
    view.getInt8(0),
    view.getInt8(1),
    view.getInt8(2),
    view.getInt8(3),
  ];

  // Optional logs
  console.log("idx20:", idx20);
  console.log("arrAfterPush:", arrAfterPush);
  console.log("ta:", ta);
  console.log("dataViewBytes:", dataViewBytes);

  return { idx20, arrAfterPush, ta, dataViewBytes };
}

/* ========== Minimal test helpers ========== */
const eq = (a, b) => Object.is(a, b);
const deepEq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/* ========== Tests (exported) ========== */
export const checkpoints = [
  {
    id: "05-1",
    description: "Arrays: find index with indexOf and append with push.",
    test({ returned }) {
      const { idx20, arrAfterPush } = returned || {};
      const checks = [];

      if (idx20 === undefined) {
        checks.push({
          pass: false,
          message: "idx20 is undefined. TODO: use arr.indexOf(20).",
        });
      } else {
        checks.push({
          pass: eq(idx20, 1),
          message: "idx20 should be 1 (20 is at index 1 in [10,20,30]).",
        });
      }

      if (!arrAfterPush) {
        checks.push({
          pass: false,
          message:
            "arrAfterPush is missing. TODO: push 40 to the original array and return the result.",
        });
      } else {
        checks.push({
          pass: deepEq(arrAfterPush, [10, 20, 30, 40]),
          message: "arrAfterPush should be [10,20,30,40] after push(40).",
        });
      }

      return checks;
    },
  },
  {
    id: "05-2",
    description:
      "TypedArray wrapping: Int8Array([127, 128, -129, 0]) -> [127, -128, 127, 0].",
    test({ returned }) {
      const { ta } = returned || {};
      if (!ta) {
        return [
          {
            pass: false,
            message:
              "ta is undefined. TODO: create new Int8Array([127, 128, -129, 0]).",
          },
        ];
      }

      return [
        {
          pass: ta instanceof Int8Array,
          message: "ta should be an instance of Int8Array.",
        },
        {
          pass: deepEq(Array.from(ta), [127, -128, 127, 0]),
          message:
            "TypedArray values should be [127, -128, 127, 0] (wrapping to -128..127).",
        },
      ];
    },
  },
  {
    id: "05-3",
    description:
      "ArrayBuffer + DataView: setInt8/readInt8 [127, -128, -1, 0] across 4 bytes.",
    test({ returned }) {
      const { dataViewBytes } = returned || {};
      if (!dataViewBytes) {
        return [
          {
            pass: false,
            message:
              "dataViewBytes is missing. TODO: use ArrayBuffer(4) + DataView to set/read bytes [127,-128,-1,0].",
          },
        ];
      }
      return [
        {
          pass: deepEq(dataViewBytes, [127, -128, -1, 0]),
          message:
            "dataViewBytes should be [127, -128, -1, 0] after setInt8/getInt8.",
        },
      ];
    },
  },
];
