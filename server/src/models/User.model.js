const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['candidate', 'employer', 'admin'], default: 'candidate' },
    profileCompleted: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
    refreshTokenHash: { type: String, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
