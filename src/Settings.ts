import * as fs from 'fs-extra';

const settingsFilePath = '~/.openai-file';

interface ISettings {
  apiKey?: string,
  openAiModel?: '3.5' | '4',
  prompts: string[]
}

class Settings {
  getSettings (): ISettings {
    try {
      return JSON.parse(
        fs.readFileSync(settingsFilePath).toString('utf-8')
      );
    } catch (e) {
      return {
        prompts: []
      };
    }
  }

  setSettings (settings: ISettings) {
    fs.ensureFileSync(settingsFilePath);
    if (fs.pathExistsSync(settingsFilePath)) {
      console.log(settingsFilePath)
    }
    fs.writeJSONSync(settingsFilePath, settings);
  }
}

export default new Settings();
