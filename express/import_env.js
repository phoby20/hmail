require("dotenv").config();
const PORT = process.env.SERVER_PORT;
const HOST = process.env.SERVER_HOST;
const MONGO_DB_HOST = process.env.MONGO_DB_HOST;
const SESSION_SECRET = process.env.SESSION_SECRET;
const MOVE_MILLISECOND = process.env.MOVE_MILLISECOND;
const ALL_LETTER_MAX_COUNT = process.env.ALL_LETTER_MAX_COUNT;

exports.port = PORT;
exports.host = HOST;
exports.mongoDbHost = MONGO_DB_HOST;
exports.sessionSecret = SESSION_SECRET;
exports.moveMilliSecond = MOVE_MILLISECOND;
exports.allLetterMaxCount = ALL_LETTER_MAX_COUNT;
