import { celebrate, Joi } from 'celebrate';
import objectId from 'joi-objectid';

Joi.objectId = objectId(Joi);

const createMovieValidator = celebrate({

});

const deleteMovieValidator = celebrate({

});

export {
  createMovieValidator,
  deleteMovieValidator,
};
