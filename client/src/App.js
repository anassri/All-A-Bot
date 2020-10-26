import React from 'react';
import { BrowserRouter, Switch} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'

import UserList from './components/UsersList';
import PagesContainer from './pages/Pages';
import Navigation from './components/Navigation'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navigation />
        <PagesContainer />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
