export class BusinessLogicException extends Error {
  public type: BusinessError;

  constructor(message: string, type: BusinessError) {
    super(message);
    this.type = type;
  }
}

export enum BusinessError {
  NOT_FOUND,
  PRECONDITION_FAILED,
  BAD_REQUEST,
}
/* archivo: src/shared/errors/business-errors.ts */
