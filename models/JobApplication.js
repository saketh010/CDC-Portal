import mongoose from 'mongoose';

const JobApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  usernames: [{
    type: String,
    required: true
  }],
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.JobApplication || mongoose.model('JobApplication', JobApplicationSchema);
