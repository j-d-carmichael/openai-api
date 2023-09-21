import Settings from '@/Settings';

interface IStart {
  openAiModel: '3.5' | '4',
  inputFileName: string,
  outputToFileWithNoInputFile: boolean,
  prompt: string,
  apiKey: string
}

class Ask {
  // eslint-disable-next-line max-lines-per-function
  async start (): Promise<IStart> {
    const inquirer = (await import('inquirer')).default;

    const settings = Settings.getSettings();

    const data: IStart = {
      apiKey: null,
      prompt: null,
      inputFileName: null,
      outputToFileWithNoInputFile: false,
      openAiModel: null
    };

    // get the api key
    if (settings.apiKey) {
      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: `This api key was used last time "${settings.apiKey}" us it again?`,
          default: true
        }
      ]);
      if (confirm) {
        data.apiKey = settings.apiKey;
      }
    }
    if (!data.apiKey) {
      const { apiKey } = await inquirer.prompt([
        {
          type: 'input',
          name: 'apiKey',
          message: 'What is your openai key?'
        }
      ]);
      data.apiKey = apiKey;
    }

    // Start: get the api model
    if (settings.openAiModel) {
      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: `This AI model was used last time "${settings.openAiModel}", use it again?`,
          default: true
        }
      ]);
      if (confirm) {
        data.openAiModel = settings.openAiModel;
      }
    }
    if (!data.openAiModel) {
      const { openAiModel } = await inquirer.prompt([
        {
          type: 'list',
          name: 'openAiModel',
          choices: ['4', '3.5']
        }
      ]);
      data.openAiModel = openAiModel;
    }
    // End: get the api model


    // Start: get the file name to read
    if (settings.inputFileName) {
      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: `This was the last file you user, "${settings.inputFileName}", use it again?`,
          default: true
        }
      ]);
      if (confirm) {
        data.inputFileName = settings.inputFileName;
      }
    }
    if (!data.inputFileName) {
      const { inputFileName } = await inquirer.prompt([
        {
          type: 'input',
          name: 'inputFileName',
          message: 'Name of the input file? (Leave empty a command only without a file input)'
        }
      ]);
      data.inputFileName = inputFileName;
    }
    // End: get the file name to read

    // Start: decide to output to file or not
    if (!data.inputFileName) {
      const { outputToFile } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'outputToFile',
          message: 'No input file, output the reply to a file?',
          default: false
        }
      ]);
      data.outputToFileWithNoInputFile = outputToFile;
    }

    // Start: show prompt history to select from or write new
    const prompts = settings.prompts;
    if (settings.prompts.length) {
      const { prompt } = await inquirer.prompt([
        {
          type: 'list',
          name: 'prompt',
          choices: [
            'Write new prompt',
            ...settings.prompts
          ]
        }
      ]);
      data.prompt = prompt;
    }
    if (!data.prompt || data.prompt === 'Write new prompt') {
      if (data.prompt === 'Write new prompt') {
        console.log('Here are the last 10 prompts you used:');
        settings.prompts.forEach((prompt, index) => {
          console.log(`${index + 1}: "${prompt}"`);
        });
      }
      const { prompt } = await inquirer.prompt([
        {
          type: 'input',
          name: 'prompt',
          message: `What is the prompt you would like to give to openai? (If you passed a file to read, it will precede the contents of the file)
`
        }
      ]);
      data.prompt = prompt;
      prompts.unshift(data.prompt);
    }
    // End: show prompt history to select from or write new

    console.log('Here are the answers you gave: ', JSON.stringify(data, null, 2));

    const confirm = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message:
          'Press Y and enter to continue, or N and enter to cancel',
        default: true
      }
    ]);

    if (!confirm.confirm) {
      console.log('EXIT');
      process.exit();
    }

    Settings.setSettings({
      apiKey: data.apiKey,
      openAiModel: data.openAiModel,
      prompts: prompts.slice(0, 10),
      inputFileName: data.inputFileName
    });
    return data;
  }
}

export default new Ask();
