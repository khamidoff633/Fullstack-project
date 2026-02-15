const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { z } = require('zod');

const User = require('../models/User.model');
const AppError = require('../utils/AppError');
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require('../config/env');

const registerSchema = z.object({
  fullName: z.string().min(2).max(60),
  email: z.string().email(),
  password: z.string().min(8).max(72),
  role: z.enum(['candidate', 'employer']).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function signAccessToken(user) {
  return jwt.sign(
    { sub: String(user._id), role: user.role },
    JWT_ACCESS_SECRET,
    { expiresIn: '15m' }
  );
}

function signRefreshToken(user) {
  return jwt.sign(
    { sub: String(user._id), v: 1 },
    JWT_REFRESH_SECRET,
    { expiresIn: '30d' }
  );
}

module.exports = {
  async register(req, res) {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) throw new AppError('Validation error', 400, parsed.error.flatten());

    const { fullName, email, password, role } = parsed.data;

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) throw new AppError('Email already in use', 409);

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      passwordHash,
      role: role || 'candidate',
      emailVerified: true, // demo: set true; later we can add OTP
    });

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);
    user.refreshTokenHash = await bcrypt.hash(refreshToken, 12);
    await user.save();

    return res.status(201).json({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profileCompleted: user.profileCompleted,
      },
      accessToken,
      refreshToken,
    });
  },

  async login(req, res) {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) throw new AppError('Validation error', 400, parsed.error.flatten());

    const { email, password } = parsed.data;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) throw new AppError('Invalid credentials', 401);

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new AppError('Invalid credentials', 401);

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);
    user.refreshTokenHash = await bcrypt.hash(refreshToken, 12);
    await user.save();

    return res.json({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profileCompleted: user.profileCompleted,
      },
      accessToken,
      refreshToken,
    });
  },

  async refresh(req, res) {
    const token = req.body?.refreshToken;
    if (!token) throw new AppError('Refresh token required', 400);

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_REFRESH_SECRET);
    } catch (e) {
      throw new AppError('Invalid refresh token', 401);
    }

    const user = await User.findById(decoded.sub);
    if (!user || !user.refreshTokenHash) throw new AppError('Invalid refresh token', 401);

    const ok = await bcrypt.compare(token, user.refreshTokenHash);
    if (!ok) throw new AppError('Invalid refresh token', 401);

    const accessToken = signAccessToken(user);
    return res.json({ accessToken });
  },

  async logout(req, res) {
    const token = req.body?.refreshToken;
    if (!token) return res.json({ ok: true });

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_REFRESH_SECRET);
    } catch (e) {
      return res.json({ ok: true });
    }

    await User.findByIdAndUpdate(decoded.sub, { refreshTokenHash: null });
    return res.json({ ok: true });
  },

  async me(req, res) {
    const user = await User.findById(req.user.sub).select('fullName email role profileCompleted emailVerified');
    if (!user) throw new AppError('Unauthorized', 401);
    return res.json({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profileCompleted: user.profileCompleted,
        emailVerified: user.emailVerified,
      },
    });
  },
};
