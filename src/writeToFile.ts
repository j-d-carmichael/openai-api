import path from 'path';
import { pathExistsSync } from 'fs-extra';

const writeToFile = (inputFileName: string, number?: number): string => {
  const outputFilePath = path.join(
    process.cwd(),
    `${inputFileName}.gptoutput${number ? '(' + number + ')' : ''}.txt`
  );

  if (!pathExistsSync(outputFilePath)) {
    return outputFilePath;
  }
  if (number) {
    ++number;
  } else {
    number = 1;
  }
  return writeToFile(inputFileName, number);
};

export default writeToFile;
