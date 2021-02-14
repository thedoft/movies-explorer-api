import rateLimit from 'express-rate-limit';

const rateLimitConfig = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

export default rateLimitConfig;
