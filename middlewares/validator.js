const { celebrate, Joi, CelebrateError } = require('celebrate');
const { isURL } = require('validator');
const { errMessage } = require('../utils/errorMessages.js');

const validateRegistration = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const validateCreateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom((value) => {
      if (!isURL(value)) throw new CelebrateError(errMessage.urlErr);
      return value;
    }),
    image: Joi.string().required().custom((value) => {
      if (!isURL(value)) throw new CelebrateError(errMessage.urlErr);
      return value;
    }),
  }),
});

const validateArticleId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

module.exports = {
  validateRegistration,
  validateLogin,
  validateCreateArticle,
  validateArticleId,
};
