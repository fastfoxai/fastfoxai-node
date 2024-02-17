import { enableFetchMocks } from 'jest-fetch-mock';
import { FastFox } from '../fast-fox';
import { ErrorResponse } from '../interfaces';
import { GetPromptResponseSuccess } from './interfaces/get-prompt-options.interface';

enableFetchMocks();

const fastfox = new FastFox('ff_your_api_key');

describe('Prompts', () => {
  afterEach(() => fetchMock.resetMocks());

  describe('get', () => {
    describe('when prompt not found', () => {
      it('returns error', async () => {
        const response: ErrorResponse = {
          name: 'not_found',
          message: 'Prompt not found',
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 404,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer ff_your_api_key',
          },
        });

        const result = fastfox.prompts.get('non-existent-prompt-slug');

        await expect(result).resolves.toMatchInlineSnapshot(`
{
  "data": null,
  "error": {
    "message": "Prompt not found",
    "name": "not_found",
  },
}
`);
      });
    });

    describe('when prompt found', () => {
      it('returns prompt with content', async () => {
        const response: GetPromptResponseSuccess = {
          uuid: 'fb1aa564-7c2a-4362-b881-d84c2c869a93',
          version: 4,
          content: 'You are a special test prompt...',
          created_at: '2024-02-17T19:23:42.336846+00:00',
        };

        fetchMock.mockOnce(JSON.stringify(response), {
          status: 200,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer ff_your_api_key',
          },
        });

        await expect(
          fastfox.prompts.get('fb1aa564-7c2a-4362-b881-d84c2c869a93'),
        ).resolves.toMatchInlineSnapshot(`
{
  "data": {
    "content": "You are a special test prompt...",
    "created_at": "2024-02-17T19:23:42.336846+00:00",
    "uuid": "fb1aa564-7c2a-4362-b881-d84c2c869a93",
    "version": 4,
  },
  "error": null,
}
`);
      });
    });
  });
});
