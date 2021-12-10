const fs = require("fs");
const read = fs.readFileSync("puzzles/day-6/fish-age-data.txt");
let data = read.toString().split(",").map(Number);

function projectFishCount(data, days) {
  let schoolOfFish = [...data];

  function ageFish(ages) {
    let newFish = [];
    const newAges = ages.map((age) => {
      if (age === 0) {
        newFish.push(8);
        return 6;
      } else {
        return age - 1;
      }
    });
    schoolOfFish = [...newAges, ...newFish];
    return schoolOfFish;
  }

  for (let i = 0; i < days; i++) {
    ageFish(schoolOfFish);
  }

  return schoolOfFish.length;
}

const result = projectFishCount(data, 80);
console.log({ result });
