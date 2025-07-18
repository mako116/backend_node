import rateLimit from 'express-rate-limit';

const throttle = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.'
});

export default throttle;
