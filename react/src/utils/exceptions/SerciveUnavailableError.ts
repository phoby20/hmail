import { ApiError } from '.'

/** メンテナンス中 */
export class ServiceUnavailableError extends ApiError {
  constructor() {
    super('SerciveUnavailableError', '서버를 점검중입니다.（503）')
  }
}
