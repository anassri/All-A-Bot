import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signup, loadUser } from '../store/auth';

import { Box, TextField, Button, Checkbox } from '@material-ui/core';

export const SignupPage = ({ user, signupDispatch, loadUserDispatch }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  useEffect(() => {
    // TODO: Redirect to dashboard if user logged in
    if (user) history.push('/');
  });

  const handleSubmit = e => {
    e.preventDefault();
    const storeIsReady = signupDispatch(username, email, password);
    if (storeIsReady) {
      // TODO: Redirect to dashboard
      history.push('/');
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField value={email} onChange={e => setEmail(e.target.value)} label='Email'></TextField>
        <TextField value={username} onChange={e => setUsername(e.target.value)} label='Username'></TextField>
        <TextField value={password} onChange={e => setPassword(e.target.value)} label='Password'></TextField>
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
