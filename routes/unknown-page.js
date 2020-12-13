const unknownPageRouter = require('express').Router(); // создаю роутер для запроса неизвестного адреса на сервере
const NotFoundError = require('../errors/not-found-err');

// Роутер для запроса неизвестного адреса на сервере
unknownPageRouter.all('*', (req, res, next) => {
  next(new NotFoundError('Not Found / Запрашиваемый ресурс не найден')); // 404
});

module.exports = { unknownPageRouter };
