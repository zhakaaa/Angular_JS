// Students edit this file ONLY
export function runStarter() {
  let a = 10;
  let b = a;
  b = 20;
  console.log("a:", a, "b:", b);

  const arr1 = [1];
  const arr2 = arr1;
  arr2.push(2);
  console.log("arr1:", arr1, "arr2:", arr2);

  // TODO: create arr3 immutably by adding 3 without mutating arr2

  const arr3 = [...arr2, 3];
  console.log("arr2:", arr2, "arr3:", arr3);

  return { a, b, arr1, arr2, arr3 };
}
