const { errMessage } = require('../utils/errorMessages.js');

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? errMessage.serverErr
        : message,
    });
  next();
};
