import { celebrate, Joi } from 'celebrate';
import objectId from 'joi-objectid';

Joi.objectId = objectId(Joi);

const createUserValidator = celebrate({

});

const loginValidator = celebrate({

});

const updateUserValidator = celebrate({

});

export {
  createUserValidator,
  loginValidator,
  updateUserValidator,
};
