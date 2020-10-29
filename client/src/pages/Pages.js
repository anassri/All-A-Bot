import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { loadUser } from '../store/auth';

import HomePageContainer from './HomePage';
import LoginPageContainer from './LoginPage';
import SignupPageContainer from './SignupPage';
import EditBot from './EditBot';
import DashboardContainer from './Dashboard';
import ExploreContainer from './Explore';
import BotContainer from './Bot';
import CreateBot from './CreateBot';
import RedirectContainer from './Redirect';

export function Pages({ loadUserDispatch }) {
  useEffect(() => {
    loadUserDispatch();
  });

  return (
    <>
      <Route exact path='/' component={ExploreContainer}></Route>
      <Route exact path='/login' component={LoginPageContainer}></Route>
      <Route exact path='/signup' component={SignupPageContainer}></Route>
      <Route exact path='/edit-bot/:id' component={EditBot}></Route>
      <Route exact path='/create-bot/' component={CreateBot}></Route>
      <Route exact path='/dashboard' component={DashboardContainer}></Route>
      <Route exact path='/bots/:id' component={BotContainer} />
      <Route path='/auth/:code' component={RedirectContainer} />
    </>
  );
}

export default function PagesContainer() {
  const dispatch = useDispatch();
  const loadUserDispatch = () => dispatch(loadUser());
  return <Pages loadUserDispatch={loadUserDispatch} />;
}
