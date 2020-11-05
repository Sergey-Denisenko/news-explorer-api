const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({ // Создаю схему userSchema
  email: {
    type: String,
    unique: true,
    require: true,
    default: () => 'Enter youre E-mail here',
    validate: {
      validator: (v) => isEmail(v),
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlenght: 8,
    select: false, // Это свойство запрещает выводить хеш пароля
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    default: () => 'Enter youre name here',
  },
});

const AuthError = require('../errors/auth-error');

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Ошибка аутентификации');
      }

      return bcrypt.compare(password, user.password)
        .then((compareOk) => {
          if (!compareOk) {
            throw new AuthError('Ошибка аутентификации');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);

// email: {
//   type: String,
//   unique: [true, 'Email должен быть уникальный'],
//   require: [true, 'Поле Email должно быть заполнен'],
//   default: () => 'Enter youre E-mail here',
//   validate: {
//     validator: (v) => isEmail(v),
//     message: 'Email должен иметь правильный формат!',
//   },
// },

// password: {
//   type: String,
//   required: [true, 'Поле Пароль должно быть заполнен'],
//   minlenght: [8, 'Пароль должен быть не менее 8 символов'],
//   select: false, // Это свойство запрещает выводить хеш пароля
// },

// name: {
//   type: String,
//   minlength: [2, 'Мин. длина имени 2 символа'],
//   maxlength: [30, 'Макс. длина имени 30 символов'],
//   required: [true, 'Поле Имя должно быть заполнено'],
//   default: () => 'Enter youre name here',
// },
// });
