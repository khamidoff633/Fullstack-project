const AppError = require('../utils/AppError');

module.exports = function errorMiddleware(err, req, res, next) {
  const status = err.statusCode || 500;
  const payload = {
    message: err.message || 'Internal Server Error',
  };
  if (err instanceof AppError && err.details) payload.details = err.details;
  if (process.env.NODE_ENV !== 'production' && err.stack) payload.stack = err.stack;
  return res.status(status).json(payload);
};
