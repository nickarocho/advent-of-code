const fs = require("fs");
const read = fs.readFileSync("puzzles/day-8/signal-notes.txt");
let data = read
  .toString()
  .split("\n")
  .map((reading) => reading.split(" | "))
  .map((reading) => [reading[0].split(" "), reading[1].split(" ")]);

function decodeInput(data) {
  let sum = 0;
  const knownDigits = {
    2: 1,
    3: 7,
    4: 4,
    7: 8,
  };

  // util fns
  const sortDigit = (unsortedDigit) => unsortedDigit.split("").sort().join("");

  const satisfiesPredicate = (string, model, minToPass = "all") => {
    const testArr = model.split("");
    const letterIsPresent = (letter) => string.indexOf(letter) > -1;
    return minToPass === "all"
      ? testArr.every(letterIsPresent)
      : testArr.filter(letterIsPresent).length >= minToPass;
  };

  const renderedDisplayValue = (valueMap, encodedDisplays) => {
    const digitValues = Object.values(valueMap);
    return Number(
      encodedDisplays
        .map((digit) => Number(digitValues.indexOf(sortDigit(digit))))
        .join("")
    );
  };

  // decoding
  for (let [allDigits, displayDigits] of data) {
    const map = {};
    const fiveSegmentsLit = [];
    const sixSegmentsLit = [];

    // map the numbers we know, organize and sort (alphabetically) the ones we don't
    for (const digit of allDigits) {
      if (knownDigits[digit.length]) {
        map[knownDigits[digit.length]] = sortDigit(digit);
      } else if (digit.length === 5) {
        fiveSegmentsLit.push(sortDigit(digit));
      } else {
        sixSegmentsLit.push(sortDigit(digit));
      }
    }

    for (const digit of fiveSegmentsLit) {
      let knownDigit = null;
      if (satisfiesPredicate(digit, map[1])) {
        knownDigit = 3;
      } else if (satisfiesPredicate(digit, map[4], 3)) {
        knownDigit = 5;
      } else {
        knownDigit = 2;
      }
      map[knownDigit] = digit;
    }

    for (const digit of sixSegmentsLit) {
      let knownDigit = null;
      if (satisfiesPredicate(digit, map[4])) {
        knownDigit = 9;
      } else if (satisfiesPredicate(digit, map[1])) {
        knownDigit = 0;
      } else {
        knownDigit = 6;
      }
      map[knownDigit] = digit;
    }

    sum += renderedDisplayValue(map, displayDigits);
  }

  return sum;
}

const result = decodeInput(data);
console.log({ result });
