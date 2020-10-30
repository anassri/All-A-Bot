import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';

import UserList from './components/UsersList';
import PagesContainer from './pages/Pages';
import NavigationContainer from './components/Navigation';
import { LoginPage } from './pages/LoginPage';
import { ConfirmProvider } from 'material-ui-confirm';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ConfirmProvider>
          <CssBaseline />
          <NavigationContainer />
          <PagesContainer />
          <Footer />
        </ConfirmProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
