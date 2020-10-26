import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { loadUser } from '../store/auth';

import HomePageContainer from './HomePage';
import LoginPageContainer from './LoginPage';
import SignupPageContainer from './SignupPage';
import EditBot from './EditBot';
import DashboardContainer from './Dashboard';

export function Pages({ loadUserDispatch }) {
  useEffect(() => {
    loadUserDispatch();
  });

  return (
    <>
      <Route exact path='/' component={HomePageContainer}></Route>
      <Route exact path='/login' component={LoginPageContainer}></Route>
      <Route exact path='/signup' component={SignupPageContainer}></Route>
      <Route exact path='/edit-bot/:id' component={EditBot}></Route>
      <Route exact path='/dashboard' component={DashboardContainer}></Route>
    </>
  );
}

export default function PagesContainer() {
  const dispatch = useDispatch();
  const loadUserDispatch = () => dispatch(loadUser());
  return <Pages loadUserDispatch={loadUserDispatch} />;
}
