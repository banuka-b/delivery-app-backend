const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: {
    type: String,
    unique: true,
    required: true,
    match: /.+@gmail\.com$/,
  },
  password: String,
  confirmPassword: String,
  isVerified: {
    type: Boolean,
    
  },
});

module.exports = mongoose.model('user', userSchema);