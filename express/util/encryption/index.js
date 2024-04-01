const crypto = require("crypto");

// passwordをhashingする　---------
const createHashedPassword = (password) => {
  return crypto.createHash("sha512").update(password).digest("base64");
};

const checkEmailValidation = (email) => {
  const emailPattern =
    /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
  return emailPattern.test(email);
};

exports.createHashedPassword = createHashedPassword;
exports.checkEmailValidation = checkEmailValidation;
