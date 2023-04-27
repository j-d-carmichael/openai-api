"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs-extra"));
const os_1 = tslib_1.__importDefault(require("os"));
const path_1 = tslib_1.__importDefault(require("path"));
const settingsFilePath = path_1.default.join(os_1.default.homedir(), '.openai-file');
class Settings {
    getSettings() {
        try {
            const parsed = JSON.parse(fs.readFileSync(settingsFilePath).toString('utf-8'));
            console.log('Settings fetched from: ' + settingsFilePath);
            return parsed;
        }
        catch (e) {
            return {
                prompts: []
            };
        }
    }
    setSettings(settings) {
        fs.ensureFileSync(settingsFilePath);
        if (fs.pathExistsSync(settingsFilePath)) {
            console.log(settingsFilePath);
        }
        fs.writeJSONSync(settingsFilePath, settings);
        console.log('Settings saved to: ' + settingsFilePath);
    }
}
exports.default = new Settings();
