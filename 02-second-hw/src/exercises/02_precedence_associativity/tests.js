import { expectLogSequence } from "../_shared/assert.js";

export const checkpoints = [
  {
    id: "02-1",
    description: "Default precedence/associativity",
    run({ logs }) {
      const want = ["14", "5", "512"];
      return expectLogSequence(
        logs.slice(0, 3),
        want,
        "First three logs are correct."
      );
    },
  },
  {
    id: "02-2",
    description: "Parentheses override",
    run({ logs }) {
      const want = ["20", "20", "64"];
      return expectLogSequence(
        logs.slice(3, 6),
        want,
        "Parenthesized results match."
      );
    },
  },
];
