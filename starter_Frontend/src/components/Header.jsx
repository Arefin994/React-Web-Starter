// src/components/Header.jsx
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#370137' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>
          ExoNav Social
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
