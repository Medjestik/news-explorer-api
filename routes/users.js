const router = require('express').Router();

const { getUser } = require('../controllers/users.js');

router.get('/me', getUser);

module.exports = {
  router,
};
