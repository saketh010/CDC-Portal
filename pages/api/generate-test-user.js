import connectToDatabase from '../../lib/mongodb.js';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../../utils/nodemailer';
import { getTestUserEmailTemplate } from '../../utils/testUserTemplate';

function generateRandomUsername() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let suffix = '';
  while (suffix.length < 4) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return 'test' + suffix; // total 8 characters
}

function generateRandomPassword() {
  const specials = '!@#$%^&*()-+=<>?/{}[]|~`';
  const lowers = 'abcdefghijklmnopqrstuvwxyz';
  const uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';

  const allChars = specials + lowers + uppers + digits;
  let password = 'test';

  password += specials[Math.floor(Math.random() * specials.length)];
  password += uppers[Math.floor(Math.random() * uppers.length)];
  password += lowers[Math.floor(Math.random() * lowers.length)];
  password += digits[Math.floor(Math.random() * digits.length)];

  while (password.length < 9) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  return password;
}

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' });

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  await connectToDatabase();

  const existing = await User.findOne({ email });
  if (existing)
    return res.status(409).json({ message: 'User already exists' });

  const username = generateRandomUsername();
  const plainPassword = generateRandomPassword();
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const newUser = new User({
    username: username,
    password: hashedPassword,
    email: email,
    firstName: 'Unknown',
    middleName: 'Unknown',
    lastName: 'User',
    phone: '0000000000',
    gender: 'Other',
    category: 'General',
    dob: '2000-01-01',
    nationality: 'Unknown',
    hometown: 'Unknown',
    currentCity: 'Unknown',
    batchOfPassing: 2099,
    degree: 'Unknown',
    department: 'Unknown',
    cgpa: [0, 0, 0, 0, 0, 0, 0, 0],
    activeBacklog: 'No',
    previousBacklog: 'No',
    tenthYear: 2010,
    twelfthYear: 2012,
    tenthPercent: 0,
    twelfthPercent: 0,
    tenthBoard: 'Unknown',
    twelfthBoard: 'Unknown',
    resumes: [],
    codingProfiles: [],
  });

  await newUser.save();

  await sendEmail({
    to: email,
    subject: 'Your Test User Credentials',
    html: getTestUserEmailTemplate(username, plainPassword),
  });

  res.status(200).json({ username, password: plainPassword });
}
