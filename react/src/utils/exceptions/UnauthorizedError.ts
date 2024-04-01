import { ApiError } from '.'

/** 未承認（未ログインまたはセッション切れ） */
export class UnauthorizedError extends ApiError {
  constructor() {
    super('UnauthorizedError', '로그인 정보가 없습니다.（401）')
  }
}

/**
 * セッション切れエラーの判定
 * @param e エラーオブジェクト
 * @returns true: セッション切れエラーである false: セッション切れエラーがではない
 */
export const isUnauthorizedError = (e: Error): e is UnauthorizedError =>
  e instanceof UnauthorizedError
