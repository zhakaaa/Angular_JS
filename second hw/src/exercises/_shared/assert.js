export function assertEqual(actual, expected, message) {
  const pass = Object.is(actual, expected);
  return {
    pass,
    message: pass
      ? `✅ ${message}`
      : `❌ ${message}\n   expected: ${JSON.stringify(
          expected
        )}\n   actual:   ${JSON.stringify(actual)}`,
  };
}

export function assertDeepEqual(actual, expected, message) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  return {
    pass,
    message: pass
      ? `✅ ${message}`
      : `❌ ${message}\n   expected: ${JSON.stringify(
          expected
        )}\n   actual:   ${JSON.stringify(actual)}`,
  };
}

/** Check the console output order exactly. */
export function expectLogSequence(logs, expected, message) {
  const pass = JSON.stringify(logs) === JSON.stringify(expected);
  return {
    pass,
    message: pass
      ? `✅ ${message}`
      : `❌ ${message}\n   expected logs: ${JSON.stringify(
          expected
        )}\n   actual logs:   ${JSON.stringify(logs)}`,
  };
}
