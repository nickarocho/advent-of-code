const fs = require("fs");
const read = fs.readFileSync("puzzles/day-11/octopusenergylevels.txt");
const data = read
  .toString()
  .split("\n")
  .map((row) => row.split("").map(Number));

let flashed = [];
let sum = 0;

// clones an array of arrays to avoid mutating original data
const deepClone = (arrOfArrs) => arrOfArrs.map((arr) => arr.slice());

class Octo {
  constructor(level, row, col, map) {
    this.energyLevel = level;
    this.map = map;
    this.row = row;
    this.col = col;
    this.key = [row, col].join("");
  }

  getAdjacentOctos() {
    const adjacent = [];

    const rowAbove = this.map[this.row - 1] ?? null;
    const rowBelow = this.map[this.row + 1] ?? null;

    const left = this.map[this.row][this.col - 1] ?? null;
    const right = this.map[this.row][this.col + 1] ?? null;
    const top = rowAbove ? rowAbove[this.col] ?? null : null;
    const bottom = rowBelow ? rowBelow[this.col] ?? null : null;
    const topLeft = rowAbove ? rowAbove[this.col - 1] ?? null : null;
    const topRight = rowAbove ? rowAbove[this.col + 1] ?? null : null;
    const bottomLeft = rowBelow ? rowBelow[this.col - 1] ?? null : null;
    const bottomRight = rowBelow ? rowBelow[this.col + 1] ?? null : null;

    adjacent.push(
      left,
      right,
      top,
      bottom,
      topLeft,
      topRight,
      bottomLeft,
      bottomRight
    );

    return adjacent;
  }

  flash(coordsKey, adjacentOctos) {
    // octos can only flash once per step
    if (!flashed.includes(coordsKey)) {
      flashed.push(coordsKey);
      this.energyLevel = 0;

      adjacentOctos.forEach((octo) => {
        if (octo === null) return;
        if (octo.energyLevel === 9) {
          octo.flash(octo.key, octo.getAdjacentOctos());
        } else {
          octo.step();
        }
      });
    }
  }

  step() {
    if (this.energyLevel === 9) {
      this.flash(this.key, this.getAdjacentOctos());
    } else if (!flashed.includes(this.key)) {
      this.energyLevel += 1;
    }
  }
}

function initOctos(map) {
  for (let row = 0; row < map.length; row++) {
    const thisRow = map[row];
    for (let col = 0; col < thisRow.length; col++) {
      thisRow[col] = new Octo(thisRow[col], row, col, map);
    }
  }
  return map;
}

function step(map) {
  map.forEach((row) =>
    row.forEach((octo) => {
      octo.step();
    })
  );
}

function runStep(map) {
  flashed = [];
  step(map);
  sum += flashed.length;
}

function countFlashes(energyMap, steps) {
  const dataCopy = deepClone(energyMap);
  const octoMap = initOctos(dataCopy);

  for (let i = 1; i <= steps; i++) {
    runStep(octoMap);
  }

  return sum;
}

const syncronizedMoment = (energyMap) => {
  const dataCopy = deepClone(energyMap);
  const octoMap = initOctos(dataCopy);
  const octoCount = dataCopy.reduce((acc, row) => acc + row.length, 0);

  let syncedAt = null;
  let step = 0;
  while (!syncedAt) {
    step++;
    runStep(octoMap);
    if (flashed.length === octoCount) syncedAt = step;
  }

  return syncedAt;
};

// run it
const partOne = countFlashes(data, 100);
console.log({ partOne });
const partTwo = syncronizedMoment(data);
console.log({ partTwo });
