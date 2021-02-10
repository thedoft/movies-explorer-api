import { celebrate, Joi } from 'celebrate';

const { object, string } = Joi;

const createUserValidator = celebrate({
  body: object().keys({
    email: string().email().required(),
    password: string().required(),
    name: string().min(2).max(30),
  }),
});

const loginValidator = celebrate({
  body: object().keys({
    email: string().email().required(),
    password: string().required(),
  }),
});

const updateUserValidator = celebrate({
  body: object().keys({
    email: string().email().required(),
    name: string().min(2).max(30),
  }),
});

export {
  createUserValidator,
  loginValidator,
  updateUserValidator,
};
