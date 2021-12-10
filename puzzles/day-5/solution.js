const fs = require('fs');
const read = fs.readFileSync('puzzles/day-5/segment-data.txt')
let data= read.toString().split("\n").map(row => {
  return row.split(' -> ').map(pos => pos.split(',').map(Number))
});

function findOverlaps(data) {
  let map = {};
  for (const [[startX, startY], [endX, endY]] of data) {
    const xCoords = [Math.min(startX, endX), Math.max(startX, endX)];
    const yCoords = [Math.min(startY, endY), Math.max(startY, endY)];
    
    if (startX === endX || startY === endY) {
      for (let x = xCoords[0]; x <= xCoords[1]; x++) {
        for (let y = yCoords[0]; y <= yCoords[1]; y++) {
          const key = `${x}-${y}`;
          map[key] = map[key] ? map[key] += 1 : 1;
        }
      }
    }
  }
  
  let overlaps = 0;
  Object.values(map).forEach(val => {
    if (val > 1) overlaps += 1;
  });

  return overlaps;
}

const part1result = findOverlaps(data)
console.log({part1result});
