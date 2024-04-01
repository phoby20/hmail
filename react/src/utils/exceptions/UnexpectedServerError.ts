import { ApiError } from '.'

/** 予期せぬサーバーエラー */
export class UnexpectedServerError extends ApiError {
  public readonly error: unknown

  constructor(error: unknown) {
    super('UnexpectedServerError', '예상치 못한 에러가 발생했습니다.')
    this.error = error
  }
}
