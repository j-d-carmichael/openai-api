"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs = tslib_1.__importStar(require("fs"));
const OpenAiService_1 = tslib_1.__importDefault(require("./OpenAiService"));
const nanospinner_1 = require("nanospinner");
const Ask_1 = tslib_1.__importDefault(require("./Ask"));
const calculateOutputFilePath_1 = tslib_1.__importDefault(require("./calculateOutputFilePath"));
const yyyymmdd_1 = tslib_1.__importDefault(require("./yyyymmdd"));
let spinner;
// eslint-disable-next-line max-lines-per-function
const run = async () => {
    spinner = (0, nanospinner_1.createSpinner)('Sending request to GPT...');
    const answers = await Ask_1.default.start();
    const inputFilePath = path_1.default.join(process.cwd(), answers.inputFileName);
    let data = '';
    let outputFilePath;
    if (answers.inputFileName.length) {
        outputFilePath = (0, calculateOutputFilePath_1.default)(answers.inputFileName);
        data = fs.readFileSync(inputFilePath).toString('utf-8');
    }
    else if (answers.outputToFileWithNoInputFile) {
        outputFilePath = (0, calculateOutputFilePath_1.default)(`${(0, yyyymmdd_1.default)()}_${answers.prompt.substring(0, 20)}.txt`);
    }
    const prompt = `${answers.prompt}: 

${data}`;
    spinner.start();
    let count = 1;
    const intervalUpdater = setInterval(() => {
        spinner.update({ text: 'Sending request to GPT... ' + count + ' seconds passed.' });
        ++count;
    }, 1000);
    const output = await OpenAiService_1.default.outputFromPrompt({
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
