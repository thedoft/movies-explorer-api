import { celebrate, Joi } from 'celebrate';
import joiObjectId from 'joi-objectid';
import { urlRegEx } from '../../utils/constants.js';

Joi.objectId = joiObjectId(Joi);

const createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image:
      Joi.string()
        .required()
        .pattern(urlRegEx),
    trailer:
      Joi.string()
        .required()
        .pattern(urlRegEx),
    thumbnail:
      Joi.string()
        .required()
        .pattern(urlRegEx),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

const deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.number().required(),
  }),
});

export {
  createMovieValidator,
  deleteMovieValidator,
};
