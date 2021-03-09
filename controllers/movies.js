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
    country, director, duration, year, description,
    image, trailer, thumbnail, nameRU, nameEN, movieId,
  } = req.body;

  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      thumbnail,
      nameRU,
      nameEN,
      movieId,
      owner: req.user._id,
    });

    return res.send(movie);
  } catch (err) {
    return next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  const { movieId } = req.params;

  try {
    const movie = await Movie
      .findOne({ movieId })
      .select('+owner')
      .orFail(new NotFoundError(documentNotFoundErrorMessage));

    if (movie.owner.toString() !== req.user._id.toString()) {
      throw new ForbiddenError(forbiddenErrorMessage);
    }
    await Movie.deleteOne({ movieId });

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
