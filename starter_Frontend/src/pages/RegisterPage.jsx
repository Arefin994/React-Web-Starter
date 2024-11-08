import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import app from '../firebaseConfig';
import { TextField, Button, Box, Typography, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('token', token); // Store token in localStorage
      console.log('Registration successful');
      navigate('/'); // Redirect to home page
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('token', token); // Store token in localStorage
      console.log('Google login successful');
      navigate('/'); // Redirect to home page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <Box className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <Typography variant="h4" align="center" gutterBottom className="font-bold text-indigo-700">
          Register
        </Typography>
        {error && <Typography color="error" align="center" gutterBottom>{error}</Typography>}
        
        <form onSubmit={handleRegister} className="space-y-4">
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </form>

        <Divider className="my-4">or</Divider>

        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={handleGoogleLogin}
        >
          Register with Google
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterPage;
