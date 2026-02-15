const { z } = require('zod');
const AppError = require('../utils/AppError');
const Application = require('../models/Application.model');
const Job = require('../models/Job.model');

const applySchema = z.object({
  coverLetter: z.string().max(2000).optional().default(''),
});

module.exports = {
  async apply(req, res) {
    const parsed = applySchema.safeParse(req.body || {});
    if (!parsed.success) throw new AppError('Validation error', 400, parsed.error.flatten());

    const jobId = req.params.jobId;
    const job = await Job.findById(jobId).select('isActive employerId');
    if (!job || !job.isActive) throw new AppError('Job not found', 404);

    if (String(job.employerId) === String(req.user.sub)) throw new AppError('You cannot apply to your own job', 400);

    try {
      const application = await Application.create({
        jobId,
        candidateId: req.user.sub,
        coverLetter: parsed.data.coverLetter,
      });
      return res.status(201).json({ application });
    } catch (e) {
      if (e.code === 11000) throw new AppError('Already applied', 409);
      throw e;
    }
  },

  async my(req, res) {
    const items = await Application.find({ candidateId: req.user.sub })
      .sort({ createdAt: -1 })
      .populate('jobId')
      .lean();
    return res.json({ items });
  },
};
