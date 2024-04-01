const LETTER_API_URL = {
  PATH: {
    REGIST_LETTER: "/api/regist_letter",
    FETCH_LETTERS: "/api/letters",
    RECEIVING_LETTERS: "/api/receiving_letters/:loggedInUserId",
    SEND_LETTERS: "/api/send_letters/:loggedInUserId",
    LETTER_DETAIL: "/api/letter_detail",
  },
};

exports.LETTER_API_URL = LETTER_API_URL;
