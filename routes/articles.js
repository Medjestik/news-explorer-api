const router = require('express').Router();
const { validateCreateArticle, validateArticleId } = require('../middlewares/validator.js');

const { getArticles, createArticle, deleteArticle } = require('../controllers/articles.js');

router.get('/', getArticles);
router.post('/', validateCreateArticle, createArticle);
router.delete('/:id', validateArticleId, deleteArticle);

module.exports = {
  router,
};
