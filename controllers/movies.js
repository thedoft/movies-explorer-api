import Movie from '../models/movie.js';
import NotFoundError from '../errors/NotFoundError.js';
import ForbiddenError from '../errors/ForbiddenError.js';
import { documentNotFoundErrorMessage, forbiddenErrorMessage } from '../utils/constants.js';

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({}).orFail(new NotFoundError(documentNotFoundErrorMessage));

    return res.send(movies);
  } catch (err) {
    return next(err);
  }
};

const createMovie = async (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailer, thumbnail, nameRU, nameEN,
  } = req.body;

  try {
    const movie = await Movie.create({
      country, director, duration, year, description, image, trailer, thumbnail, nameRU, nameEN,
    });

    return res.send(movie);
  } catch (err) {
    return next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  const { _id } = req.params.movieId;

  try {
    const movie = await Movie
      .findById(_id)
      .select('+owner')
      .orFail(new NotFoundError(documentNotFoundErrorMessage));

    if (JSON.stringify(movie.owner) !== JSON.stringify(req.user._id)) {
      throw new ForbiddenError(forbiddenErrorMessage);
    }
    await Movie.deleteOne({ _id });

    return res.send(movie);
  } catch (err) {
    return next(err);
  }
};

export {
  getMovies,
  createMovie,
  deleteMovie,
};
