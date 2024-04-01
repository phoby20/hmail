const express = require("express");
const bodyParser = require("body-parser");
const {
  mongoDbHost,
  port,
  host,
  sessionSecret,
  moveMilliSecond,
  allLetterMaxCount,
} = require("./import_env");
const { checkLogin, registAccount } = require("./functions/account/index");
const {
  postRegistLetter,
} = require("./functions/letter/postRegistLetter/index");
const { fetchLetters } = require("./functions/letter/fetchLetters/index");
const {
  fetchReceivingLetters,
} = require("./functions/letter/fetchReceivingLetters/index");
const {
  fetchSendLetters,
} = require("./functions/letter/fetchSendLetters/index");
const {
  fetchLetterDetail,
} = require("./functions/letter/fetchLetterDetail/index");
const { AUTH_API_URL } = require("./api/url/account/index");
const { LETTER_API_URL } = require("./api/url/letter/index");
const { MongoClient } = require("mongodb");
const {
  createHashedPassword,
  checkEmailValidation,
} = require("./util/encryption/index");

const app = express();
const client = new MongoClient(mongoDbHost);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// login정보를session에 보존하기 위한 준비---------
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

app.use(
  session({ secret: sessionSecret, resave: true, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

// conect DB
let db;
const connectMongoDB = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db("hmail");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};
connectMongoDB();

/**
 * 인증관련 API -------------------------------------
 */
// Check user login API
app.get(AUTH_API_URL.PATH.LOGIN_CHECK, async (req, res) => {
  await checkLogin(db, req, res);
});
// regist account API
app.post(AUTH_API_URL.PATH.REGIST_ACCOUNT, async (req, res) => {
  await registAccount(db, req.body, res);
});
// login API
app.post(
  AUTH_API_URL.PATH.LOGIN,
  passport.authenticate("local", { session: true }), //session 정보를 유지하기 위해 true로 설정한다
  (req, res) => {
    res.status(200).send();
  }
);
// logout API
app.post(AUTH_API_URL.PATH.LOGOUT, (req, res) => {
  delete req.session.passport;
  res.status(200).send();
});

/**
 * 편지관련 API -------------------------------------
 */
// 편지등록
app.post(LETTER_API_URL.PATH.REGIST_LETTER, async (req, res) => {
  const authInfo = req.session.passport;
  if (authInfo) {
    await postRegistLetter(db, req, res, moveMilliSecond);
  } else {
    res.status(401).send();
  }
});

// 탑 페이지에 보이는 편지를 취득
app.get(LETTER_API_URL.PATH.FETCH_LETTERS, async (req, res) => {
  await fetchLetters(db, res, moveMilliSecond, allLetterMaxCount);
});

// 받은 편지함을 취득
app.get(LETTER_API_URL.PATH.RECEIVING_LETTERS, async (req, res) => {
  await fetchReceivingLetters(db, req, res);
});

// 보낸 편지함을 취득
app.get(LETTER_API_URL.PATH.SEND_LETTERS, async (req, res) => {
  await fetchSendLetters(db, req, res);
});

app.get(LETTER_API_URL.PATH.LETTER_DETAIL, async (req, res) => {
  await fetchLetterDetail(db, req, res);
});

app.listen(port, host);

/**
 * 認証方法を決める
 */
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
      passReqToCallback: false,
    },
    async function (inputEmail, inputPassword, done) {
      // email形式のチェック
      const isEmailValidationError = checkEmailValidation(inputEmail);
      if (!isEmailValidationError) return done({ message: "인증실패" }, false);

      try {
        const accountDB = db.collection("accounts");
        const registedUserInfo = await accountDB.findOne({ email: inputEmail });
        const hashedPassword = createHashedPassword(inputPassword);
        if (!registedUserInfo) {
          console.log("존재하지 않는 계정");
          return done(null, false, { message: "존재하지 않는 계정입니다." });
        }
        if (hashedPassword === registedUserInfo.password) {
          console.log("인증성공");
          return done(null, registedUserInfo);
        } else {
          console.log("패스워드 불일치");
          return done(null, false, {
            message: "패스워드가 잘못 입력되었습니다.",
          });
        }
      } catch {
        return done(null, false, { message: "인증실패" });
      }
    }
  )
);

// when login success, serialize is process
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  done(null, {});
});
