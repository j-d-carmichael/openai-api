export interface TokeniseOptions {
    tokenise: boolean;
    tokensMustContain?: string[];
    tokensMatchPattern?: RegExp;
    onlyGet1stToken: boolean;
}
export interface OpenApiOutput {
    id: string;
    object: string;
    created: number;
    model: string;
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
    choices: [
        {
            message: {
                role: 'assistant';
                content: string;
            };
            finish_reason: 'stop';
            index: number;
        }
    ];
}
declare class OpenAiService {
    outputFromPrompt(input: {
        apiKey: string;
        openaiModel: string;
        prompt: string;
    }): Promise<OpenApiOutput>;
}
declare const _default: OpenAiService;
export default _default;
