import { ApiError } from '.'

/** 前回のリクエストの失敗 */
export class FailedDependencyError extends ApiError {
  constructor() {
    super('FailedDependencyError', '요청에 실패했습니다.（424）')
  }
}
