// src/components/Footer.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#370137',
        color: 'white',
        textAlign: 'center',
        padding: 2,
        position: 'relative',
        bottom: 0,
        width: '100%',
      }}
    >
      <Typography variant="body1">
        &copy; {new Date().getFullYear()} ExoNav Social. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
