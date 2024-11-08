import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress, Alert } from '@mui/material';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
  
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
  
    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({ content }),
      });
  
      if (response.ok) {
        setSuccessMessage('Post created successfully!');
        setContent('');
      } else if (response.status === 401) {
        setErrorMessage('Unauthorized. Please log in again.');
      } else {
        setErrorMessage('Failed to create post');
      }
    } catch (error) {
      setErrorMessage('Server error, please try again');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Box maxWidth="sm" mx="auto" p={4} display="flex" flexDirection="column" gap={2}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Create a New Post
      </Typography>

      {successMessage && (
        <Alert severity="success" onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert severity="error" onClose={() => setErrorMessage('')}>
          {errorMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="What's on your mind?"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          sx={{ mb: 3 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : 'Post'}
        </Button>
      </form>
    </Box>
  );
};

export default CreatePost;
