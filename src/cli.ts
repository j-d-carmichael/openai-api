import path from 'path';
import * as fs from 'fs';
import OpenAiService from './OpenAiService';
import { createSpinner, Spinner } from 'nanospinner';
import Ask from '@/Ask';

let spinner: Spinner;

const run = async () => {
  const answers = await Ask.start();

  const inputFilePath = path.join(process.cwd(), answers.inputFileName);

  const outputFilePath = path.join(process.cwd(), answers.inputFileName + '.gptoutput.txt');

  const data = fs.readFileSync(inputFilePath).toString('utf-8');

  const prompt = `
${answers.prompt}: 

${data}
`;

  spinner = createSpinner('Sending request to GPT...').start();

  let count = 1;
  const intervalUpdater = setInterval(() => {
    spinner.update({
      text: 'Sending request to GPT... ' + count + ' seconds passed.'
    });
    ++count;
  }, 1000);

  const output = await OpenAiService.outputFromPrompt({
    apiKey: answers.apiKey,
    openaiModel: answers.openAiModel,
    prompt,
  });

  clearInterval(intervalUpdater);

  spinner.success();

  fs.writeFileSync(outputFilePath, output.choices[0].message.content);

  console.log(`
The output has been written to ${outputFilePath}.
`);
};

run().catch((err) => {
  spinner.error({ text: 'Something went wrong.' });
  console.error(err.message);
});
