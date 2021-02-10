import express from 'express';
import { updateUserValidator } from '../middlewares/validators/usersValidators.js';
import { getUser, updateUser } from '../controllers/users.js';

const usersRouter = express.Router();

usersRouter.get('/me', getUser);
usersRouter.put('/me', updateUserValidator, updateUser);

export default usersRouter;
