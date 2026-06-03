// Single-file: meta + solution + tests (no external helpers needed)

export const meta = {
  id: "04",
  title: "ES6: Destructuring, Spread & Rest",
  description:
    "Practice object/array destructuring, immutable updates with spread, and rest parameters.",
};

// Reference implementation for comparison/demo
export function runTestSolution() {
  // Base data
  const user = {
    name: "Bob",
    age: 25,
    address: { city: "Almaty", zip: "050000" },
    role: "user",
  };
  const nums = [1, 2, 3];

  // 1) Destructuring (object + array)
  const {
    name,
    age,
    address: { city },
  } = user;
  const [first /*skip*/, , third] = nums;

  // 2) Immutable updates (object + nested object + arrays)
  const updatedUser = {
    ...user,
    role: "admin",
    address: { ...user.address, city: "Astana" }, // nested immutable change
  };
  const moreNums = [...nums, 4];
  const withoutFirst = nums.slice(1); // or [...nums].slice(1)

  // 3) Rest parameters
  function sum(...args) {
    return args.reduce((a, b) => a + b, 0);
  }
  const sumResult = sum(1, 2, 3, 4); // 10

  // Optional logs for demo
  console.log(name, age, city, first, third);
  console.log(updatedUser, nums, moreNums, withoutFirst);
  console.log(sumResult);

  return {
    // originals
    user,
    nums,

    // destructured
    name,
    age,
    city,
    first,
    third,

    // immutability results
    updatedUser,
    moreNums,
    withoutFirst,

    // rest
    sumResult,
  };
}

/* ========== Minimal test helpers ========== */
const eq = (a, b) => Object.is(a, b);
const deepEq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/* ========== Tests (exported) ========== */
export const checkpoints = [
  {
    id: "04-1",
    description:
      "Destructure object (name, age, city) and array (first, third).",
    test({ returned }) {
      const { name, age, city, first, third } = returned || {};
      return [
        { pass: eq(name, "Bob"), message: "name should be 'Bob'." },
        { pass: eq(age, 25), message: "age should be 25." },
        { pass: eq(city, "Almaty"), message: "city should be 'Almaty'." },
        { pass: eq(first, 1), message: "first should be 1." },
        { pass: eq(third, 3), message: "third should be 3." },
      ];
    },
  },
  {
    id: "04-2",
    description:
      "Immutable object update: role->'admin' and address.city->'Astana' without mutating user.",
    test({ returned }) {
      const { user, updatedUser } = returned || {};
      if (!updatedUser) {
        return [
          {
            pass: false,
            message:
              "updatedUser is undefined. TODO: create an immutable updatedUser.",
          },
        ];
      }
      const checks = [
        {
          pass: eq(updatedUser.role, "admin"),
          message: "updatedUser.role should be 'admin'.",
        },
        {
          pass: eq(updatedUser.address?.city, "Astana"),
          message: "updatedUser.address.city should be 'Astana'.",
        },
        {
          pass: eq(user.role, "user"),
          message: "original user.role must remain 'user'.",
        },
        {
          pass: eq(user.address?.city, "Almaty"),
          message: "original user.address.city must remain 'Almaty'.",
        },
        {
          pass: user !== updatedUser,
          message:
            "updatedUser must be a different object reference than user.",
        },
        {
          pass: user.address !== updatedUser.address,
          message: "Nested address should also be a new object.",
        },
      ];
      return checks;
    },
  },
  {
    id: "04-3",
    description:
      "Immutable array updates: append 4 (moreNums) and remove first (withoutFirst) without mutating nums.",
    test({ returned }) {
      const { nums, moreNums, withoutFirst } = returned || {};
      if (!moreNums || !withoutFirst) {
        return [
          {
            pass: false,
            message:
              "moreNums/withoutFirst missing. TODO: build them immutably from nums.",
          },
        ];
      }
      return [
        {
          pass: deepEq(nums, [1, 2, 3]),
          message: "Original nums should remain [1,2,3].",
        },
        {
          pass: deepEq(moreNums, [1, 2, 3, 4]),
          message: "moreNums should be [1,2,3,4].",
        },
        {
          pass: deepEq(withoutFirst, [2, 3]),
          message: "withoutFirst should be [2,3].",
        },
        {
          pass: nums !== moreNums,
          message: "moreNums must be a new array (different reference).",
        },
        {
          pass: nums !== withoutFirst,
          message: "withoutFirst must be a new array (different reference).",
        },
      ];
    },
  },
  {
    id: "04-4",
    description: "Rest parameters: sum(1,2,3,4) should be 10.",
    test({ returned }) {
      const { sumResult } = returned || {};
      if (sumResult === undefined) {
        return [
          {
            pass: false,
            message: "sumResult is undefined. TODO: implement sum(...args).",
          },
        ];
      }
      return [{ pass: eq(sumResult, 10), message: "sumResult should be 10." }];
    },
  },
];
