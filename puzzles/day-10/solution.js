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
let incompleteLines = [];

// utils
const getMatchingOpeningTag = (closingTag) =>
  Object.keys(pairs).find((key) => pairs[key] === closingTag);

const getSyntaxErrorValue = (corruptLine) => {
  const corruptChar = corruptLine.find((char) => syntaxValues[char]);
  return syntaxValues[corruptChar];
};

const getCompletionChars = (openingChars) =>
  openingChars.map((openingChar) => pairs[openingChar]).reverse();

// main util which recursively removes 'complete' chunks
function simplifyLine(originalLine) {
  const line = [...originalLine];
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

    if (!simplifiedLine.isCorrupt) {
      incompleteLines.push(simplifiedLine.line);
    }
  }

  return sum;
}

function getMiddleCompletionStringScore(lines) {
  const closingTags = Object.keys(syntaxValues);
  const completionScores = [];

  for (let i = 0; i < lines.length; i++) {
    const completionChars = getCompletionChars(lines[i]);

    const score = completionChars.reduce((acc, cur) => {
      const score = closingTags.indexOf(cur) + 1;
      return acc * 5 + score;
    }, 0);

    completionScores.push(score);
  }

  const sortedScores = completionScores.sort((a, b) => a - b);
  return sortedScores[Math.floor(sortedScores.length / 2)];
}

const partOne = calculateSyntaxErrorScore(data);
console.log({ partOne });

const partTwo = getMiddleCompletionStringScore(incompleteLines);
console.log({ partTwo });
