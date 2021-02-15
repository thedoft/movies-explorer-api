const centralErrorsHandler = (err, req, res, next) => {
  const { statusCode, message } = err;

  if (statusCode) {
    return res.status(statusCode).send({ message });
  }

  res.status(500).send({ message: 'На сервере произошла ошибка' });
  return next();
};

export default centralErrorsHandler;
