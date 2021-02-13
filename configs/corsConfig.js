const corsConfig = {
  origin: [
    'https://movieexplorer.students.nomoredomains.rocks',
    'http://movieexplorer.students.nomoredomains.rocks',
    'http://localhost:3001',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Origin', 'Referer', 'Accept', 'Authorization'],
  credentials: true,
};

export default corsConfig;
