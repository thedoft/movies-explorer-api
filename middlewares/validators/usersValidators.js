import { celebrate, Joi } from 'celebrate';
import BadRequestError from '../../errors/BadRequestError.js';
import { BadRequestErrorMessage } from '../../utils/constants.js';

const createUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }).error(new BadRequestError(BadRequestErrorMessage)),
});

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).error(new BadRequestError(BadRequestErrorMessage)),
});

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30),
  }).error(new BadRequestError(BadRequestErrorMessage)),
});

export {
  createUserValidator,
  loginValidator,
  updateUserValidator,
};
