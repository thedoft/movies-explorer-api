const centralErrorsHandler = (err, req, res, next) => {
  const { statusCode, message } = err;

  if (statusCode) {
    return res.status(statusCode).send({ message });
  }

  return res.status(500).send({ message: 'На сервере произошла ошибка' });
};

export default centralErrorsHandler;
