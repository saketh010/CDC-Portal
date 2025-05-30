import mongoose from 'mongoose';

const dailyAttemptsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  attemptsLeft: {
    type: Number,
    required: true,
    default: 10
  },
  lastReset: {
    type: Date,
    required: true,
    default: () => {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      return now;
    }
  }
});

const DailyAttempts = mongoose.models.DailyAttempts || mongoose.model('DailyAttempts', dailyAttemptsSchema);
export default DailyAttempts;