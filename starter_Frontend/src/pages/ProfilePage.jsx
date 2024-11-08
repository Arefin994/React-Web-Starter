// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Avatar, CircularProgress, Button, TextField } from '@mui/material';

const ProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPostId, setEditingPostId] = useState(null); // Track the post being edited
  const [editContent, setEditContent] = useState(''); // Track the updated content

  // Get user info from local storage
  const user = JSON.parse(localStorage.getItem('user'));

  // Check if user data exists
  if (!user) {
    return <div className="text-center p-10">No user information available. Please log in.</div>;
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Add token if needed
        });
        const data = await response.json();
        // Filter posts to show only those created by the logged-in user
        const userPosts = data.filter(post => post.user._id === user._id);
        setPosts(userPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user._id]);

  // Function to handle deleting a post
  const handleDelete = async (postId) => {
    try {
      await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setPosts(posts.filter(post => post._id !== postId)); // Update the posts list after deletion
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // Function to handle editing a post
  const handleEdit = (post) => {
    setEditingPostId(post._id);
    setEditContent(post.content); // Set the current content in the edit field
  };

  // Function to save the edited post
  const handleSaveEdit = async (postId) => {
    try {
      await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ content: editContent }), // Send updated content
      });

      // Update the post in the state
      setPosts(posts.map(post => post._id === postId ? { ...post, content: editContent } : post));
      setEditingPostId(null); // Exit edit mode
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (loading) {
    return <CircularProgress className="mx-auto mt-10" />;
  }

  return (
    <div className="max-w-2xl mx-auto p-5 bg-gray-100">
      <Card className="bg-white shadow-lg rounded-lg p-5">
        <div className="flex items-center">
          <Avatar
            alt={user.name}
            src={user.profilePicture}
            sx={{ width: 80, height: 80 }}
            className="mr-4"
          />
          <div>
            <Typography variant="h5">{user.name}</Typography>
            <Typography variant="body1" color="text.secondary">
              {user.email}
            </Typography>
            <Typography variant="body2" className="italic">
              {user.bio}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Joined on: {new Date(user.createdAt).toLocaleDateString()}
            </Typography>
          </div>
        </div>
      </Card>

      <div className="mt-8">
        <Typography variant="h6" gutterBottom>Your Posts</Typography>

        {posts.length > 0 ? (
          posts.map(post => (
            <Card key={post._id} className="my-4 p-4 bg-white shadow-md">
              <CardContent>
                {editingPostId === post._id ? (
                  <div>
                    <TextField
                      fullWidth
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      multiline
                    />
                    <Button variant="contained" color="primary" onClick={() => handleSaveEdit(post._id)}>
                      Save
                    </Button>
                    <Button variant="outlined" onClick={() => setEditingPostId(null)}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Typography variant="body1" gutterBottom>
                      {post.content}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Posted on: {new Date(post.createdAt).toLocaleString()}
                    </Typography>
                    <div className="flex justify-end space-x-2 mt-2">
                      <Button variant="contained" color="primary" onClick={() => handleEdit(post)}>
                        Edit
                      </Button>
                      <Button variant="outlined" color="secondary" onClick={() => handleDelete(post._id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1" className="text-center">
            No posts available.
          </Typography>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
