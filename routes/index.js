import express from 'express';

import usersRouter from './users.js';
import moviesRouter from './movies.js';

const router = express.Router();

router.use(usersRouter);
router.use(moviesRouter);

export default router;
