import mongoose from 'mongoose';

const otpAttemptSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true
  },
  otp: {
    type: String,
    required: true
  },
  used: {
    type: Boolean,
    default: false
  },
  expiresAt: {
    type: Date,
    required: true
  },
  lastAttempt: {
    type: Date,
    default: Date.now
  },
  resetAt: {
    type: Date,
    default: function() {
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      return midnight;
    }
  }
}, { timestamps: true });
otpAttemptSchema.index({ email: 1, used: 1, expiresAt: 1 });
otpAttemptSchema.index({ email: 1, lastAttempt: 1 });

const OtpAttempt = mongoose.models.OtpAttempt || mongoose.model('OtpAttempt', otpAttemptSchema);
export default OtpAttempt;