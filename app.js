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
import devEnvConfig from './configs/devEnvConfig.js';
import rateLimitConfig from './configs/rateLimitConfig.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import centralErrorsHandler from './middlewares/centralErrorsHandler.js';

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
app.use(helmet());
app.use(rateLimitConfig);
app.use(requestLogger);
app.use('*', cors(corsConfig));

// routes
app.use(router);

// errors handlers
app.use(errorLogger);
app.use(errors());
app.use(centralErrorsHandler);

app.listen(PORT);
