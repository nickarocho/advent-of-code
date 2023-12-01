import * as fs from "fs";
import * as path from "path";

// Utility function to read the input file and return its content as a string
export function readInputFile(directory: string): string {
  console.log({ directory });
  const inputFilePath = path.join(directory, "input.txt");
  try {
    return fs.readFileSync(inputFilePath, "utf-8");
  } catch (err) {
    console.error(`Error reading the file: ${err}`);
    process.exit(1); // Exit the program if there's an error reading the file
  }
}

// Utility function to create an absolute path from a given path
export function resolvePath(inputPath: string): string {
  console.log({ inputPath });
  return path.isAbsolute(inputPath)
    ? inputPath
    : path.join(process.cwd(), inputPath);
}

// Utility function to get the input data from a directory path
export function getInputData(directory: string): string {
  const inputFilePath = resolvePath(directory);
  console.log({ inputFilePath });
  return readInputFile(inputFilePath);
}
