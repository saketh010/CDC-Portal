import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true
  },
  candidateName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['FT', 'Intern'],
    required: true
  }
});

const selectionSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  selectedStudents: [studentSchema]
});

export default mongoose.models.Selection || mongoose.model('Selection', selectionSchema);