import { ErrorResponse, FASTFOX_ERROR_CODE_KEY } from './interfaces';

export class FastFoxError extends Error {
  public readonly name: FASTFOX_ERROR_CODE_KEY;

  public constructor(message: string, name: FASTFOX_ERROR_CODE_KEY) {
    super();
    this.message = message;
    this.name = name;
  }

  public static fromResponse(response: ErrorResponse) {
    const error = response;

    return new FastFoxError(error.message, error.name);
  }

  public override toString() {
    return JSON.stringify(
      {
        message: this.message,
        name: this.name,
      },
      null,
      2,
    );
  }
}
