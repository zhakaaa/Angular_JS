// Students edit this file ONLY
export function runStarter() {
  // 1) Default precedence/associativity (compute these)
  const base1 = 2 + 3 * 4; // TODO: keep as is
  const base2 = 100 / 10 / 2; // TODO: keep as is
  const base3 = 2 ** (3 ** 2); // TODO: keep as is

  console.log(base1);
  console.log(base2);
  console.log(base3);

  // 2) Override with parentheses (compute these)
  // const paren1 = (2 + 3) * 4;
  // const paren2 = 100 / (10 / 2);
  // const paren3 = (2 ** 3) ** 2;
  const paren1 = (2 + 3) * 4; // TODO
  const paren2 = 100 / (10 / 2); // TODO
  const paren3 = (2 ** 3) ** 2; // TODO

  console.log(paren1);
  console.log(paren2);
  console.log(paren3);

  return { base1, base2, base3, paren1, paren2, paren3 };
}
