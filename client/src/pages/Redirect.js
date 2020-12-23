import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logInWithDiscord } from '../store/auth';

export const Redirect = ({ code, user, logInWithDiscordDispatch }) => {
  const history = useHistory();

  useEffect(() => {
    logInWithDiscordDispatch(code);
  });

  useEffect(() => {
    if (user) history.push('/dashboard');
  }, [user]);
  return <></>;
};

export default function RedirectContainer() {
  const dispatch = useDispatch();
  const code = useLocation().search.match(/(?<=code=)\w+/)[0];
  const user = useSelector(state => state.auth.user);
  const logInWithDiscordDispatch = code => dispatch(logInWithDiscord(code));
  return <Redirect code={code} user={user} logInWithDiscordDispatch={logInWithDiscordDispatch} />;
}
