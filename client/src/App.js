import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';

import PagesContainer from './pages/Pages';
import NavigationContainer from './components/Navigation';
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
