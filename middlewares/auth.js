const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err.js');
const { errMessage } = require('../utils/errorMessages.js');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization && !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(errMessage.unauthorizedErr));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new UnauthorizedError(errMessage.unauthorizedErr));
  }
  req.user = payload;

  return next();
};
