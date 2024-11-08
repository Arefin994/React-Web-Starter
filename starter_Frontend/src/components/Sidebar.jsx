// src/components/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home, PostAdd, Person, ExitToApp, Login, PersonAdd } from '@mui/icons-material';

const Sidebar = () => {
  const location = useLocation(); // Get current location
  const token = localStorage.getItem('token'); // Check if user is logged in

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token on logout
    localStorage.removeItem('user'); // Remove user info
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <Box
      sx={{
        width: 250,
        height: '100vh',
        backgroundColor: '#370137',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          marginBottom: 3,
          fontSize: 24,
          fontWeight: 'bold',
        }}
      >
        ExoNav Social
      </Box>
      <List>
        <ListItem
          button
          component={Link}
          to="/"
          sx={{
            backgroundColor: isActive('/') ? 'white' : '#370137',
            color: isActive('/') ? '#370137' : 'white',
          }}
        >
          <ListItemIcon sx={{ color: isActive('/') ? '#370137' : 'white' }}>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" sx={{ color: isActive('/') ? '#370137' : 'white' }} />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/posts"
          sx={{
            backgroundColor: isActive('/posts') ? 'white' : '#370137',
            color: isActive('/posts') ? '#370137' : 'white',
          }}
        >
          <ListItemIcon sx={{ color: isActive('/posts') ? '#370137' : 'white' }}>
            <PostAdd />
          </ListItemIcon>
          <ListItemText primary="Posts" sx={{ color: isActive('/posts') ? '#370137' : 'white' }} />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/profile"
          sx={{
            backgroundColor: isActive('/profile') ? 'white' : '#370137',
            color: isActive('/profile') ? '#370137' : 'white',
          }}
        >
          <ListItemIcon sx={{ color: isActive('/profile') ? '#370137' : 'white' }}>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Profile" sx={{ color: isActive('/profile') ? '#370137' : 'white' }} />
        </ListItem>

        {token ? (
          <ListItem
            button
            onClick={handleLogout}
            sx={{
              backgroundColor: isActive('/logout') ? 'white' : '#370137',
              color: isActive('/logout') ? '#370137' : 'white',
            }}
          >
            <ListItemIcon sx={{ color: isActive('/logout') ? '#370137' : 'white' }}>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: isActive('/logout') ? '#370137' : 'white' }} />
          </ListItem>
        ) : (
          <>
            <ListItem
              button
              component={Link}
              to="/login"
              sx={{
                backgroundColor: isActive('/login') ? 'white' : '#370137',
                color: isActive('/login') ? '#370137' : 'white',
              }}
            >
              <ListItemIcon sx={{ color: isActive('/login') ? '#370137' : 'white' }}>
                <Login />
              </ListItemIcon>
              <ListItemText primary="Login" sx={{ color: isActive('/login') ? '#370137' : 'white' }} />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/register"
              sx={{
                backgroundColor: isActive('/register') ? 'white' : '#370137',
                color: isActive('/register') ? '#370137' : 'white',
              }}
            >
              <ListItemIcon sx={{ color: isActive('/register') ? '#370137' : 'white' }}>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText primary="Register" sx={{ color: isActive('/register') ? '#370137' : 'white' }} />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );
};

export default Sidebar;
