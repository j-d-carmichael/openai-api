import path from 'path';
import { pathExistsSync } from 'fs-extra';

const calculateOutputFilePath = (inputFileName: string, number?: number): string => {
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
  return calculateOutputFilePath(inputFileName, number);
};

export default calculateOutputFilePath;
