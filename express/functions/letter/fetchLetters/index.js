const { constants } = require("../../../constants/index");
const { differenceInMilliseconds } = require("date-fns");
const { API_STATUS } = constants;

/**
 * 탑 페이지에서 보여줄 편지를 취득
 * @param db
 * @param res
 */
const fetchLetters = async (db, res, moveMilliSecond, allLetterMaxCount) => {
  const nowDate = new Date();
  const nowDateIos = nowDate.toISOString();
  try {
    const letterDB = db.collection("letters");
    // 아직 도착하지 않은 편지만을 DB에서 취득한다
    const allLetters = await letterDB
      .find({ arrivalDate: { $gte: nowDateIos } })
      .toArray();

    allLetters.forEach((letter) => {
      // 프론트에 알려주지 않아도 되는 프로퍼티는 삭제한다
      delete letter._id;
      delete letter.updatedAt;

      letter.moveCoordinate = [];
      const travelMilliseconds = differenceInMilliseconds(
        letter.arrivalDate,
        nowDate
      ); // 앞으로 이동 해야 할 시간 계산(밀리초)
      if (travelMilliseconds <= 0) return; //DB 쿼리를 통해서 도착시간이 이미 지난 편지는 필터하지만 안전을 위해 여기서도 한번 더 필터 한다
      const travelSeconds = travelMilliseconds * 0.001; //  0.001을 곱해서 milliSeconds를 초단위로 변환
      const rangeMoveFromNow =
        travelSeconds * letter.movementInterval * moveMilliSecond; // 앞으로 이동해야 할 거리 계산
      const nowCoordinate = calcNowCoordinate(letter, rangeMoveFromNow);
      letter.moveCoordinate.push(nowCoordinate);

      /**
       * 종이비행기의 각도를 묘사하기 위해 각도θ를 구하기 (참조: https://dico.me/java-script/articles/402/ko)
       * 각도 A를 구하는 공식 : (Math.acos(a / c) * 180) / Math.PI
       * 단 이 각은 삼각형의 내각이며, 실제 비행기를 이동시키기 위해서는 외각이 필요하기 때문에 360에서 내각을 빼준다
       * 마지막으로 css는 0deg가 12시 방향이고 javascript는 0도가 9시 방향이기 때문에 x축이 0보다 크면 90을 더하고 그렇지 않으면 빼준다
       */
      const letterAngle =
        360 -
        (Math.atan(letter.distances.y / letter.distances.x) * 180) / Math.PI;
      letter.sinAngle =
        letter.distances.x >= 0 ? letterAngle + 90 : letterAngle - 90;

      let nextRangeMove = rangeMoveFromNow;
      for (let i = 0; i <= allLetterMaxCount; i++) {
        nextRangeMove =
          nextRangeMove - letter.movementInterval * moveMilliSecond;
        if (nextRangeMove <= 0) return;
        const nowCoordinate = calcNowCoordinate(letter, nextRangeMove);
        letter.moveCoordinate.push(nowCoordinate);
      }
    });
    res.status(API_STATUS.OK).send(allLetters);
  } catch {
    res.status(API_STATUS.INTERNAL_SERVER_ERROR).send();
  }
};

const calcNowCoordinate = (letter, rangeMoveFromNow) => {
  //   // sinθ = x / 빝변
  //   // y = sinθ * 빝변
  const yDifference = letter.sine * rangeMoveFromNow;
  const xDifference =
    letter.distances.x >= 0
      ? Math.sqrt(rangeMoveFromNow ** 2 - yDifference ** 2)
      : Math.sqrt(rangeMoveFromNow ** 2 - yDifference ** 2) * -1;

  const nowX = letter.recipient.coordinate[0] - xDifference; // 이동 해야 할 x
  const nowY = letter.recipient.coordinate[1] - yDifference; // 이동해야 할 y
  return [nowX, nowY];
};

exports.fetchLetters = fetchLetters;
