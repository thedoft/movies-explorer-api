import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError.js';
import devEnvConfig from '../configs/devEnvConfig.js';

const { DEV_JWT_SECRET } = devEnvConfig;
const { JWT_SECRET = DEV_JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new UnauthorizedError('Токен не передан или передан не в том формате');
  }

  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError('Передан некорректный токен');
  }

  req.user = payload;

  return next();
};

export default auth;
