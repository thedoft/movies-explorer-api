import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

import UnauthorizedError from '../errors/UnauthorizedError.js';
import { incorrectAuthDataMessage, requiredValidationMessage, documentNotFoundErrorMessage } from '../utils/constants.js';
import NotFoundError from '../errors/NotFoundError.js';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, requiredValidationMessage('email')],
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
    required: [true, requiredValidationMessage('password')],
    select: false,
  },
  name: {
    type: String,
    required: [true, requiredValidationMessage('name')],
    minlength: [2, 'Минимальная длина имени - 2 символа'],
    maxlength: [30, 'Максимальная длина имени - 30 символов'],
  },
});

userSchema.statics.findUserByCredentials = async function f(email, password) {
  const user = await this.findOne({ email }).select('+password').orFail(new NotFoundError(documentNotFoundErrorMessage));

  if (!user) {
    throw new UnauthorizedError(incorrectAuthDataMessage);
  }
  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    throw new UnauthorizedError(incorrectAuthDataMessage);
  }
  return user;
};

const User = mongoose.model('user', userSchema);

export default User;
