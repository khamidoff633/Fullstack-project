const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
  {
    employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    companyName: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    type: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], default: 'Full-time' },
    remote: { type: Boolean, default: false },
    salaryMin: { type: Number, default: null },
    salaryMax: { type: Number, default: null },
    description: { type: String, required: true },
    tags: { type: [String], default: [] },
    views: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', JobSchema);
