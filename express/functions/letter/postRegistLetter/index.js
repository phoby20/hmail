const { constants } = require("../../../constants/index");
const {
  calcDistances,
  calcTangent,
  calcLetterType,
} = require("../../../util/calculation/index");
const { addSeconds } = require("date-fns");

const { USER, LETTER, API_STATUS } = constants;

/**
 * 신규 편지 등록
 * @param db
 * @param req
 * @param res
 * @returns
 */
const postRegistLetter = async (db, req, res, moveMilliSecond) => {
  const nowDate = new Date();
  const createdAt = nowDate.toISOString();

  try {
    const letterDB = db.collection("letters");
    const accountDB = db.collection("accounts");
    const totalUserCount = await accountDB.count();

    // 회원 수가 1명 이하일 때는 편지를 받을 사람이 없기 때문에 에러를 반환한다
    if (totalUserCount <= 1) {
      res
        .status(API_STATUS.FAILED_DEPENDENCY)
        .send({ message: "회원수가 충분하지 않습니다." });
      return;
    }
    const authInfo = req.session.passport; // 로그인 한 유저 취득
    const id = await createNewLetterId(letterDB); // 편지의 ID　취득
    const sender = await createSender(accountDB, authInfo);
    const recipient = await createRecipient(
      accountDB,
      sender.id,
      totalUserCount
    );
    const message = req.body.message;
    const distances = calcDistances(sender.coordinate, recipient.coordinate);
    const letterType = calcLetterType();
    const movementInterval = LETTER.TYPE[letterType];
    const totalMoveCnt = distances.hypotenuse / movementInterval;

    const tangent = calcTangent(distances.x, distances.y);
    const sine = Math.sin((tangent * Math.PI) / 180);
    const totalMoveSec = totalMoveCnt / moveMilliSecond; // 1초에 100스텝 움직이게 하기 위해서 0.01을 곱해준다
    const arrivalDate = addSeconds(nowDate, totalMoveSec).toISOString();

    const newLetter = {
      id,
      sender, // 로그인 한 유저정보를 DB에서
      recipient, // 편지를 받을 유저정보를
      message, // 편지 내용
      status: LETTER.STATUS.SENDING,
      letterType, // 편지 타입
      movementInterval, // 한번에 이동할 수 있는 거리
      distances, // 송수신자 간의 가로/세로/대각선 거리
      tangent, // 송수신자 간의 탄젠트(각도)
      sine, // 송수신자 간의 사인(각도)
      totalMoveCnt, // 편지가 이동할 총 횟수
      totalMoveSec, // 총 이동시간(초)
      arrivalDate, // 도착할 날짜와 시간
      isAlreadyRead: false,
      isArrived: false,
      createdAt, // 편지 생성일
      updatedAt: createdAt,
      deleteAt: null,
    };
    console.log(arrivalDate, createdAt);
    await letterDB.insertOne(newLetter);
    res.status(API_STATUS.OK).send({ id });
    return;
  } catch {
    res.status(API_STATUS.FAILED_DEPENDENCY).send({
      message:
        "네트워크 문제로 인해 편지를 보낼 수 없습니다. 잠시후에 다시 시도해주세요.",
    });
    return;
  }
};

const createSender = async (accountDB, authInfo) => {
  const senderInfo = await accountDB.findOne({ id: authInfo.user });
  return {
    id: authInfo.user,
    name: senderInfo.name,
    coordinate: senderInfo.coordinate,
  };
};

// DB에 저장된 마지막 편지의 ID가 있다면 ID+1을 반환. 아니면 1을 반환한다
const createNewLetterId = async (letterDB) => {
  const lastLtter = await letterDB.findOne({}, { sort: { createdAt: -1 } });
  return lastLtter ? lastLtter.id + 1 : 1;
};

// 편지를 받을 유저의 아이디와 이름과 좌표를 반환한다
const createRecipient = async (accountDB, senderId, totalUserCount) => {
  let recipientId;
  // 보내는 사람과 받는 사람이 일칭하지 않을 때까지 아이디 취득을 반복한다
  while (true) {
    recipientId = Math.floor(Math.random() * totalUserCount) + 1;
    if (recipientId !== senderId) {
      break;
    }
  }
  const { name, coordinate } = await accountDB.findOne({
    id: recipientId,
    status: USER.STATUS.APPROVED,
  });
  return {
    id: recipientId,
    name,
    coordinate,
  };
};

exports.postRegistLetter = postRegistLetter;
