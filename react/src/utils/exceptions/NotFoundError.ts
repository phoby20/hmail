import { ApiError } from '.'

/** URL不正 */
export class NotFoundError extends ApiError {
  constructor() {
    super('NotFoundError', '네트워크 에러가 발생했습니다.（404）')
  }
}
