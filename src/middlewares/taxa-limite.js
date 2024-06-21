const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
  max: 100, // Maximum requests allowed within the window
  message: 'You have exceeded the 100 requests in 24 hrs limit!',
  standardHeaders: true, // Include standard headers (e.g., Retry-After)
  legacyHeaders: false, // Exclude legacy headers (e.g., X-RateLimit-Limit)
});

module.exports = rateLimiter;
