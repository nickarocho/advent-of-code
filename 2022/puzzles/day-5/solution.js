const fs = require("fs");
const read = fs.readFileSync("puzzles/day-6/fish-age-data.txt");
let data = read.toString().split(",").map(Number);

function projectFishCount(data, days) {
  const schoolOfFish = {};
  for (let i = 0; i < 9; i++) {
    schoolOfFish[i] = 0;
  }

  data.forEach((fishTimer) => {
    schoolOfFish[fishTimer]++;
  });

  function ageFish(fish) {
    // store this value before it shifts
    const todaysZeros = fish[0];
    for (let i = 0; i < 8; i++) {
      // adds a day by shifting count from yesterday
      fish[i] = fish[i + 1];
    }
    // today's new fish === one for every '0' from yesterday
    fish[8] = todaysZeros;
    // reset the cycle for the fish to reproduce again after 6 days
    fish[6] += todaysZeros;
  }

  for (let i = 0; i < days; i++) {
    ageFish(schoolOfFish);
  }

  return Object.values(schoolOfFish).reduce((acc, cur) => acc + cur, 0);
}

const result = projectFishCount(data, 256);
console.log({ result });
