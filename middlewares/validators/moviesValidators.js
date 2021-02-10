import { celebrate, Joi } from 'celebrate';
import joiObjectId from 'joi-objectid';

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
        .pattern(/^(https?:\/\/)(www\.)?([\da-z-.]+)\.([a-z.]{2,6})[\da-zA-Z-._~:?#[\]@!$&'()*+,;=/]*\/?#?$/),
    trailer:
      string()
        .required()
        .pattern(/^(https?:\/\/)(www\.)?([\da-z-.]+)\.([a-z.]{2,6})[\da-zA-Z-._~:?#[\]@!$&'()*+,;=/]*\/?#?$/),
    thumbnail:
      string()
        .required()
        .pattern(/^(https?:\/\/)(www\.)?([\da-z-.]+)\.([a-z.]{2,6})[\da-zA-Z-._~:?#[\]@!$&'()*+,;=/]*\/?#?$/),
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
