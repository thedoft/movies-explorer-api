import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errors } from 'celebrate';

import router from './routes/index.js';

import corsConfig from './configs/cors.js';
import auth from './middlewares/auth.js';
import { createUserValidator, loginValidator } from './middlewares/validators/usersValidators.js';
import { createUser, login, signout } from './controllers/users.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';

import NotFoundError from './errors/NotFoundError.js';

dotenv.config();

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/movie-explorer-db', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

app.use('*', cors(corsConfig));

// public routes
app.use('/signup', createUserValidator, createUser);
app.use('/signin', loginValidator, login);

// private routes
app.use(auth, router);
app.get('/signout', signout);

app.get('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode, message } = err;

  if (statusCode) {
    return res.status(statusCode).send({ message });
  }

  return res.status(500).send({ message: 'На сервере произошла ошибка' });
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`)); // eslint-disable-line
