import path from 'path';
import * as fs from 'fs';
import OpenAiService from './OpenAiService';
import { createSpinner, Spinner } from 'nanospinner';
import Ask from '@/Ask';
import calculateOutputFilePath from '@/calculateOutputFilePath';
import yyyymmdd from '@/yyyymmdd';

let spinner: Spinner;

// eslint-disable-next-line max-lines-per-function
const run = async () => {
  spinner = createSpinner('Sending request to GPT...');
  const answers = await Ask.start();

  const inputFilePath = path.join(process.cwd(), answers.inputFileName);

  let data = '';
  let outputFilePath;

  if (answers.inputFileName.length) {
    outputFilePath = calculateOutputFilePath(answers.inputFileName);
    data = fs.readFileSync(inputFilePath).toString('utf-8');
  } else if (answers.outputToFileWithNoInputFile) {
    outputFilePath = calculateOutputFilePath(`${yyyymmdd()}_${answers.prompt.substring(0, 20)}.txt`);
  }
  const prompt = `${answers.prompt}: 

${data}`;

  spinner.start();

  let count = 1;
  const intervalUpdater = setInterval(() => {
    spinner.update({ text: 'Sending request to GPT... ' + count + ' seconds passed.' });
    ++count;
  }, 1000);

  const output = await OpenAiService.outputFromPrompt({
    apiKey: answers.apiKey,
    openaiModel: answers.openAiModel,
    prompt
  });

  clearInterval(intervalUpdater);

  spinner.success();

  console.log('Here is the output:');
  console.log('');
  console.log('');
  console.log(output.choices[0].message.content);

  if (outputFilePath && outputFilePath.length) {
    fs.writeFileSync(outputFilePath, output.choices[0].message.content);
    console.log('');
    console.log('');
    console.log('');
    console.log('=======================================================');
    console.log('');
    console.log(`The output has also been written to disk at: ${outputFilePath}.`);
    console.log('');
    console.log('=======================================================');
  }
};

run().catch((err) => console.error('ERROR: ', err.message));
