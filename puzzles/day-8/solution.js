const fs = require("fs");
// const read = fs.readFileSync("puzzles/day-8/signal-notes.txt");
const read = fs.readFileSync("puzzles/day-8/signal-notes.txt");
let data = read
  .toString()
  .split("\n")
  .map((reading) => reading.split(" | "))
  .map((reading) => [reading[0].split(" "), reading[1].split(" ")]);

function decodeInput(data) {
  const groupedReadings = [...data];
  let sum = 0;

  // 1, 7, 4, 8
  // these digits have a unique number of segments, so we know the corresponding digit
  //         1:          4:
  //      ....        ....
  //     .    c      b    c
  //     .    c      b    c
  //      ....        dddd
  //     .    f      .    f
  //     .    f      .    f
  //      ....        ....

  //       7:          8:
  //      aaaa        aaaa
  //     .    c      b    c
  //     .    c      b    c
  //      ....        dddd
  //     .    f      e    f
  //     .    f      e    f
  //      ....        gggg
  const knownDigits = {
    2: 1,
    3: 7,
    4: 4,
    7: 8,
  };

  for (let [allDigits, displayDigits] of groupedReadings) {
    const map = {};

    // 2, 3, 5
    // these digits share segments, but can still be distinguished from eachother
    //     aaaa       aaaa       aaaa
    //    .    c     .    c     b    .
    //    .    c     .    c     b    .
    //     dddd       dddd       dddd
    //    e    .     .    f     .    f
    //    e    .     .    f     .    f
    //     gggg       gggg       gggg
    const fiveSegmentsLit = [];

    // 0, 6, 9
    // these have a unique segment missing so they are easy to identify
    //     aaaa       aaaa       aaaa
    //    b    c     b    .     b    c
    //    b    c     b    .     b    c
    //     ....       dddd       dddd
    //    e    f     e    f     .    f
    //    e    f     e    f     .    f
    //     gggg       gggg       gggg
    const sixSegmentsLit = [];

    const sortedDigit = (unsortedDigit) =>
      unsortedDigit.split("").sort().join("");

    // map the numbers we know, organize, and sort digits alphabetically for easier lookup
    for (const digit of allDigits) {
      if (knownDigits[digit.length]) {
        map[knownDigits[digit.length]] = sortedDigit(digit);
      } else if (digit.length === 5) {
        fiveSegmentsLit.push(sortedDigit(digit));
      } else {
        sixSegmentsLit.push(sortedDigit(digit));
      }
    }

    const satisfiesPredicate = (string, model, minToPass = "all") => {
      const testArr = model.split("");
      const letterIsPresent = (letter) => string.indexOf(letter) > -1;

      let result = false;
      if (minToPass === "all") {
        result = testArr.every(letterIsPresent);
      } else {
        result = testArr.filter(letterIsPresent).length >= minToPass;
      }
      return result;
    };

    for (const digit of fiveSegmentsLit) {
      let knownDigit = null;
      // [digit] === 3 if [digit] contains all letters in 1
      if (satisfiesPredicate(digit, map[1])) {
        knownDigit = 3;
        // [digit] === 5 if [digit] contains all letters in 4
      } else if (satisfiesPredicate(digit, map[4], 3)) {
        knownDigit = 5;
        // otherwise, [digit] === 2
      } else {
        knownDigit = 2;
      }
      map[knownDigit] = digit;
    }

    for (const digit of sixSegmentsLit) {
      let knownDigit = null;
      // [digit] === 9 if [digit] contains all letters in 4
      if (satisfiesPredicate(digit, map[4])) {
        knownDigit = 9;
        // [digit] === 0 if [digit] contains all letters in 1
      } else if (satisfiesPredicate(digit, map[1])) {
        knownDigit = 0;
        // otherwise, [digit] === 6
      } else {
        knownDigit = 6;
      }
      map[knownDigit] = digit;
    }

    const renderedDisplayValue = () => {
      const digitValues = Object.values(map);
      return Number(
        displayDigits
          .map((digit) => Number(digitValues.indexOf(sortedDigit(digit))))
          .join("")
      );
    };

    sum += renderedDisplayValue();
  }

  return sum;
}

const result = decodeInput(data);
console.log({ result });
