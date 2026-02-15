const AppError = require('../utils/AppError');
const User = require('../models/User.model');

function requireProfileCompleted() {
  return async (req, res, next) => {
    const userId = req.user?.sub;
    if (!userId) return next(new AppError('Unauthorized', 401));
    const user = await User.findById(userId).select('profileCompleted');
    if (!user) return next(new AppError('Unauthorized', 401));
    if (!user.profileCompleted) return next(new AppError('Profile not completed', 428));
    return next();
  };
}

module.exports = { requireProfileCompleted };
