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
  return <></>;
}

export default function HomePageContainer() {
  const dispatch = useDispatch();
  const logoutDispatcher = () => dispatch(logout());
  const loadUserDispatcher = () => dispatch(loadUser());
  const user = useSelector(state => state.auth.user);

  return <HomePage logoutDispatcher={logoutDispatcher} user={user} />;
}
