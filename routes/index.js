const routes = require('express').Router(); // создание роутера для запроса всех карточек
const { createUser, login } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { meRouter } = require('./users.js');
const { articlesRouter } = require('./articles.js');
const { unknownPageRouter } = require('./unknown-page');
const { validationSignup, validationSignin } = require('../middlewares/validation-celebrate');

// Роутинг
routes.post('/signup', validationSignup, createUser); // Запуск createUser с валидацией
routes.post('/signin', validationSignin, login); // Запуск login с валидацией

routes.use(auth);
routes.use('/users', meRouter);// Запуск meRouter с авторизацией
routes.use('/articles', articlesRouter);// Запуск articlesRouter с авторизацией
routes.use(unknownPageRouter); // Запуск unknownPageRouter / Запрос неизвестного адреса на сервере

module.exports = { routes };
