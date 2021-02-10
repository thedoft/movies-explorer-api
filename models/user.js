import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import UnauthorizedError from '../errors/UnauthorizedError.js';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email обязателен'],
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Строка должна содержать Email',
    },
  },
  password: {
    type: String,
    required: [true, 'Пароль обязателен'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Имя обязательно'],
    minlength: [2, 'Минимальная длина имени - 2 символа'],
    maxlength: [30, 'Максимальная длина имени - 30 символов'],
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((isMatched) => {
          if (!isMatched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          return user;
        });
    });
};

const User = mongoose.model('user', userSchema);

export default User;
