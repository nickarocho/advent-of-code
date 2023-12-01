import * as path from "path";
import * as fs from "fs";
import { execSync } from "child_process";

const year = process.argv[2];
const month = process.argv[3];

if (!year || !month) {
  console.error("Please provide both year and month as arguments.");
  process.exit(1);
}

const solutionPath = path.join(__dirname, year, month, "solution.ts");
const inputPath = path.join(__dirname, year, month, "input.txt");

if (!fs.existsSync(solutionPath) || !fs.existsSync(inputPath)) {
  console.error(
    "Solution or input file not found for the specified year and month."
  );
  process.exit(1);
}

// Function to compile and execute the solution
const executeSolution = () => {
  // Compile TypeScript file
  execSync(`npx tsc ${solutionPath}`, { stdio: "inherit" });

  // Dynamically import and execute the solution
  const solutionModule = require(solutionPath);
  const inputData = fs.readFileSync(inputPath, "utf-8").trim();

  console.clear();
  // console.log("Input:");
  // console.log(inputData);

  console.log("\nOutput:");
  solutionModule.solve(inputData); // Assuming your solution exports a function named "solve"
  console.log("\n");
};

// Initial execution
executeSolution();

// Watch for changes in solution.ts and input.txt
const filesToWatch = [solutionPath, inputPath];
filesToWatch.forEach((file) => {
  fs.watchFile(file, { interval: 1000 }, () => {
    console.log(`\nChanges detected in ${file}. Reloading...`);
    executeSolution();
  });
});

console.log("Watching for changes...", { solutionPath, inputPath });
