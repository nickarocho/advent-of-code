const fs = require("fs");
const read = fs.readFileSync("puzzles/day-5/segment-data.txt");
let data = read
  .toString()
  .split("\n")
  .map((row) => {
    return row.split(" -> ").map((pos) => pos.split(",").map(Number));
  });

function findOverlaps(data) {
  let map = {};
  for (let [[startX, startY], [endX, endY]] of data) {
    const xCoords = [Math.min(startX, endX), Math.max(startX, endX)];
    const yCoords = [Math.min(startY, endY), Math.max(startY, endY)];

    if (startX === endX || startY === endY) {
      // horizontal && vertical lines
      for (let x = xCoords[0]; x <= xCoords[1]; x++) {
        for (let y = yCoords[0]; y <= yCoords[1]; y++) {
          const key = `${x}-${y}`;
          map[key] = map[key] ? (map[key] += 1) : 1;
        }
      }
    } else {
      // diagonal lines
      // flips "backwards" coordinates... helps me think about these all the same way, though it shouldn't matter
      const [firstPoint, secondPoint] =
        startX < endX
          ? [
              [startX, startY],
              [endX, endY],
            ]
          : [
              [endX, endY],
              [startX, startY],
            ];
      const direction = firstPoint[1] > secondPoint[1] ? "up" : "down";

      let y = firstPoint[1];
      for (let x = xCoords[0]; x <= xCoords[1]; x++) {
        const key = `${x}-${y}`;
        y = direction === "down" ? (y += 1) : (y -= 1);
        map[key] = map[key] ? (map[key] += 1) : 1;
      }
    }
  }

  let overlaps = 0;
  Object.values(map).forEach((val) => {
    if (val > 1) overlaps += 1;
  });

  return overlaps;
}

const overlaps = findOverlaps(data);
console.log({ overlaps });
