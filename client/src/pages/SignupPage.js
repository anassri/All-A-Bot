import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signup, loadUser } from '../store/auth';

import { Box, TextField, Button, Checkbox } from '@material-ui/core';

export const SignupPage = ({ user, signupDispatch, loadUserDispatch }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  useEffect(() => {
    if (user) history.push('/dashboard');
  });

  const validateForm = data => {
    const errors = [];
    if (email.length === 0) errors.push('Email is required.');
    if (username.length === 0) errors.push('Username is required.');
    if (password.length === 0) errors.push('Password is required.');
    if (confirmPassword.length === 0) errors.push('Password confirmation is required.');
    if (password !== confirmPassword) errors.push('Passwords must match.');
    if (errors.length === 0) return true;
    setErrors(errors);
    return false;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formIsValid = validateForm();
    if (formIsValid) {
      const signupAttempt = await signupDispatch(username, email, password);
      if (signupAttempt.status === 200) history.push('/dashboard');
      else setErrors([signupAttempt.msg]);
    }
  };

  return (
    <Box>
      <Box>
        {errors.map(error => (
          <div>{error}</div>
        ))}
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField value={email} type='email' onChange={e => setEmail(e.target.value)} label='Email'></TextField>
        <TextField value={username} onChange={e => setUsername(e.target.value)} label='Username'></TextField>
        <TextField
          value={password}
          type='password'
          onChange={e => setPassword(e.target.value)}
          label='Password'></TextField>
        <TextField
          value={confirmPassword}
          type='password'
          onChange={e => setConfirmPassword(e.target.value)}
          label='Confirm Password'></TextField>
        <Button type='submit'>Sign Up</Button>
      </form>
    </Box>
  );
};

export default function SignupPageContainer() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const signupDispatch = (username, email, password) => dispatch(signup(username, email, password));
  const loadUserDispatch = () => dispatch(loadUser());
  return <SignupPage user={user} signupDispatch={signupDispatch} loadUserDispatch={loadUserDispatch} />;
}
