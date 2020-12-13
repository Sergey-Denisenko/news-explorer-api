const express = require('express'); // подключаю express

const app = express(); // создаю приложение на express
const mongoose = require('mongoose'); // подключаю mongoose
require('dotenv').config();
const helmet = require('helmet'); // Модуль автоматической простановки заголовков безопасности
const bodyParser = require('body-parser'); // подключаю body-parser
const { errors } = require('celebrate'); // Ваидация входящих запросов
const { rateLimiter } = require('./middlewares/rate-limiter'); // ограничение количества запросов
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { routes } = require('./routes/index');
const { errorHandler } = require('./middlewares/error-handler');
const { MONGODB_URI } = require('./config');

const { PORT = 3000 } = process.env; // слущаю порт

// mongoose.connect('mongodb://localhost:27017/newsexplorer', { // подключаюсь к серверу mongo
mongoose.connect(MONGODB_URI, { // подключаюсь к серверу mongo
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('База данных подключена');
  })
  .catch((err) => {
    console.log(`Ошибка подключения базы данных: ${err}`);
  });

app.use(require('cors')());

app.use(helmet()); // Мидлвэр автоматической простановки заголовков безопасности
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rateLimiter); // подключtение rate-limiter / ограничение количества запросов
app.use(requestLogger); // Подключение логера запросов

app.use(routes); // Роутинг
app.use(errorLogger); // Подключение логера ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // Мидлвэр централизованной обработки ошибок

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`); // Вывод в консоль порта, кот. слушает приложение
});
