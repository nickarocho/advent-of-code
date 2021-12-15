const fs = require("fs");
const read = fs.readFileSync("puzzles/day-8/signal-notes.txt");
let data = read
  .toString()
  .split("\n")
  .map((reading) => reading.split(" | "));

function decodeInput(data, part = 1) {
  let groupedReadings = [...data];
  let uniqueSegmentCount = 0;

  if (part === 1) {
    groupedReadings = data.map((readingArr) => readingArr[1]);
  }

  groupedReadings.forEach((digitArr) => {
    const uniqueCountDigits = digitArr.split(" ").filter(
      (digit) =>
        digit.length === 2 || // 1
        digit.length === 4 || // 4
        digit.length === 3 || // 7
        digit.length === 7 // 8
    );
    uniqueSegmentCount += uniqueCountDigits.length;
  });

  return uniqueSegmentCount;
}

const result = decodeInput(data);
console.log({ result });
