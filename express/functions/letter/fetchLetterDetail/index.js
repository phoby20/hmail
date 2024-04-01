const { constants } = require("../../../constants/index");
const { API_STATUS } = constants;

const fetchLetterDetail = async (db, req, res) => {
  const nowDate = new Date();
  const nowDateIos = nowDate.toISOString();
  const letterId = req.query.letterId;

  try {
    const letterDB = db.collection("letters");
    const query = { arrivalDate: { $gte: nowDateIos }, id: Number(letterId) };
    const selectedLetter = await letterDB.findOne(query);
    res.status(API_STATUS.OK).send(selectedLetter);
  } catch {
    res.status(API_STATUS.INTERNAL_SERVER_ERROR).send();
  }
};

exports.fetchLetterDetail = fetchLetterDetail;
