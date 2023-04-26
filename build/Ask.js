"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const Settings_1 = tslib_1.__importDefault(require("./Settings"));
class Ask {
    async start() {
        const settings = Settings_1.default.getSettings();
        const data = {
            apiKey: null,
            prompt: null,
            inputFileName: null,
            openAiModel: null
        };
        // get the api key
        if (settings.apiKey) {
            const { confirm } = await inquirer_1.default.prompt([
                {
                    type: 'confirm',
                    name: 'confirm',
                    message: `Use this key again ${settings.apiKey}?`,
                    default: false
                }
            ]);
            if (confirm) {
                data.apiKey = settings.apiKey;
            }
        }
        if (!data.apiKey) {
            const { apiKey } = await inquirer_1.default.prompt([
                {
                    type: 'input',
                    name: 'apiKey',
                    message: `What is your openai key?`
                },
            ]);
            data.apiKey = apiKey;
        }
        // get the api model
        if (settings.openAiModel) {
            const { confirm } = await inquirer_1.default.prompt([
                {
                    type: 'confirm',
                    name: 'confirm',
                    message: `Use this key ai model again ${settings.openAiModel}?`,
                    default: false
                }
            ]);
            if (confirm) {
                data.openAiModel = settings.openAiModel;
            }
        }
        if (!data.openAiModel) {
            const { openAiModel } = await inquirer_1.default.prompt([
                {
                    type: 'list',
                    name: 'openAiModel',
                    choices: ['4', '3.5']
                },
            ]);
            data.openAiModel = openAiModel;
        }
        // show prompt history to select from or write new
        let prompts = settings.prompts;
        if (settings.prompts.length) {
            const { prompt } = await inquirer_1.default.prompt([
                {
                    type: 'list',
                    name: 'prompt',
                    choices: [
                        'Write new prompt',
                        ...settings.prompts
                    ]
                },
            ]);
            data.prompt = prompt;
        }
        if (!data.prompt || data.prompt === 'Write new prompt') {
            if (data.prompt === 'Write new prompt') {
                console.log('Here are the last 10 prompts you used:');
                settings.prompts.forEach((prompt, index) => {
                    console.log(`${index + 1} - ${prompt}`);
                });
            }
            const { prompt } = await inquirer_1.default.prompt([
                {
                    type: 'input',
                    name: 'prompt',
                    message: `What is the prompt you would like to give to openai with this file?
`,
                },
            ]);
            data.prompt = prompt;
            prompts.unshift(data.prompt);
        }
        const { inputFileName } = await inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'inputFileName',
                message: `What is the full name of the txt file?`,
            },
        ]);
        data.inputFileName = inputFileName;
        console.log('Here are the answers you gave: ', JSON.stringify(data, null, 2));
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
        Settings_1.default.setSettings({
            apiKey: data.apiKey,
            openAiModel: data.openAiModel,
            prompts: prompts.slice(0, 10)
        });
        return data;
    }
}
exports.default = new Ask();
