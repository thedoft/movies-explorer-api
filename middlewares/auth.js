import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/unauthorized-err.js';

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new UnauthorizedError('Токен не передан или передан не в том формате');
  }

  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError('Передан некорректный токен');
  }

  req.user = payload;

  return next();
};

export default auth;
