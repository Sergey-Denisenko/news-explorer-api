const jwt = require('jsonwebtoken');

// const { NODE_ENV, JWT_SECRET } = process.env;
const { JWT_SECRET } = require('../config');

const AuthError = require('../errors/auth-error');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization && authorization.replace('Bearer ', '');
  let payload;

  try {
    // payload = jwt.verify(token,
    // NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
    payload = jwt.verify(token, JWT_SECRET, { expiresIn: '7d' });
  } catch (err) {
    next(new AuthError('Unauthorized / Необходима авторизация')); // 401
  }

  req.user = payload; // записываю пейлоуд в объект запроса

  next(); // пускаю запрос дальше
};
