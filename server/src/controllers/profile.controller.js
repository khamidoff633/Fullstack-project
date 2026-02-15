const { z } = require('zod');
const AppError = require('../utils/AppError');
const Profile = require('../models/Profile.model');
const User = require('../models/User.model');

const usernameRegex = /^[a-z0-9](?:[a-z0-9_\-]{1,28}[a-z0-9])?$/;

const baseSchema = z.object({
  username: z.string().min(3).max(30).regex(usernameRegex, 'Invalid username'),
  displayName: z.string().min(2).max(60),
  bio: z.string().max(280).optional().default(''),
  location: z.string().max(60).optional().default(''),
  avatarUrl: z.string().url().optional().or(z.literal('')).optional(),
  coverUrl: z.string().url().optional().or(z.literal('')).optional(),
  skills: z.array(z.string().min(1).max(30)).max(50).optional().default([]),
  links: z
    .object({
      github: z.string().url().optional().or(z.literal('')).optional(),
      linkedin: z.string().url().optional().or(z.literal('')).optional(),
      portfolio: z.string().url().optional().or(z.literal('')).optional(),
      telegram: z.string().optional().or(z.literal('')).optional(),
      website: z.string().url().optional().or(z.literal('')).optional(),
    })
    .optional()
    .default({}),

  // candidate
  resumeUrl: z.string().url().optional().or(z.literal('')).optional(),
  experience: z
    .array(
      z.object({
        title: z.string().max(60).optional().default(''),
        company: z.string().max(60).optional().default(''),
        start: z.string().max(20).optional().default(''),
        end: z.string().max(20).optional().default(''),
        description: z.string().max(500).optional().default(''),
      })
    )
    .optional()
    .default([]),
  education: z
    .array(
      z.object({
        school: z.string().max(80).optional().default(''),
        degree: z.string().max(80).optional().default(''),
        start: z.string().max(20).optional().default(''),
        end: z.string().max(20).optional().default(''),
      })
    )
    .optional()
    .default([]),

  // employer
  companyName: z.string().max(80).optional().default(''),
  companyLogoUrl: z.string().url().optional().or(z.literal('')).optional(),
  industry: z.string().max(60).optional().default(''),
  companySize: z.string().max(30).optional().default(''),
  companyDescription: z.string().max(500).optional().default(''),
});

module.exports = {
  async create(req, res) {
    const parsed = baseSchema.safeParse(req.body);
    if (!parsed.success) throw new AppError('Validation error', 400, parsed.error.flatten());

    const userId = req.user.sub;
    const user = await User.findById(userId).select('role profileCompleted');
    if (!user) throw new AppError('Unauthorized', 401);
    if (user.profileCompleted) throw new AppError('Profile already exists', 409);

    const payload = parsed.data;
    payload.username = payload.username.toLowerCase();

    // role-specific minimal requirements
    if (user.role === 'employer' && !payload.companyName.trim()) {
      throw new AppError('companyName is required for employer profile', 400);
    }

    const profile = await Profile.create({ userId, ...payload });

    await User.findByIdAndUpdate(userId, { profileCompleted: true });

    return res.status(201).json({ profile });
  },

  async me(req, res) {
    const profile = await Profile.findOne({ userId: req.user.sub });
    if (!profile) throw new AppError('Profile not found', 404);
    return res.json({ profile });
  },

  async updateMe(req, res) {
    const parsed = baseSchema.partial().safeParse(req.body);
    if (!parsed.success) throw new AppError('Validation error', 400, parsed.error.flatten());

    const user = await User.findById(req.user.sub).select('role');
    if (!user) throw new AppError('Unauthorized', 401);

    const updates = { ...parsed.data };
    if (updates.username) updates.username = updates.username.toLowerCase();

    if (user.role === 'employer' && updates.companyName !== undefined && !String(updates.companyName).trim()) {
      throw new AppError('companyName cannot be empty for employer profile', 400);
    }

    const profile = await Profile.findOneAndUpdate({ userId: req.user.sub }, updates, {
      new: true,
      runValidators: true,
    });

    if (!profile) throw new AppError('Profile not found', 404);
    return res.json({ profile });
  },

  async getByUsername(req, res) {
    const username = String(req.params.username || '').toLowerCase();
    const profile = await Profile.findOne({ username }).select('-userId');
    if (!profile) throw new AppError('Profile not found', 404);
    return res.json({ profile });
  },
};
