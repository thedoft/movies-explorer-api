import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

import UnauthorizedError from '../errors/UnauthorizedError.js';
import { incorrectAuthDataMessage } from '../utils/constants.js';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле "email" обязательно'],
    unique: [true, 'Email уникален'],
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Строка должна содержать Email',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" обязательно'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Поле "name" обязательно'],
    minlength: [2, 'Минимальная длина имени - 2 символа'],
    maxlength: [30, 'Максимальная длина имени - 30 символов'],
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(incorrectAuthDataMessage);
      }
      return bcrypt.compare(password, user.password)
        .then((isMatched) => {
          if (!isMatched) {
            throw new UnauthorizedError(incorrectAuthDataMessage);
          }
          return user;
        });
    });
};

const User = mongoose.model('user', userSchema);

export default User;
