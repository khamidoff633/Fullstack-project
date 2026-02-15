const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema(
  {
    title: String,
    company: String,
    start: String,
    end: String,
    description: String,
  },
  { _id: false }
);

const EducationSchema = new mongoose.Schema(
  {
    school: String,
    degree: String,
    start: String,
    end: String,
  },
  { _id: false }
);

const LinksSchema = new mongoose.Schema(
  {
    github: String,
    linkedin: String,
    portfolio: String,
    telegram: String,
    website: String,
  },
  { _id: false }
);

const ProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    username: { type: String, unique: true, required: true, lowercase: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    bio: { type: String, default: '', trim: true, maxlength: 280 },
    location: { type: String, default: '', trim: true },
    avatarUrl: { type: String, default: '' },
    coverUrl: { type: String, default: '' },
    skills: { type: [String], default: [] },
    links: { type: LinksSchema, default: {} },

    // candidate fields
    resumeUrl: { type: String, default: '' },
    experience: { type: [ExperienceSchema], default: [] },
    education: { type: [EducationSchema], default: [] },

    // employer fields
    companyName: { type: String, default: '' },
    companyLogoUrl: { type: String, default: '' },
    industry: { type: String, default: '' },
    companySize: { type: String, default: '' },
    companyDescription: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', ProfileSchema);
