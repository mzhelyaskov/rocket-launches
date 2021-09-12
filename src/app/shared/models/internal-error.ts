interface Params {
  message: string;
  stack: string;
}

export class InternalError {

  message: string;
  stack: string;

  private constructor({message, stack}: Params) {
    this.message = message;
    this.stack = stack;
  }

  static of(error: Error): InternalError {
    return new InternalError({
      message: error.message,
      stack: error.stack
    });
  }
}
