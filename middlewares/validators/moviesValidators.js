import { celebrate, Joi } from 'celebrate';
import joiObjectId from 'joi-objectid';
import { urlRegEx } from '../../utils/constants.js';

Joi.objectId = joiObjectId(Joi);

const {
  object, string, number, objectId,
} = Joi;

const createMovieValidator = celebrate({
  body: object().keys({
    country: string().required(),
    director: string().required(),
    duration: number().required(),
    year: string().required(),
    description: string().required(),
    image:
      string()
        .required()
        .pattern(urlRegEx),
    trailer:
      string()
        .required()
        .pattern(urlRegEx),
    thumbnail:
      string()
        .required()
        .pattern(urlRegEx),
    nameRU: string().required(),
    nameEN: string().required(),
  }),
});

const deleteMovieValidator = celebrate({
  params: object().keys({
    movieId: objectId().required(),
  }),
});

export {
  createMovieValidator,
  deleteMovieValidator,
};
