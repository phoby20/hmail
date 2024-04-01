const { createHashedPassword } = require("../../util/encryption/index");
const { constants } = require("../../constants/index");
const { USER, API_STATUS } = constants;

const checkLogin = async (db, req, res) => {
  const userId = req.session.passport;
  if (!userId) {
    res.status(200).send(); // 로그인을 하지 않았을 때는 200 Status를 보내고 이후 처리를 종료한다.
    return;
  }
  try {
    const accountDB = db.collection("accounts");
    const userInfo = await accountDB.findOne({ id: userId.user });
    const newUserInfo = {
      id: userInfo.id,
      name: userInfo.name,
      coordinate: userInfo.coordinate,
    };
    res.status(200).send(newUserInfo);
    return;
  } catch {
    res.status(API_STATUS.INTERNAL_SERVER_ERROR).send({
      message:
        "네트워크 문제로 인해 편지를 보낼 수 없습니다. 잠시후에 다시 시도해주세요.",
    });
    return;
  }
};

/**
 * New member registration
 */
const registAccount = async (db, postData, res) => {
  const now = new Date();
  const createdAt = now.toISOString();
  try {
    const accountDB = db.collection("accounts");
    const lastAccount = await accountDB.findOne(
      {},
      { sort: { createdAt: -1 } }
    );
    const newMemberId = lastAccount ? lastAccount.id + 1 : 1;
    const newAccount = {
      id: newMemberId,
      name: postData.name,
      email: postData.email,
      password: createHashedPassword(postData.password),
      coordinate: postData.coordinate,
      status: USER.STATUS.APPROVED,
      createdAt: createdAt,
      updatedAt: createdAt,
    };

    // If you are checking by email to see if there are duplicate members, error 424 is returned.
    const result = await accountDB.find({ email: postData.email }).toArray();
    if (result.length) {
      res
        .status(API_STATUS.FAILED_DEPENDENCY)
        .send({ message: "회원수가 충분하지 않습니다." });
      return;
    }

    // Register new members in DB
    await accountDB.insertOne(newAccount);
    res.status(200).send();
    return;
  } catch {
    res.status(API_STATUS.INTERNAL_SERVER_ERROR).send({
      message:
        "네트워크 문제로 인해 편지를 보낼 수 없습니다. 잠시후에 다시 시도해주세요.",
    });
    return;
  }
};

exports.checkLogin = checkLogin;
exports.registAccount = registAccount;
