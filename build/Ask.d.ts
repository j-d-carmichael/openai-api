declare class Ask {
    ask(): Promise<{
        openAiModel: '3.5' | '4';
        inputFileName: string;
        prompt: string;
        apiKey: string;
    }>;
}
declare const _default: Ask;
export default _default;
