// controllers/userController.js

const User = require('../models/User');

// Get user profile by ID (assuming the token provides user ID or email)
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have user info from the auth middleware
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUserProfile, getAllUsers };
