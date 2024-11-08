// routes/userRoutes.js

const express = require('express');
const { getUserProfile, getAllUsers } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Ensure this middleware exists

const router = express.Router();

// Get user profile (for a single user)
router.get('/profile', authMiddleware, getUserProfile);

// Get all users (no auth required for now, but you can add authMiddleware if needed)
router.get('/all', getAllUsers);

module.exports = router;
