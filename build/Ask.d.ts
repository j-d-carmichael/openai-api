interface IStart {
    openAiModel: '3.5' | '4';
    inputFileName: string;
    outputToFileWithNoInputFile: boolean;
    prompt: string;
    apiKey: string;
}
declare class Ask {
    start(): Promise<IStart>;
}
declare const _default: Ask;
export default _default;
