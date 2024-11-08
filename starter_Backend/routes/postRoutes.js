// routes/postRoutes.js

const express = require('express');
const { createPost, getAllPosts, getPostByCode, updatePost, deletePost } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware'); // Ensure this middleware exists

const router = express.Router();

// Create a new post
router.post('/', authMiddleware, createPost);

// Get all posts
router.get('/', getAllPosts);

// Get a specific post by unique code
router.get('/:code', getPostByCode);

// Update a specific post by unique code
router.put('/:code', authMiddleware, updatePost);

// Delete a specific post by unique code
router.delete('/:code', authMiddleware, deletePost);

module.exports = router;
