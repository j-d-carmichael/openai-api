import * as fs from 'fs-extra';
import os from 'os';
import path from 'path';

const settingsFilePath = path.join(os.homedir(), '.openai-file');

interface ISettings {
  apiKey?: string,
  inputFileName? : string,
  openAiModel?: '3.5' | '4',
  prompts: string[]
}

class Settings {
  getSettings (): ISettings {
    try {
      const parsed = JSON.parse(
        fs.readFileSync(settingsFilePath).toString('utf-8')
      );
      console.log('Settings fetched from: ' + settingsFilePath);
      return parsed;
    } catch (e) {
      return {
        prompts: []
      };
    }
  }

  setSettings (settings: ISettings) {
    fs.ensureFileSync(settingsFilePath);
    if (fs.pathExistsSync(settingsFilePath)) {
      console.log(settingsFilePath);
    }
    fs.writeJSONSync(settingsFilePath, settings);
    console.log('Settings saved to: ' + settingsFilePath);
  }
}

export default new Settings();
