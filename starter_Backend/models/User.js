// models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  bio: { // New field for user bio
    type: String, 
    default: '' 
  },
  profilePicture: { // New field for profile picture URL
    type: String, 
    default: '' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
