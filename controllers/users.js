import User from '../models/user.js';

const createUser = (req, res, next) => {};

const login = (req, res, next) => {};

const signout = (req, res) => (
  res
    .clearCookie('jwt', { httpOnly: true, sameSite: true })
    .send({ message: 'Signed Out' })
);

const getUser = (req, res, next) => {
  User.findById(req.user._id);
};

const updateUser = (req, res, next) => {};

export {
  createUser,
  login,
  signout,
  getUser,
  updateUser,
};
