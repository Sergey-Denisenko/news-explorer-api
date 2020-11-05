const mongoose = require('mongoose');

const isURL = require('validator/lib/isURL');

const articleSchema = new mongoose.Schema({ // Создаю схему cardSchema
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
    // type: Date,
    // default: Date.now,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator: (v) => isURL(v),
      message: (props) => `${props.value} is not a valid URL!`,
    },
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: (v) => isURL(v),
      message: (props) => `${props.value} is not a valid URL!`,
    },
    required: true,
  },
  owner: { // _id пользователя, сохранившего статью
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false, // Это свойство запрещает выводить хеш пароля
  },
});

module.exports = mongoose.model('article', articleSchema);
