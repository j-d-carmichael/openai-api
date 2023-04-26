"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
class OpenAiService {
    async outputFromPrompt(input) {
        const { prompt, apiKey, openaiModel } = input;
        let model;
        switch (openaiModel) {
            case '4':
                model = 'gpt-4-0314';
                break;
            default:
                model = 'gpt-3.5-turbo';
        }
        const { data } = await (0, axios_1.default)({
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey
            },
            url: 'https://api.openai.com/v1/chat/completions',
            method: 'post',
            data: {
                model,
                messages: [{ 'role': 'user', 'content': prompt }],
                temperature: 0.7
            }
        });
        return data;
    }
}
exports.default = new OpenAiService();
