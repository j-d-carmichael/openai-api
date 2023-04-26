"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs-extra"));
const settingsFilePath = '~/.openai-file';
class Settings {
    getSettings() {
        try {
            return JSON.parse(fs.readFileSync(settingsFilePath).toString('utf-8'));
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
    }
}
exports.default = new Settings();
