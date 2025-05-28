import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please provide the company name'],
    trim: true,
  },
  about: {
    type: String,
    required: [true, 'Please provide information about the company'],
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'Please provide the job title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide the job description'],
    trim: true,
  },
  CGPA: {
    type: Number,
    required: [true, 'Please provide the required CGPA'],
  },
  stipend: {
    type: Number,
    required: false,
  },
  oaDate: {
    type: String,
    required: [true, 'Please provide the Online Assessment date'],
  },
  interviewDate: {
    type: String,
    required: [true, 'Please provide the interview date'],
  },
  location: {
    type: String,
    required: [true, 'Please provide the job location'],
    trim: true,
  },
  duration: {
    type: String,
    required: [true, 'Please provide the duration of the internship'],
    trim: true,
  },
  imageLink: {
    type: String,
    required: false,
    trim: true,
  },
  isOpen: {
    type: Boolean,
    required: [true, 'Please specify if the job is open or closed'],
    default: true,
  },
});

// Prevent recompiling model if it already exists
export default mongoose.models.Job || mongoose.model('Job', JobSchema);
