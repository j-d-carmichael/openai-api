import axios from 'axios';

export interface TokeniseOptions {
  tokenise: boolean,
  tokensMustContain?: string[],
  tokensMatchPattern?: RegExp,
  onlyGet1stToken: boolean,
}

export interface OpenApiOutput {
  id: string,
  object: string,
  created: number,
  model: string,
  usage: {
    prompt_tokens: number,
    completion_tokens: number,
    total_tokens: number
  },
  choices: [
    {
      message: {
        role: 'assistant',
        content: string
      },
      finish_reason: 'stop',
      index: number
    }
  ]
}

class OpenAiService {
  async outputFromPrompt (input: { apiKey: string, openaiModel: string, prompt: string }): Promise<OpenApiOutput> {
    const { prompt, apiKey, openaiModel } = input;

    let model: string;
    switch (openaiModel) {
      case '4':
        model = 'gpt-4-0314';
        break;
      default:
        model = 'gpt-3.5-turbo';
    }

    const { data } = await axios({
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

export default new OpenAiService();
