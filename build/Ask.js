"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
class Ask {
    async ask() {
        const answers = await inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'apiKey',
                message: `What is your openai key?`
            },
            {
                type: 'list',
                name: 'openAiModel',
                choices: ['4', '3.5']
            },
            {
                type: 'input',
                name: 'inputFileName',
                message: `What is the full name of the txt file?`,
            },
            {
                type: 'input',
                name: 'prompt',
                message: `What is the prompt you would like to give to openai with this file?
`,
            },
        ]);
        console.log('Here are the answers you gave: ', JSON.stringify(answers, null, 2));
        const confirm = await inquirer_1.default.prompt([
            {
                type: 'confirm',
                name: 'confirm',
                message: 'Press Y and enter to continue, or N and enter to cancel',
                default: false
            }
        ]);
        if (!confirm.confirm) {
            console.log('EXIT');
            process.exit();
        }
        return answers;
    }
}
exports.default = new Ask();
