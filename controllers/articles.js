const Article = require('../models/article.js');
const NotFoundError = require('../errors/not-found-err.js');
const ForbiddenError = require('../errors/forbidden-err.js');
const { errMessage } = require('../utils/errorMessages.js');

module.exports.getArticles = (req, res, next) => {
  const { _id } = req.user;
  Article.find({ owner: _id })
    .then((articles) => res.send(articles))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const { _id } = req.user;
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image, owner: _id,
  })
    .then((article) => {
      const { owner, ...data } = article.toObject();
      res.send(data);
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  const articleId = req.params.id;
  const userId = req.user._id;
  Article.findById(articleId).select('+owner')
    .orFail(new NotFoundError(errMessage.notFoundArticle))
    .then((article) => {
      if (article.owner.toString() === userId) {
        article.remove()
          .then((removeArticle) => {
            const { owner, ...data } = removeArticle.toObject();
            res.send(data);
          });
      } else {
        throw new ForbiddenError(errMessage.forbiddenErr);
      }
    })
    .catch(next);
};
