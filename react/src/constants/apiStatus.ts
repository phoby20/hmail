export const API_STATUS = {
  /** 成功 */
  OK: 200,
  /** 作成成功 */
  CREATED: 201,
  /** その他のエラー */
  BAD_REQUEST: 400,
  /** 未承認（未ログインまたはセッション切れ） */
  UNAUTHORIZED: 401,
  /** アクセス権限なし（処理フロー不正） */
  FORBIDDEN: 403,
  /** URL不正 */
  NOT_FOUND: 404,
  /** リクエストパラメータ不正 */
  UNPROCESSABLE_ENTITY: 422,
  /** リソースロック */
  LOCKED: 423,
  /** 前回のリクエストの失敗 */
  FAILED_DEPENDENCY: 424,
  /** サーバーエラー */
  INTERNAL_SERVER_ERROR: 500,
  /** メンテナンス中 */
  SERVICE_UNAVAILABLE: 503,
}
