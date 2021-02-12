import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import escapeHtml from 'escape-html';

import User from '../models/user.js';
import NotFoundError from '../errors/NotFoundError.js';
import ConflictError from '../errors/ConflictError.js';
import { documentNotFoundErrorMessage, userExistErrorMessage } from '../utils/constants.js';
import devEnvConfig from '../configs/devEnvConfig.js';

const { DEV_JWT_SECRET } = devEnvConfig;
const { JWT_SECRET = DEV_JWT_SECRET } = process.env;

const createUser = async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    const existedUser = await User.findOne({ email });

    if (existedUser) {
      throw new ConflictError(userExistErrorMessage);
    }
    const hash = await bcrypt.hash(password, 10);
    await User.create({ email, name, password: hash });

    return res.status(201).send({ email, name });
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByCredentials(email, escapeHtml(password));
    const token = jwt.sign(
      { _id: user._id }, JWT_SECRET, { expiresIn: '7d' },
    );

    return res
      .cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
        maxAge: (3600 * 24 * 7),
      })
      .send(user);
  } catch (err) {
    return next(err);
  }
};

const signout = (req, res) => (
  res.clearCookie('jwt', { httpOnly: true, sameSite: true }).send({ message: 'Signed Out' })
);

const getUser = async (req, res, next) => {
  try {
    const user = await User
      .findById(req.user._id)
      .orFail(new NotFoundError(documentNotFoundErrorMessage));

    return res.send(user);
  } catch (err) {
    return next(err);
  }
};

const updateUser = async (req, res, next) => {
  const { email, name } = req.body;

  try {
    const user = await User
      .findByIdAndUpdate(
        req.user._id,
        { email, name },
        { new: true, runValidators: true },
      )
      .orFail(new NotFoundError(documentNotFoundErrorMessage));

    return res.send(user);
  } catch (err) {
    return next(err);
  }
};

export {
  createUser,
  login,
  signout,
  getUser,
  updateUser,
};
