const rateLimit = require('express-rate-limit'); // Модуль ограничения количества запросов

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 1000, // можно совершить максимум 1000 запросов с одного IP
});

module.exports = { rateLimiter };
