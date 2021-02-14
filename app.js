import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import { errors } from 'celebrate';

import router from './routes/index.js';
import corsConfig from './configs/corsConfig.js';
import { DEV_DATABASE_URL } from './configs/devEnvConfig.js';
import limiter from './middlewares/limiter.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import centralErrorsHandler from './middlewares/centralErrorsHandler.js';

dotenv.config();
const { DATABASE_URL = DEV_DATABASE_URL } = process.env;
const app = express();

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
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use('*', cors(corsConfig));

// routes
app.use(router);

// errors handlers
app.use(errorLogger);
app.use(errors());
app.use(centralErrorsHandler);

export default app;
