import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import { store } from './redux/store';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { Homepage } from './components/views/Homepage/Homepage';
import { Orders } from './components/views/Orders/Orders';
import { Order } from './components/views/Order/Order';
import { Offers } from './components/views/Offers/Offers';
import { Offer } from './components/views/Offer/Offer';
import { AddOffer } from './components/views/AddOffer/AddOffer';
import { NotFound } from './components/views/NotFound/NotFound';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2B4C6F' },
  },
});

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainLayout>
            <Switch>
              <Route exact path='/' component={Homepage} />
              <Route exact path='/orders' component={Orders} />
              <Route exact path='/orders/:id' component={Order} />
              <Route exact path='/offers' component={Offers} />
              <Route exact path='/offers/add' component={AddOffer} />
              <Route exact path='/offers/:id' component={Offer} />
              <Route path='*' component={NotFound} />
            </Switch>
          </MainLayout>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  </Provider>
);

export { App };