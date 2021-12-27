const fs = require("fs");
const read = fs.readFileSync("puzzles/day-10/navsubsystem.txt");
let data = read
  .toString()
  .split("\n")
  .map((line) => line.split(""));

// lookups
const pairs = {
  "[": "]",
  "{": "}",
  "(": ")",
  "<": ">",
};
const syntaxValues = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

// utils
const getMatchingOpeningTag = (closingTag) =>
  Object.keys(pairs).find((key) => pairs[key] === closingTag);

const getSyntaxErrorValue = (corruptLine) => {
  const corruptChar = corruptLine.find((char) => syntaxValues[char]);
  return syntaxValues[corruptChar];
};

// main util which recursively removes 'complete' chunks
function simplifyLine(line) {
  let length = null;

  function removeCleanChunks(arr) {
    // recursive base case
    if (!arr || length === arr.length) {
      const isJustIncomplete = arr.every((char) => pairs[char]);
      return { line, isCorrupt: !isJustIncomplete };
    }

    length = arr.length;

    for (let i = 0; i < arr.length; i++) {
      const char = arr[i];
      let matchingClosingTag = pairs[char];

      // it IS a closing tag
      if (!matchingClosingTag) {
        if (arr[i - 1] === getMatchingOpeningTag(char)) {
          // remove (), {}, <>, [], etc. from the line
          arr.splice(i - 1, 2);
        }
      }
    }

    // keep removing pairs until none left
    return removeCleanChunks(arr);
  }

  return removeCleanChunks(line);
}

function calculateSyntaxErrorScore(data) {
  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    const simplifiedLine = simplifyLine(data[i]);
    const syntaxScore = simplifiedLine.isCorrupt
      ? getSyntaxErrorValue(simplifiedLine.line)
      : 0;

    sum += syntaxScore;
  }

  return sum;
}

const partOne = calculateSyntaxErrorScore(data); // 411471
console.log({ partOne });
