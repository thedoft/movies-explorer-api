const corsConfig = {
  origin: [
    'https://thedoft.movies-explorer.students.nomoredomains.rocks',
    'http://thedoft.movies-explorer.students.nomoredomains.rocks',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Origin', 'Referer', 'Accept', 'Authorization'],
  credentials: true,
};

export default corsConfig;
