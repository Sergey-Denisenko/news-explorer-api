// Мидлвэр централизованной обработки ошибок
const errorHandler = (err, req, res, next) => {
  // console.log('сработала централизованная обработка ошибок');
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
};

module.exports = { errorHandler };
