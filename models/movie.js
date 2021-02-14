import mongoose from 'mongoose';
import validator from 'validator';
import { urlValidatorMessage, requiredValidationMessage } from '../utils/constants.js';

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, requiredValidationMessage('country')],
  },
  director: {
    type: String,
    required: [true, requiredValidationMessage('director')],
  },
  duration: {
    type: Number,
    required: [true, requiredValidationMessage('duration')],
  },
  year: {
    type: String,
    required: [true, requiredValidationMessage('year')],
  },
  description: {
    type: String,
    required: [true, requiredValidationMessage('description')],
  },
  image: {
    type: String,
    required: [true, requiredValidationMessage('image')],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: urlValidatorMessage,
    },
  },
  trailer: {
    type: String,
    required: [true, requiredValidationMessage('trailer')],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: urlValidatorMessage,
    },
  },
  thumbnail: {
    type: String,
    required: [true, requiredValidationMessage('thumbnail')],
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
    select: false,
    required: true,
  },
  movieId: {
    type: Number,
    required: [true, requiredValidationMessage('movieId')],
  },
  nameRU: {
    type: String,
    required: [true, requiredValidationMessage('nameRU')],
  },
  nameEN: {
    type: String,
    required: [true, requiredValidationMessage('nameEN')],
  },
});

const Movie = mongoose.model('movie', movieSchema);

export default Movie;
