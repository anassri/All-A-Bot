import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { loadBots } from '../store/bots';

export function Dashboard({ user, token, bots, loadBotsDispatch }) {
  const history = useHistory();

  useEffect(() => {
    if (user) loadBotsDispatch(user, token);
  });

  if (!bots) return null;

  return (
    <div>
      <h1>DASHBOARD</h1>
      <div>
        {bots.map(bot => {
          return <h2>{bot.name}</h2>;
        })}
      </div>
    </div>
  );
}

export default function DashboardContainer() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const bots = useSelector(state => state.bots.list);
  const loadBotsDispatch = (userId, token) => dispatch(loadBots(userId, token));

  return <Dashboard user={user} token={token} bots={bots} loadBotsDispatch={loadBotsDispatch} />;
}
