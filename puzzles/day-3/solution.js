import report from "./report.js";

function calculatePowerFromReport(arr) {
  let gamma = ""; // most common bits
  let epsilon = ""; // least common bits

  let lookup = [];

  for (let i = 0; i < arr.length; i++) {
    const binaryArr = arr[i].split("");
    for (let j = 0; j < binaryArr.length; j++) {
      const digit = binaryArr[j];
      if (lookup[j]) {
        if (lookup[j][digit]) {
          lookup[j][digit]++;
        } else {
          lookup[j][digit] = 1;
        }
      } else {
        lookup[j] = { 0: 0, 1: 1 };
      }
    }
  }

  for (var i in lookup) {
    if (lookup[i]["0"] > lookup[i]["1"]) {
      gamma += "0";
      epsilon += "1";
    } else {
      gamma += "1";
      epsilon += "0";
    }
  }
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}
const result = calculatePowerFromReport(report);
console.log({ result });
