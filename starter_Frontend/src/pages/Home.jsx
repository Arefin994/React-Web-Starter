import React, { useEffect, useState } from 'react';
import { Paper, Typography, Button, Avatar, Divider, Grid, Box, CircularProgress } from '@mui/material';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all posts from the backend API
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts/'); // Adjust the endpoint based on your actual backend route
      const data = await response.json();

      if (response.ok) {
        setPosts(data);
      } else {
        setError('Failed to fetch posts');
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Server error');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" variant="h5" sx={{ py: 10 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box maxWidth="lg" mx="auto" p={4}>
      <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
        Welcome to the Home Page
      </Typography>

      {posts.length > 0 ? (
        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} key={post._id}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 4, backgroundColor: '#f9f9f9' }}>
                {/* User Info */}
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar
                    src={`https://api.adorable.io/avatars/40/${post.user._id}.png`} // Placeholder for user avatar
                    alt="User Avatar"
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="600">
                      {post.email}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>

                {/* Post Content */}
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {post.content}
                </Typography>

                {/* Reactions Section */}
                <Box display="flex" gap={2} mt={2}>
                  <Button variant="contained" color="primary" size="small">
                    👍 Like
                  </Button>
                  <Button variant="outlined" color="primary" size="small">
                    💬 Comment
                  </Button>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Comments Section */}
                <Box>
                  <Typography variant="h6" fontWeight="600" gutterBottom>
                    Comments
                  </Typography>
                  <Box>
                    {/* Example Comments */}
                    <Box display="flex" alignItems="center" mb={1}>
                      <Avatar
                        src="https://api.adorable.io/avatars/40/user1.png" // Placeholder commenter's avatar
                        alt="Commenter Avatar"
                        sx={{ width: 32, height: 32, mr: 1 }}
                      />
                      <Typography variant="body2">
                        <strong>Jane Doe:</strong> Great post!
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        src="https://api.adorable.io/avatars/40/user2.png" // Placeholder commenter's avatar
                        alt="Commenter Avatar"
                        sx={{ width: 32, height: 32, mr: 1 }}
                      />
                      <Typography variant="body2">
                        <strong>John Smith:</strong> I love this!
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography align="center" variant="h5" sx={{ py: 10 }}>
          No posts to display
        </Typography>
      )}
    </Box>
  );
};

export default Home;
