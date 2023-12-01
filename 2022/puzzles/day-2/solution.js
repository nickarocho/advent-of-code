import input from "./directions.js";

// 1st step, 1st idea - for loop/switch statement
function travel(directions) {
  let depth = 0;
  let horizontal = 0;
  let aim = 0;

  for (let i = 0; i < directions.length; i++) {
    const [direction, distanceStr] = directions[i].split(" ");
    const distanceInt = parseInt(distanceStr);
    switch (direction) {
      case "down":
        aim += distanceInt;
        break;
      case "up":
        aim -= distanceInt;
        break;
      case "forward":
        horizontal += distanceInt;
        depth += aim * distanceInt;
        break;
      default:
        console.log(`hmm... ${direction} isn't a valid direction`);
    }
  }
  return depth * horizontal;
}
const result = travel(input);
console.log({ result });
