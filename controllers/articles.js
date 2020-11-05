const Article = require('../models/article');
const BadRequestError = require('../errors/bad-requet-error'); // 400
const NotFoundError = require('../errors/not-found-err'); // 404

const getAllArticles = (req, res, next) => {
  Article.find({ owner: req.user._id }).select('+owner')
    .orFail(new NotFoundError('Not Found / Статьи у текущего пользователя не найдены')) // 404
    .then((articles) => {
      res.send(articles);
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image, ownerId = req.user._id,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: ownerId,
  })
    .then((articleItem) => {
      res.send(articleItem);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Bad Request / Неверный запрос')); // 400
      } else {
        next(err);
      }
    });
};

const deleteArticleById = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .select('+owner')
    .orFail(new NotFoundError('Not Found / У текущего пользователя такая статья не найдена')) // 404
    .then(() => {
      Article.findByIdAndRemove({ _id: req.params.articleId })
        .orFail(new NotFoundError('Not Found / Статьи с таким Id не найдено')) // 404
        .then((articleItem) => {
          res.send(articleItem);
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = { getAllArticles, createArticle, deleteArticleById };
