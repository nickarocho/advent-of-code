const fs = require("fs");
const read = fs.readFileSync("puzzles/day-7/crab-positions.txt");
let data = read.toString().split(",").map(Number);

function alignCrabs(data) {
  let sortedPositions = data.sort((a, b) => a - b);
  let currentBest = Infinity;

  // loop through all the potential positions (smallest -> largest in sorted data set)
  for (
    let i = sortedPositions[0];
    i <= sortedPositions[sortedPositions.length - 1];
    i++
  ) {
    // calculate the cost per crab at each (i) position (1 space === 1 'gas' unit)
    const gasCostPerCrab = sortedPositions.map((position) =>
      Math.abs(i - position)
    );
    const combinedGasCost = gasCostPerCrab.reduce((acc, cur) => acc + cur, 0);

    // take the best so far
    currentBest = Math.min(currentBest, combinedGasCost);
  }

  return currentBest;
}

const optimalHorizontalPosition = alignCrabs(data); // 341534
console.log({ optimalHorizontalPosition });
