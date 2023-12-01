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
        lookup[j] = { 0: 0, 1: 0 };
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

const powerConsumptionResult = calculatePowerFromReport(report);
console.log({ powerConsumptionResult });

function calculateGeneratorRating(arr, generatorType) {
  function countBits(rawArray, targetedIdx, operation) {
    let lookup = {
      0: 0,
      1: 0,
    };

    for (let i = 0; i < rawArray.length; i++) {
      const bit = rawArray[i].split("")[targetedIdx];
      lookup[bit]++;
    }

    if (operation === "o2") {
      return lookup["0"] > lookup["1"] ? "0" : "1";
    } else {
      return lookup["0"] <= lookup["1"] ? "0" : "1";
    }
  }

  let count = 0;
  function filterArray(arrayToFilter, operation) {
    let filtered = [];
    if (arrayToFilter.length === 1) {
      return arrayToFilter[0];
    }

    const filterCriteria = countBits(arrayToFilter, count, operation);
    filtered = arrayToFilter.filter((number) => {
      return number.split("")[count] === filterCriteria;
    });
    count++;
    return filterArray(filtered, operation);
  }

  return parseInt(filterArray(arr, generatorType), 2);
}
const oxygenGeneratorRating = calculateGeneratorRating(report, "o2");
const co2GeneratorRating = calculateGeneratorRating(report, "c02");

const lifeSupportRating = oxygenGeneratorRating * co2GeneratorRating;
console.log({ lifeSupportRating });
