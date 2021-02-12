import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errors } from 'celebrate';

import router from './routes/index.js';
import corsConfig from './configs/corsConfig.js';
import devEnvConfig from './configs/devEnvConfig.js';
import auth from './middlewares/auth.js';
import { createUserValidator, loginValidator } from './middlewares/validators/usersValidators.js';
import { createUser, login, signout } from './controllers/users.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import centralErrorsHandler from './middlewares/centralErrorsHandler.js';
import NotFoundError from './errors/NotFoundError.js';

dotenv.config();
const app = express();

const { DEV_DATABASE_URL } = devEnvConfig;
const { PORT = 3000, DATABASE_URL = DEV_DATABASE_URL } = process.env;

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// app middlewares
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

// errors handlers
app.use(errorLogger);
app.use(errors());
app.use(centralErrorsHandler);

app.listen(PORT);
