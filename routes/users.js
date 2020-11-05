const meRouter = require('express').Router(); // создание роутера для работы с пользователем
const { getMeById } = require('../controllers/users');
const { validationCurrentUser } = require('../middlewares/validation-celebrate');

meRouter.get('/me', validationCurrentUser, getMeById); // Запуск meRouter с валидацией

module.exports = { meRouter };
