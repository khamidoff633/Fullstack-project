const { z } = require('zod');
const AppError = require('../utils/AppError');
const Job = require('../models/Job.model');

const createSchema = z.object({
  title: z.string().min(2).max(120),
  companyName: z.string().min(2).max(120),
  location: z.string().min(2).max(80),
  type: z.enum(['Full-time', 'Part-time', 'Contract', 'Internship']).default('Full-time'),
  remote: z.boolean().default(false),
  salaryMin: z.number().int().nonnegative().nullable().optional(),
  salaryMax: z.number().int().nonnegative().nullable().optional(),
  description: z.string().min(20).max(5000),
  tags: z.array(z.string().min(1).max(30)).max(20).optional().default([]),
});

module.exports = {
  async list(req, res) {
    const q = String(req.query.q || '').trim();
    const type = req.query.type;
    const remote = req.query.remote;
    const location = String(req.query.location || '').trim();
    const page = Math.max(1, Number(req.query.page || 1));
    const limit = Math.min(50, Math.max(1, Number(req.query.limit || 10)));

    const filter = { isActive: true };
    if (q) filter.$or = [{ title: new RegExp(q, 'i') }, { companyName: new RegExp(q, 'i') }];
    if (type) filter.type = type;
    if (remote === 'true') filter.remote = true;
    if (remote === 'false') filter.remote = false;
    if (location) filter.location = new RegExp(location, 'i');

    const total = await Job.countDocuments(filter);
    const items = await Job.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return res.json({
      items,
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    });
  },

  async getOne(req, res) {
    const id = req.params.id;
    const job = await Job.findById(id).lean();
    if (!job || !job.isActive) throw new AppError('Job not found', 404);

    // increase views
    Job.updateOne({ _id: id }, { $inc: { views: 1 } }).catch(() => {});

    return res.json({ job });
  },

  async create(req, res) {
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) throw new AppError('Validation error', 400, parsed.error.flatten());

    const payload = parsed.data;
    if (payload.salaryMin != null && payload.salaryMax != null && payload.salaryMin > payload.salaryMax) {
      throw new AppError('salaryMin cannot be greater than salaryMax', 400);
    }

    const job = await Job.create({
      employerId: req.user.sub,
      ...payload,
    });

    return res.status(201).json({ job });
  },
};
