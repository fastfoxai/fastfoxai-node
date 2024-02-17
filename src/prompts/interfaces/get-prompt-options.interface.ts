import { ErrorResponse } from '../../interfaces';

export type GetPromptOptions =
  | {
      type: 'alias';
      alias: string;
    }
  | {
      type: 'version';
      version: string;
    };

export interface GetPromptResponseSuccess {
  uuid: string;
  version: number;
  content: string;
  created_at: string;
}

export interface GetPromptResponse {
  data: GetPromptResponseSuccess | null;
  error: ErrorResponse | null;
}
