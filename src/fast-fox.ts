import { version } from '../package.json';
import { GetOptions, PostOptions, PutOptions } from './common/interfaces';
import { PatchOptions } from './common/interfaces/patch-option.interface';
import { Prompts } from './prompts/prompts';
import { isFastFoxErrorResponse } from './guards';
import { ErrorResponse } from './interfaces';

const defaultBaseUrl = 'https://api.fastfox.ai';
const defaultUserAgent = `fastfoxai-node:${version}`;
const baseUrl =
  typeof process !== 'undefined' && process.env
    ? process.env.FASTFOX_BASE_URL || defaultBaseUrl
    : defaultBaseUrl;
const userAgent =
  typeof process !== 'undefined' && process.env
    ? process.env.FASTFOX_USER_AGENT || defaultUserAgent
    : defaultUserAgent;

export class FastFox {
  private readonly headers: Headers;

  readonly prompts = new Prompts(this);

  constructor(readonly key?: string) {
    if (!key) {
      if (typeof process !== 'undefined' && process.env) {
        this.key = process.env.FASTFOX_API_KEY;
      }

      if (!this.key) {
        throw new Error(
          'Missing API key. Pass it to the constructor `new FastFox("YOUR_API_KEY")`',
        );
      }
    }

    this.headers = new Headers({
      Authorization: `Bearer ${this.key}`,
      'User-Agent': userAgent,
      'Content-Type': 'application/json',
    });
  }

  async fetchRequest<T>(
    path: string,
    options = {},
  ): Promise<{ data: T | null; error: ErrorResponse | null }> {
    const response = await fetch(`${baseUrl}${path}`, options);

    if (!response.ok) {
      const error = await response.json();
      if (isFastFoxErrorResponse(error)) {
        return { data: null, error };
      }

      return { data: null, error };
    }

    const data = await response.json();
    return { data, error: null };
  }

  async post<T>(path: string, entity?: unknown, options: PostOptions = {}) {
    const requestOptions = {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(entity),
      ...options,
    };

    return this.fetchRequest<T>(path, requestOptions);
  }

  async get<T>(path: string, options: GetOptions = {}) {
    const requestOptions = {
      method: 'GET',
      headers: this.headers,
      ...options,
    };

    return this.fetchRequest<T>(path, requestOptions);
  }

  async put<T>(path: string, entity: any, options: PutOptions = {}) {
    const requestOptions = {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(entity),
      ...options,
    };

    return this.fetchRequest<T>(path, requestOptions);
  }

  async patch<T>(path: string, entity: any, options: PatchOptions = {}) {
    const requestOptions = {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(entity),
      ...options,
    };

    return this.fetchRequest<T>(path, requestOptions);
  }

  async delete<T>(path: string, query?: unknown) {
    const requestOptions = {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify(query),
    };

    return this.fetchRequest<T>(path, requestOptions);
  }
}
