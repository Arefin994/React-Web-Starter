// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { Box } from '@mui/material';

const Layout = () => {
  return (
    <Box display="flex" minHeight="100vh">
      <Sidebar />
      <Box component="main" flexGrow={1}>
        <Header />
        <Box p={3}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
