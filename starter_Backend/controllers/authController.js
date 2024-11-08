const User = require('../models/User'); // Make sure you have your User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register user
const register = async (req, res) => {
  const { name, email, password, bio, profilePicture } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
        email,
        password: hashedPassword, // Use the hashed password here
        name,
        bio: bio || '',
        profilePicture: profilePicture || '',
    });
    

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Login user
// Login user
const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
      }
  
      // Check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // token will expire in 1 hour
      );
  
      // Return the token and user data
      return res.json({
        token,
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          bio: user.bio,
          profilePicture: user.profilePicture,
          createdAt: user.createdAt,
        },
        message: 'Login successful',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  

module.exports = { register, login };
