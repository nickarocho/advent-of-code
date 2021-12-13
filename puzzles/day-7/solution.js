const fs = require("fs");
const read = fs.readFileSync("puzzles/day-7/crab-positions.txt");
let data = read.toString().split(",").map(Number);

function alignCrabs(data) {
  let sorted = data.sort((a, b) => a - b);
  let currentBestGasMileage = undefined;

  for (
    let potentialPosition = 0;
    potentialPosition <= sorted[sorted.length - 1];
    potentialPosition++
  ) {
    // 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16
    let total = 0;
    for (let j = 0; j < sorted.length; j++) {
      const distance = Math.abs(sorted[j] - potentialPosition);
      total += distance;
    }

    if (total < currentBestGasMileage || currentBestGasMileage === undefined) {
      currentBestGasMileage = total;
    }
  }
  return currentBestGasMileage;
}

const optimalHorizontalPosition = alignCrabs(data);
console.log({ optimalHorizontalPosition });
