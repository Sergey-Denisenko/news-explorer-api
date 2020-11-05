const { celebrate, Joi } = require('celebrate'); // Ваидация входящих запросов

const urlRegex = /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?#?$/;

const validationSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const validationSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(8).required(),
  }),
});

const validationCurrentUser = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
});

// Валидация при создании новой статьи
const validationNewArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().pattern(urlRegex).required(),
    image: Joi.string().pattern(urlRegex).required(),
  }).unknown(),
});
// Валидация при удалении сохранённой статьи по _id
const validationDeleteArticle = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24),
  }).unknown(),
});

module.exports = {
  validationSignup,
  validationSignin,
  validationCurrentUser,
  validationNewArticle,
  validationDeleteArticle,
};
