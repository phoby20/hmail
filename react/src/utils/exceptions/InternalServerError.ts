import { ApiError } from '.'

/** サーバーエラー */
export class InternalServerError extends ApiError {
  constructor() {
    super('InternalServerError', '서버 에러가 발생했습니다.（500）')
  }
}
