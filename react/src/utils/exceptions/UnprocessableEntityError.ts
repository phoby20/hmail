import { ApiError } from '.'

/** 予期せぬサーバーエラー */
export class UnprocessableEntityError extends ApiError {
  constructor() {
    super(
      'UnprocessableEntityError',
      '입력된 정보에 문제가 발생했습니다.（422）',
    )
  }
}
