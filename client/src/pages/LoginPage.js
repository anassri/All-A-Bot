import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login, loadUser, loadToken } from '../store/auth';

import { Box, TextField, Button, Checkbox } from '@material-ui/core';

export const LoginPage = ({ user, loginDispatcher, loadUserDispatcher }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (user) history.push('/dashboard');
  });

  const validateForm = data => {
    const errors = [];
    if (email.length === 0) errors.push('Email is required.');
    if (password.length === 0) errors.push('Password is required.');
    if (errors.length === 0) return true;
    setErrors(errors);
    return false;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formIsValid = validateForm();
    if (formIsValid) {
      const loginAttempt = await loginDispatcher(email, password);

      if (loginAttempt.status === 200) history.push('/dashboard');
      else setErrors(loginAttempt.msg);
    }
  };

  return (
    <Box>
      <div>{errors}</div>
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
