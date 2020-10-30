import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signup, loadUser } from '../store/auth';
import { makeStyles } from '@material-ui/core';
import { Box, TextField, Button, Checkbox, Typography, Container, Paper } from '@material-ui/core';

const useStyle = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 10,
  },
  paper: {
    height: '60vh',
    padding: '55px 65px',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bots: {
    textAlign: 'left',
  },
  bot: {
    display: 'flex',
    borderBottom: '1px solid rgba(232,232,232,0.3)',
  },
  action: {
    paddingTop: 15,
    paddingLeft: 15,
  },
  content: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 5,
    paddingLeft: 20,
  },
}));

export const SignupPage = ({ user, signupDispatch, loadUserDispatch }) => {
  const classes = useStyle();

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

      <div className={classes.root}>
        <Container maxWidth='lg' className='paper-container'>
          <Paper className={classes.paper}>
            <div className='signup-container'>
              <Typography variant='h4' component='h2' style={{ fontWeight: 'bold', color: 'white' }}>
                Create an account
              </Typography>
            </div>
            <br></br>
            <br></br>

            <Container>
              <form onSubmit={handleSubmit}>
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                  <TextField
                    value={email}
                    type='email'
                    onChange={e => setEmail(e.target.value)}
                    variant='outlined'
                    label='Email'></TextField>
                  <br></br>
                  <TextField
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    variant='outlined'
                    label='Username'></TextField>
                  <br></br>
                  <TextField
                    value={password}
                    type='password'
                    variant='outlined'
                    onChange={e => setPassword(e.target.value)}
                    label='Password'></TextField>
                  <br></br>
                  <TextField
                    value={confirmPassword}
                    type='password'
                    variant='outlined'
                    onChange={e => setConfirmPassword(e.target.value)}
                    label='Confirm Password'></TextField>
                  <br></br>
                  <Button variant='contained' color='primary' type='submit'>
                    Create
                  </Button>
                  <br></br>
                  <Typography variant='subtitle1' component='h3' style={{ textAlign: 'left' }}>
                    <span>
                      <a style={{ color: '#914A84', fontWeight: 'bold' }} href='/login'>
                        Already have an account?
                      </a>
                    </span>
                  </Typography>
                </Box>
              </form>
            </Container>
          </Paper>
        </Container>
      </div>
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
