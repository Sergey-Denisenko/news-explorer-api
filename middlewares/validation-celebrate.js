const { celebrate, Joi } = require('celebrate'); // Ваидация входящих запросов

// const urlRegex = /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?#?$/;
const urlRegex = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const validationSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email({ tlds: { allow: false } }).required()
      .messages({
        'string.base': 'Значение "email" должно быть строкой',
        'string.empty': 'Поле "email" не может быть пустым',
        'string.email': 'Значение "email" должно иметь правильный формат',
        // 'any.require': 'Поле "name" - обязательное поле',
      }),
    password: Joi.string().min(8).required()
      .messages({
        'string.base': 'Значение "password" должно быть строкой',
        'string.empty': 'Поле "password" не может быть пустым',
        'string.min': 'Значение "password" должно быть минимум 8 символа',
        // 'any.require': 'Поле "name" - обязательное поле',
      }),
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.base': 'Значение "name" должно быть строкой',
        'string.empty': 'Поле "name" не может быть пустым',
        'string.min': 'Значение "name" должно быть минимум 2 символа',
        'string.max': 'Значение "name" должно быть максимум 30 символов',
        // 'any.require': 'Поле "name" - обязательное поле',
      }),
  }),
});

const validationSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email({ tlds: { allow: false } }).required()
      .messages({
        'string.base': 'Значение "email" должно быть строкой',
        'string.empty': 'Поле "email" не может быть пустым',
        'string.email': 'Значение "email" должно иметь правильный формат',
        // 'any.require': 'Поле "name" - обязательное поле',
      }),
    password: Joi.string().min(8).required()
      .messages({
        'string.base': 'Значение "password" должно быть строкой',
        'string.empty': 'Поле "password" не может быть пустым',
        'string.min': 'Значение "password" должно быть минимум 8 символа',
        // 'any.require': 'Поле "name" - обязательное поле',
      }),
  }),
});

const validationCurrentUser = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24)
      .messages({
        'string.base': 'Значение "userId" должно быть строкой',
        'string.empty': 'Значение "userId" не может быть пустым',
        'string.hex': 'Значение "userId" должно иметь hex формат',
        'string.length': 'Значение "userId" должен состоять из 24 символов',
      }),
  }),
});

// Валидация при создании новой статьи
const validationNewArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required()
      .messages({
        'string.base': 'Значение "keyword" должно быть строкой',
        'string.empty': 'Значение "keyword" не может быть пустым',
      }),
    title: Joi.string().required()
      .messages({
        'string.base': 'Значение "title" должно быть строкой',
        'string.empty': 'Значение "title" не может быть пустым',
      }),
    text: Joi.string().required()
      .messages({
        'string.base': 'Значение "text" должно быть строкой',
        'string.empty': 'Значение "text" не может быть пустым',
      }),
    date: Joi.string().required()
      .messages({
        'string.base': 'Значение "date" должно быть строкой',
        'string.empty': 'Значение "date" не может быть пустым',
      }),
    source: Joi.string().required()
      .messages({
        'string.base': 'Значение "source" должно быть строкой',
        'string.empty': 'Значение "source" не может быть пустым',
      }),
    link: Joi.string().pattern(urlRegex, 'URL').required()
      .messages({
        'string.base': 'Значение "link" должно быть строкой',
        'string.empty': 'Значение "link" не может быть пустым',
        'string.uri': 'Значение "link" должно быть валидным URL',
      }),
    image: Joi.string().pattern(urlRegex, 'URL').required()
      .messages({
        'string.base': 'Значение "image" должно быть строкой',
        'string.empty': 'Значение "image" не может быть пустым',
        'string.uri': 'Значение "image" должно быть валидным URL',
      }),
  }).unknown(),
});
// Валидация при удалении сохранённой статьи по _id
const validationDeleteArticle = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24)
      .messages({
        'string.base': 'Значение "articleId" должно быть строкой',
        'string.empty': 'Значение "articleId" не может быть пустым',
        'string.hex': 'Значение "articleId" должно иметь hex формат',
        'string.length': 'Значение "articleId" должен состоять из 24 символов',
      }),
  }).unknown(),
});

module.exports = {
  validationSignup,
  validationSignin,
  validationCurrentUser,
  validationNewArticle,
  validationDeleteArticle,
};
