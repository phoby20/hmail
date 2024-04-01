export const constants = {
  LOCATION: {
    PATH: {
      HOME: '/',
      LOGIN: '/login',
      LOGOUT: '/logout',
      REGIST_ACCOUNT: '/regist-account',
      REGIST_CONFIRM: '/regist-confirm',
      FORGET_PASSWORD: '/forget-password',
      RESET_PASSWORD: '/reset-password',
      REGIST_COMPLETE: '/regist-complete',
      MY_PAGE: '/mypage',
      RECEIVING_TRAY: '/receiving-tray',
      SEND_TRAY: '/send-tray',
    },
    ROUTE_NAME: {
      HOME: 'home',
      LOGIN: 'login',
      LOGOUT: 'logout',
      REGIST_ACCOUNT: 'registAccount',
      REGIST_CONFIRM: 'registConfirm',
      FORGET_PASSWORD: 'forgetPassword',
      RESET_PASSWORD: 'resetPassword',
      REGIST_COMPLETE: 'registComplete',
      MY_PAGE: 'mypage',
      RECEIVING_TRAY: 'receivingTray',
      SEND_TRAY: 'sendTray',
    },
  },
  API_URL: {
    PATH: {
      REGIST_ACCOUNT: '/api/regist_account',
      LOGIN: '/api/login',
      LOGOUT: '/api/logout',
      LOGIN_CHECK: '/api/login_check',
      REGIST_LETTER: '/api/regist_letter',
      FETCH_LETTERS: '/api/letters',
      RECEIVING_LETTERS: '/api/receiving_letters/:loggedInUserId',
      SEND_LETTERS: '/api/send_letters/:loggedInUserId',
      LETTER_DETAIL: '/api/letter_detail',
    },
  },
  MENU: {
    CLICK_NUMBER: {
      RECEIVING_TRAY: 1,
      SEND_TRAY: 2,
    },
  },
  MAX_INPUT_LENGTH: 200, // 편지의 최대 입력 글자 수
  // 10분 간격으로 탑 페이지의 편지들을 불러오는 API를 콜하기 위한 타이머(단위: 밀리초)
  ALL_LETTER_MAX_MILLI_SECOND: 600000,
} as const
