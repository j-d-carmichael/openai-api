import inquirer from 'inquirer';

class Ask {
  async ask (): Promise<{
    openAiModel: '3.5' | '4',
    inputFileName: string,
    prompt: string,
    apiKey: string
  }> {
    const answers = await inquirer.prompt([
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

    const confirm = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message:
          'Press Y and enter to continue, or N and enter to cancel',
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

export default new Ask();
