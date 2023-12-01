import inputData from "./input-data.js";

// 1st step, 1st idea - plain old for loop/incrementor
function countIncreases(nums) {
  let increases = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) increases += 1;
  }
  return increases;
}
const countIncreasesResult = countIncreases(inputData);
console.log({ countIncreasesResult });

// 1st step, 2nd idea - Array.prototype.reduce
const countIncreasesReduceResult = inputData.reduce(
  (acc, cur, i) => (inputData[i] > inputData[i - 1] ? (acc += 1) : acc),
  0
);
console.log({ countIncreasesReduceResult });

// 2nd step (sliding window), 1st idea - for loop
function slidingWindow(nums) {
  let increases = 0;
  for (let i = 0; i < nums.length - 2; i++) {
    const windowSumA = nums[i] + nums[i + 1] + nums[i + 2];
    const windowSumB = nums[i + 1] + nums[i + 2] + nums[i + 3];
    if (windowSumB > windowSumA) increases++;
  }
  return increases;
}

const slidingWindowResult = slidingWindow(inputData);
console.log({ slidingWindowResult });

// 2nd step (sliding window), 2nd idea - array destructuring, reducer, etc.
function slidingWindowReduce(nums) {
  let increases = 0;
  const reducer = (acc, prev) => acc + prev;
  for (let i = 0; i < nums.length - 2; i++) {
    const [windowA, windowB] = [nums.slice(i, i + 3), nums.slice(i + 1, i + 4)];
    if (windowB.reduce(reducer, 0) > windowA.reduce(reducer, 0)) increases++;
  }
  return increases;
}

const slidingWindowReduceResult = slidingWindowReduce(inputData);
console.log({ slidingWindowReduceResult });

// 2nd step (sliding window), 3rd idea - reduce in line
const fancyPantsAnswer = inputData.reduce((acc, cur, i, arr) => {
  const [windowA, windowB] = [arr.slice(i, i + 3), arr.slice(i + 1, i + 4)];
  const reducer = (a, b) => a + b;
  if (windowB.reduce(reducer, 0) > windowA.reduce(reducer, 0)) {
    return (acc += 1);
  } else {
    return acc;
  }
}, 0);
console.log({ fancyPantsAnswer });
