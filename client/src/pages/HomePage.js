import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, loadUser } from '../store/auth';
import { useHistory } from 'react-router-dom';

export function HomePage({ logoutDispatcher, user }) {
  const history = useHistory();
  const handleLogout = e => {
    e.preventDefault();
    logoutDispatcher();
  };

  const handleLogin = e => {
    e.preventDefault();
    history.push('/login');
  };

  const handleSignup = e => {
    e.preventDefault();
    history.push('/signup');
  };

  return (
    <div>
      <h1>All-A-Bot</h1>
      <div>
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <div>
            <button onClick={handleLogin}>Log In</button>
            <button onClick={handleSignup}>Sign Up</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function HomePageContainer() {
  const dispatch = useDispatch();
  const logoutDispatcher = () => dispatch(logout());
  const loadUserDispatcher = () => dispatch(loadUser());
  const user = useSelector(state => state.auth.user);

  return <HomePage logoutDispatcher={logoutDispatcher} user={user} />;
}
