import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login, loadUser, loadToken } from '../store/auth';

import { Box, TextField, Button, Checkbox } from '@material-ui/core';

export const LoginPage = ({ user, loginDispatcher, loadUserDispatcher }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (user) history.push('/dashboard');
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const storeIsReady = await loginDispatcher(email, password);
    if (storeIsReady) {
      history.push('/dashboard');
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField value={email} onChange={e => setEmail(e.target.value)} label='Email'></TextField>
        <TextField value={password} onChange={e => setPassword(e.target.value)} label='Password'></TextField>
        <Button type='submit'>Log In</Button>
      </form>
    </Box>
  );
};

export default function LoginPageContainer() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const loginDispatcher = (email, password) => dispatch(login(email, password));
  const loadUserDispatcher = () => dispatch(loadUser());
  return <LoginPage user={user} loginDispatcher={loginDispatcher} loadUserDispatcher={loadUserDispatcher} />;
}
