import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import UserList from './components/UsersList';
import PagesContainer from './pages/Pages';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <NavLink to='/' activeclass='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/users' activeclass='active'>
              Users
            </NavLink>
          </li>
        </ul>
      </nav>
      <PagesContainer />
    </BrowserRouter>
  );
}

export default App;
