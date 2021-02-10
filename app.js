import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errors } from 'celebrate';

import corsConfig from './middlewares/cors.js';
import auth from './middlewares/auth.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';
// import { createUserValidation, loginValidation } from './middlewares/celebrate';
// import { createUser, login, signout } from './controllers/users';

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
// ...
app.get('/', (req, res) => res.send({ message: 'Hello' }));
app.use(auth);

// private routes
// app.use(require('./routes/index'));
// app.get('/signout', signout);

app.get('*', () => {
  try {
    throw new NotFoundError('Запрашиваемый ресурс не найден');
  } catch (err) {
    throw new NotFoundError('Запрашиваемый ресурс не найден');
  }
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
