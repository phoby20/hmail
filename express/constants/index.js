const constants = {
  USER: {
    STATUS: {
      UNAPPROVED: 0,
      APPROVED: 1,
      STOPPED: 2,
    },
  },
  LETTER: {
    STATUS: {
      SENDING: 0,
      ARRIVED: 1,
      DELETED: 2,
    },
    TYPE: {
      1: 1,
      2: 0.5,
      3: 0.1,
      4: 0.05,
      5: 0.01,
      6: 0.005,
      7: 0.001,
      8: 0.0005,
      9: 0.0001,
      10: 0.0005,
    },
  },
  API_STATUS: {
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
  },
};

exports.constants = constants;
