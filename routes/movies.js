import express from 'express';
import { createMovieValidator, deleteMovieValidator } from '../middlewares/validators/moviesValidators.js';
import { getMovies, createMovie, deleteMovie } from '../controllers/movies.js';

const moviesRouter = express.Router();

moviesRouter.get('/', getMovies);
moviesRouter.post('/', createMovieValidator, createMovie);
moviesRouter.delete('/movieId', deleteMovieValidator, deleteMovie);

export default moviesRouter;
