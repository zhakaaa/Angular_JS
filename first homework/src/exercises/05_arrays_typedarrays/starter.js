// Students edit this file ONLY
export function runStarter() {
  // ----- Arrays -----
  const arr = [10, 20, 30];

  // 1) Use indexOf to find the index of 20 in arr
  // const idx20 = arr.indexOf(20);
  const idx20 = arr.indexOf(20); // TODO

  // 2) Append 40 using push (mutates the same array)
  // arr.push(40);
  // const arrAfterPush = arr;
  arr.push(40);
  const arrAfterPush = arr; // TODO

  // ----- Typed Arrays (Int8: -128..127) -----
  // const ta = new Int8Array([127, 128, -129, 0]); // -> [127, -128, 127, 0]
  const ta = new Int8Array([127, 128, -129, 0]); // TODO

  // ----- ArrayBuffer + DataView (bonus) -----
  // const buf = new ArrayBuffer(4);
  // const view = new DataView(buf);
  // view.setInt8(0, 127);
  // view.setInt8(1, -128);
  // view.setInt8(2, -1);
  // view.setInt8(3, 0);
  // const dataViewBytes = [
  //   view.getInt8(0),
  //   view.getInt8(1),
  //   view.getInt8(2),
  //   view.getInt8(3)
  // ];
  const buf = new ArrayBuffer(4);
  const view = new DataView(buf);
  view.setInt8(0, 127);
  view.setInt8(1, -128);
  view.setInt8(2, -1);
  view.setInt8(3, 0);

  const dataViewBytes = [
    view.getInt8(0),
    view.getInt8(1),
    view.getInt8(2),
    view.getInt8(3),
  ]; // TODO

  // Optional logs for visibility
  console.log("idx20:", idx20);
  console.log("arrAfterPush:", arrAfterPush);
  console.log("ta:", ta);
  console.log("dataViewBytes:", dataViewBytes);

  return { idx20, arrAfterPush, ta, dataViewBytes };
}
