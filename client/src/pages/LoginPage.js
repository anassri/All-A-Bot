import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login, loadUser, loadToken } from '../store/auth';
import { makeStyles } from '@material-ui/core';
import { Box, TextField, Button, Checkbox, Typography, Container, Paper } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const useStyle = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 10,
  },
  paper: {
    height: '60%',
    minHeight: '60vh',
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

export const LoginPage = ({ user, loginDispatcher, loadUserDispatcher }) => {
  const classes = useStyle();
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
        <div className={classes.root}>
        <Container maxWidth='lg' className='paper-container'>
          <Paper className={classes.paper}>
            {errors ? <Alert variant="outlined" severity="error">
              {errors}
            </Alert> : null}
            <div className='welcome-container'>
              <Typography variant='h4' component='h2' style={{ fontWeight: 'bold', color: 'white' }}>
                Welcome back!
              </Typography>
              <Typography variant='subtitle1' component='h2' style={{ fontWeight: 'bold', color: '#969696' }}>
                We're psyched to see ya!
              </Typography>
            </div>
            <br></br>
            <br></br>
            <Container>
              <form onSubmit={handleSubmit}>
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                  <TextField
                    value={email}
                    variant='outlined'
                    type='email'
                    onChange={e => setEmail(e.target.value)}
                    label='Email'></TextField>
                  <br></br>
                  <br></br>
                  <TextField
                    value={password}
                    variant='outlined'
                    type='password'
                    onChange={e => setPassword(e.target.value)}
                    label='Password'></TextField>
                  <br></br>
                  <Typography
                    variant='subtitle1'
                    component='h3'
                    color='primary'
                    style={{ fontWeight: 'bold', textAlign: 'left' }}>
                    Forget your password?
                  </Typography>
                  <br></br>
                  <Button variant='contained' color='primary' type='submit'>
                    Log In
                  </Button>
                  <br></br>
                  <Typography variant='subtitle1' component='h3' style={{ textAlign: 'left' }}>
                    <span style={{ color: 'white' }}>Need an account? </span>
                    <span>
                      <a style={{ color: '#914A84', fontWeight: 'bold' }} href='/signup'>
                        Register
                      </a>
                    </span>
                  </Typography>
                  <br></br>
                  <br></br>
                  <Button
                    variant='contained'
                    style={{ backgroundColor: '#7289da' }}
                    href='https://discord.com/oauth2/authorize?client_id=771154573795655680&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fredirect&response_type=code&scope=identify%20email%20connections%20guilds'>
                    <span style={{ marginRight: '5px' }}>
                      <i className='fab fa-discord' />
                    </span>
                    Log in with Discord
                  </Button>
                </Box>
              </form>
            </Container>
          </Paper>
        </Container>
      </div>
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
