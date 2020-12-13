const articlesRouter = require('express').Router(); // создание роутера для запроса всех карточек
const { getAllArticles, createArticle, deleteArticleById } = require('../controllers/articles');
const { validationNewArticle, validationDeleteArticle } = require('../middlewares/validation-celebrate');

articlesRouter.get('/', getAllArticles); // возвращаю все сохранённые пользователем статьи
articlesRouter.post('/', validationNewArticle, createArticle); // Запуск articlesRouter с валидацией
articlesRouter.delete('/:articleId', validationDeleteArticle, deleteArticleById); // Запуск articlesRouter с валидацией

module.exports = { articlesRouter };
