import { ErrorResponse } from '../../interfaces';

type GetPromptByAlias = {
  type: 'alias';
  alias: string;
};

type GetPromptByVersion = {
  type: 'version';
  version: number;
};

type GetPromptByAliasOrVersion = GetPromptByAlias | GetPromptByVersion;

export type GetPromptOptions = GetPromptByAliasOrVersion & {
  variables?: Record<string, string | number>;
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
