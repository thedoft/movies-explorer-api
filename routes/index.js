import express from 'express';
import usersRouter from './users.js';
import moviesRouter from './movies.js';
import { createUserValidator, loginValidator } from '../middlewares/validators/usersValidators.js';
import { createUser, login, signout } from '../controllers/users.js';
import auth from '../middlewares/auth.js';
import NotFoundError from '../errors/NotFoundError.js';

const router = express.Router();

// public routes
router.use('/signup', createUserValidator, createUser);
router.use('/signin', loginValidator, login);

// private routes
router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.get('/signout', signout);
router.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

export default router;
