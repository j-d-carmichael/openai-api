interface ISettings {
    apiKey?: string;
    openAiModel?: '3.5' | '4';
    prompts: string[];
}
declare class Settings {
    getSettings(): ISettings;
    setSettings(settings: ISettings): void;
}
declare const _default: Settings;
export default _default;
