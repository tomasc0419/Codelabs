export function BusinessLogicException(
  this: any,
  message: string,
  type: number,
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  this.message = message;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  this.type = type;
}

export enum BusinessError {
  NOT_FOUND,
  PRECONDITION_FAILED,
  BAD_REQUEST,
}
/* archivo: src/shared/errors/business-errors.ts */
