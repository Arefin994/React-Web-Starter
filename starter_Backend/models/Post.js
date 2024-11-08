// models/Post.js

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: 'User' 
  },
  email: { 
    type: String,
    required: true 
  },
  content: { 
    type: String,
    required: true 
  },
  createdAt: { 
    type: Date,
    default: Date.now 
  },
  uniqueCode: { // Add this field for unique identifier
    type: String,
    required: true,
    unique: true,
  },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
