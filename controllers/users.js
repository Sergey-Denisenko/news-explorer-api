const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // импортирую модель user
const NotFoundError = require('../errors/not-found-err'); // 404
const ConflictError = require('../errors/conflict-error'); // 409

const getMeById = (req, res, next) => { // роутер чтения документа
  User.findById(req.user._id) // нахожу пользователя по запросу параметра id
    .orFail(new NotFoundError('User Not Found / Нет такого пользователя')) // 404
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
};

const createUser = (req, res, next) => { // роутер создания пользователя
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({ // создаю документ на основе пришедших данных
        email: req.body.email,
        password: hash,
        name: req.body.name,
      })
        .then((user) => {
          res.status(201).send({
            _id: user._id,
            email: user.email,
            name: user.name,
          });
        })
        .catch((err) => {
          if (err.name === 'MongoError' && err.code === 11000) {
            next(new ConflictError('Conflict / Пользователь с таким email уже существует')); // 409
          } else next(err); // 500
        });
    })
    .catch(next);
};

// const { NODE_ENV, JWT_SECRET } = process.env;
const { JWT_SECRET } = require('../config');

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // Для создания токена  вызываю метод jwt.sign.
      // Передаю методу sign аргументы: пейлоад и секретный ключ подписи
      // const token = jwt.sign({ _id: user._id },
      // NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getMeById, createUser, login };
