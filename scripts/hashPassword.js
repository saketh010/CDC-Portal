// scripts/hashPassword.js
const bcrypt = require('bcryptjs');

const password = 'testpassword';

bcrypt.hash(password, 12, (err, hash) => {
  if (err) throw err;
});
