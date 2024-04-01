import { ApiError } from '.'

/** パスワード再設定トークン不正エラー */
export class ResetTokenExpireError extends ApiError {
  constructor() {
    super('ResetTokenExpireError', 'URLトークンが不正です。')
  }
}
