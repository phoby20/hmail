const { constants } = require("../../../constants/index");
const { API_STATUS } = constants;

const fetchReceivingLetters = async (db, req, res) => {
  const loggedInUserId = Number(req.params.loggedInUserId);
  const query = {
    "recipient.id": loggedInUserId,
  };
  try {
    const letterDB = db.collection("letters");
    const receivingLetters = await letterDB.find(query).toArray();
    console.log("receivingLetters : ", receivingLetters);
    res.status(API_STATUS.OK).send(receivingLetters);
  } catch {
    res.status(API_STATUS.INTERNAL_SERVER_ERROR).send();
  }
};

exports.fetchReceivingLetters = fetchReceivingLetters;
