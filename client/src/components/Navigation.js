import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, NavLink, useHistory } from 'react-router-dom';
import { Button, FormHelperText, InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import '../style/navigation.css';
import { logout } from '../store/auth';

import logo from '../images/logo.png';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    borderBottom: '1px solid rgba(175,100,165,0.6)',
    marginTop: 15,
    justifyContent: 'center',
    padding: 0,
  },
  buttons: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 10,
    textDecoration: 'None',
  },
  navButton: {
    display: 'inline-flex',
    alignItems: 'flex-end',
    marginLeft: 35,
  },
}));
function NavBtn({link, label, icon}){
  const classes = useStyles();

  return (
    <div>
      <NavLink to={link} activeclass='active'>
        <div className={classes.navButton}>
          <Button>
            <i className={icon}></i>
            <div>{label}</div>
          </Button>
        </div>
      </NavLink>
    </div>
  )
}
export function Navigation({ logoutDispatch, user }) {
  const classes = useStyles();
  const history = useHistory();

  const handleLogin = e => {
    e.preventDefault();
    history.push('/login');
  };

  const handleLogout = e => {
    e.preventDefault();
    history.push('/');
    logoutDispatch();
  };

  return (
    <nav className={classes.root}>
      <div className='logo'>
        <NavLink to='/'>
          <img className='nav-image' src={logo} alt='website logo' width='430' />
        </NavLink>
      </div>
      <div className={classes.buttons}>
        <NavBtn link={user ? '/create-bot' : '/login'} label='CREATE A BOT' icon='fas fa-robot' />
        <NavBtn link='/' label='EXPLORE BOTS' icon='far fa-compass' />
        <NavBtn link={user ? '/dashboard' : '/login'} label='DASHBOARD' icon='fas fa-user-circle' />
        <div>
          <NavLink to='/login' activeclass='active'>
            <div className={classes.navButton}>
              {user ? (
                <Button onClick={handleLogout}>
                  <i className='fas fa-sign-out-alt'></i>
                  <div>LOGOUT</div>
                </Button>
              ) : (
                <Button onClick={handleLogin}>
                  <i className='fas fa-sign-in-alt'></i>
                  <div>LOGIN</div>
                </Button>
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default function NavigationContainer() {
  const dispatch = useDispatch();
  const logoutDispatch = () => dispatch(logout());
  const user = useSelector(state => state.auth.user);

  return <Navigation logoutDispatch={logoutDispatch} user={user} />;
}
