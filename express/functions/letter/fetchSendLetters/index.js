const { constants } = require("../../../constants/index");
const { API_STATUS } = constants;

const fetchSendLetters = async (db, req, res) => {
  const loggedInUserId = Number(req.params.loggedInUserId);
  const query = {
    "sender.id": loggedInUserId,
  };
  try {
    const letterDB = db.collection("letters");
    const sendLetters = await letterDB.find(query).toArray();
    console.log("sendLetters : ", sendLetters);
    res.status(API_STATUS.OK).send(sendLetters);
  } catch {
    res.status(API_STATUS.INTERNAL_SERVER_ERROR).send();
  }
};

exports.fetchSendLetters = fetchSendLetters;
