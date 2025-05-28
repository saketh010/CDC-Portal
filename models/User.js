import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: [true, 'Username already exists'],
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  firstName: {
    type: String,
    required: [true, 'Please provide a first name'],
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Please provide a last name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: [true, 'Email already exists'],
    match: [/.+\@.+\..+/, 'Please provide a valid email address'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
    match: [/^\d{10}$/, 'Phone number must be 10 digits'],
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  category: {
    type: String,
    enum: [
      'General',
      'Other Backward Class (OBC)',
      'Scheduled Caste (SC)',
      'Scheduled Tribes (ST)',
      'Economically Weaker Section (EWS)',
      'Person with Disability (PWD)',
    ],
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  hometown: {
    type: String,
    required: true,
  },
  currentCity: {
    type: String,
    required: true,
  },
  batchOfPassing: {
    type: Number,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  cgpa: {
    type: [Number],
    validate: [arrayLimit, 'CGPA must have 8 semester values'],
  },
  activeBacklog: {
    type: String,
    enum: ['Yes', 'No'],
    required: true,
  },
  previousBacklog: {
    type: String,
    enum: ['Yes', 'No'],
    required: true,
  },
  tenthYear: {
    type: Number,
    required: true,
  },
  twelfthYear: {
    type: Number,
    required: true,
  },
  tenthPercent: {
    type: Number,
    required: true,
  },
  twelfthPercent: {
    type: Number,
    required: true,
  },
  tenthBoard: {
    type: String,
    required: true,
  },
  twelfthBoard: {
    type: String,
    required: true,
  },
  resumes: [
    {
      name: {
        type: String,
        required: [true, 'Please provide a name for the resume'],
      },
      link: {
        type: String,
        required: [true, 'Please provide a URL for the resume'],
        match: [/^https?:\/\/.+\..+/, 'Please provide a valid URL'],
      },
    },
  ],
  codingProfiles: [
    {
      name: {
        type: String,
        required: [true, 'Please provide a name for the coding profile'],
      },
      link: {
        type: String,
        required: [true, 'Please provide a URL for the coding profile'],
        match: [/^https?:\/\/.+\..+/, 'Please provide a valid URL'],
      },
    },
  ],
});

// Validator for CGPA array length
function arrayLimit(val) {
  return val.length === 8;
}

export default mongoose.models.User || mongoose.model('User', UserSchema);
