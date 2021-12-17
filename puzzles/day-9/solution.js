const fs = require("fs");
const read = fs.readFileSync("puzzles/day-9/heightmap.txt");
let data = read
  .toString()
  .split("\n")
  .map((string) => string.split("").map((reading) => Number(reading)));

function findLowPoints(data) {
  let lowPoints = [];

  for (let i = 0; i < data.length; i++) {
    const rowAbove = data[i - 1];
    const row = data[i];
    const rowBelow = data[i + 1];

    for (let j = 0; j < row.length; j++) {
      const cell = row[j];
      const right = row[j + 1] ?? Infinity;
      const left = row[j - 1] ?? Infinity;
      const top = (rowAbove && rowAbove[j]) ?? Infinity;
      const bottom = (rowBelow && rowBelow[j]) ?? Infinity;

      if (cell < right && cell < left && cell < top && cell < bottom) {
        lowPoints.push(cell);
      }
    }
  }

  return lowPoints.reduce((acc, cur) => acc + (cur + 1), 0);
}

const result = findLowPoints(data);
console.log({ result });
