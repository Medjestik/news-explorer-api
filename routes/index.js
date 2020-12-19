const router = require('express').Router();
const { validateRegistration, validateLogin } = require('../middlewares/validator.js');
const usersRouter = require('./users.js').router;
const articlesRouter = require('./articles.js').router;
const { createUser, login } = require('../controllers/users.js');
const auth = require('../middlewares/auth.js');
const NotFoundError = require('../errors/not-found-err.js');
const { errMessage } = require('../utils/errorMessages.js');

router.post('/signup', validateRegistration, createUser);
router.post('/signin', validateLogin, login);

router.use('/users', auth, usersRouter);
router.use('/articles', auth, articlesRouter);

router.all('*', (req, res, next) => {
  next(new NotFoundError(errMessage.notFoundErr));
});

module.exports = router;
