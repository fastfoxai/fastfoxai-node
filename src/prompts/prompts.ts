import { FastFox } from '../fast-fox';
import {
  GetPromptOptions,
  GetPromptResponse,
  GetPromptResponseSuccess,
} from './interfaces/get-prompt-options.interface';

export class Prompts {
  constructor(private readonly fastfox: FastFox) {}

  async get(
    slug: string,
    options: GetPromptOptions = {
      type: 'alias',
      alias: 'latest',
    },
  ): Promise<GetPromptResponse> {
    const type = options.type === 'alias' ? 'aliases' : 'versions';
    const typeValue =
      options.type === 'alias' ? options.alias : options.version;

    const data = await this.fastfox.get<GetPromptResponseSuccess>(
      `/prompts/${slug}/${type}/${typeValue}`,
    );
    return data;
  }
}
