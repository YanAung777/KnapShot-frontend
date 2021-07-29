import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from 'theme';


// router
import { routes, history } from 'router';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import { AppProvider } from 'context/app';


function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <AppProvider>
        <Router history={history}>
          {renderRoutes(routes)}
        </Router>
      </AppProvider>
    </MuiThemeProvider>
  )
}

export default App;
