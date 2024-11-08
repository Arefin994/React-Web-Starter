// controllers/postController.js

const Post = require('../models/Post');

// Function to generate a random unique code
const generateUniqueCode = () => {
  return Math.floor(Math.random() * 1000000).toString(); // Generates a random number between 0 and 999999
};

// Create a post
const createPost = async (req, res) => {
  const { content } = req.body;

  try {
    // Create a new post with a unique code
    const post = new Post({
      user: req.user.id,
      email: req.user.email,
      content,
      uniqueCode: generateUniqueCode(),
    });

    await post.save();
    return res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'email');
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific post by unique code
const getPostByCode = async (req, res) => {
  const { code } = req.params;

  try {
    const post = await Post.findOne({ uniqueCode: code }).populate('user', 'email');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update a post
const updatePost = async (req, res) => {
  const { code } = req.params;
  const { content } = req.body;

  try {
    const post = await Post.findOneAndUpdate(
      { uniqueCode: code, user: req.user.id }, // Ensure the user owns the post
      { content },
      { new: true } // Return the updated post
    );

    if (!post) {
      return res.status(404).json({ message: 'Post not found or you do not have permission to edit' });
    }

    return res.status(200).json({ message: 'Post updated successfully', post });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  const { code } = req.params;

  try {
    const post = await Post.findOneAndDelete({ uniqueCode: code, user: req.user.id }); // Ensure the user owns the post
    if (!post) {
      return res.status(404).json({ message: 'Post not found or you do not have permission to delete' });
    }

    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createPost, getAllPosts, getPostByCode, updatePost, deletePost };
