import supertest from 'supertest';
import mongoose from 'mongoose';

import app from '../app.js';
import { DEV_DATABASE_URL } from '../configs/devEnvConfig.js';
import User from '../models/user.js';
import { testUserData, testUpdatedUserData, testMovieData } from '../data/testData.js';
import { signedOutMessage } from '../utils/constants.js';

const request = supertest(app);
const { email, password, name } = testUserData;
const { newEmail, newName } = testUpdatedUserData;
const {
  country, director, duration, year, description,
  image, trailer, thumbnail, nameRU, nameEN, movieId,
} = testMovieData;

beforeAll(() => mongoose.connect(DEV_DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}));

afterAll(async () => {
  await User.deleteOne({ email: newEmail });
  return mongoose.disconnect();
});

describe('Testing database requests', () => {
  let token;
  let _movieId;

  it('POST /signup returns 201', async () => {
    // send data for register
    const res = await request.post('/signup').send({ email, password, name });
    expect(res.status).toBe(201);
    // get data that was sent
    expect(res.body).toStrictEqual({ email, name });
  });

  it('POST /signin returns 200', async () => {
    // send data for login
    const res = await request.post('/signin').send({ email, password });
    expect(res.status).toBe(200);
    // get data that was sent
    expect(res.body).toStrictEqual({ email, name });
    // get token in cookies
    token = res.header['set-cookie'];
  });

  it('GET /users/me returns 200', async () => {
    const res = await request.get('/users/me').set('Cookie', token);
    expect(res.status).toBe(200);
    // get user data
    expect(res.body).toMatchObject({ email, name });
  });

  it('PATCH /users/me returns 200', async () => {
    // send new data
    const res = await request.patch('/users/me').send({ email: newEmail, name: newName }).set('Cookie', token);
    expect(res.status).toBe(200);
    // get new data
    expect(res.body).toMatchObject({ email: newEmail, name: newName });
  });

  it('POST /movies returns 200', async () => {
    const res = await request.post('/movies').set('Cookie', token).send({
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
    });
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
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
    });
    _movieId = res.body._id;
  });

  it('GET /movies returns 200', async () => {
    const res = await request.get('/movies').set('Cookie', token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
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
        }),
      ]),
    );
  });

  it('DELETE /movies/:movieId returns 200', async () => {
    const res = await request.delete(`/movies/${_movieId}`).set('Cookie', token);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
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
    });
  });

  it('GET /signout returns 200', async () => {
    const res = await request.get('/signout').set('Cookie', token);
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({ message: signedOutMessage });
  });
});
