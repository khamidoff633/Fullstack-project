const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const { JWT_ACCESS_SECRET } = require('../config/env');

function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return next(new AppError('Unauthorized', 401));
  try {
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
    req.user = decoded;
    return next();
  } catch (e) {
    return next(new AppError('Unauthorized', 401));
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return next(new AppError('Unauthorized', 401));
    if (!roles.includes(req.user.role)) return next(new AppError('Forbidden', 403));
    return next();
  };
}

module.exports = { requireAuth, requireRole };
