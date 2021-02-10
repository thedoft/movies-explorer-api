import mongoose from 'mongoose';
import validator from 'validator';
import { urlValidatorMessage } from '../utils/constants.js';

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле "country" обязательно'],
  },
  director: {
    type: String,
    required: [true, 'Поле "director" обязательно'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле "duration" обязательно'],
  },
  year: {
    type: String,
    required: [true, 'Поле "year" обязательно'],
  },
  description: {
    type: String,
    required: [true, 'Поле "description" обязательно'],
  },
  image: {
    type: String,
    required: [true, 'Поле "image" обязательно'],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: urlValidatorMessage,
    },
  },
  trailer: {
    type: String,
    required: [true, 'Поле "trailer" обязательно'],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: urlValidatorMessage,
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле "thumbnail" обязательно'],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: urlValidatorMessage,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле "owner" обязательно'],
    select: false,
  },
  nameRU: {
    type: String,
    required: [true, 'Поле "nameRU" обязательно'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле "nameEN" обязательно'],
  },
});

const Movie = mongoose.model('movie', movieSchema);

export default Movie;
