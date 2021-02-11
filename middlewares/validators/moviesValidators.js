import { celebrate, Joi } from 'celebrate';
import joiObjectId from 'joi-objectid';
import { urlRegEx, BadRequestErrorMessage } from '../../utils/constants.js';
import BadRequestError from '../../errors/BadRequestError.js';

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
  }).error(new BadRequestError(BadRequestErrorMessage)),
});

const deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.objectId().required(),
  }).error(new BadRequestError(BadRequestErrorMessage)),
});

export {
  createMovieValidator,
  deleteMovieValidator,
};
