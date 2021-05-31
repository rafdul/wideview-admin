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
import { FormOffer } from './components/views/FormOffer/FormOffer';
import { FormOrder } from './components/views/FormOrder/FormOrder';
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
              <Route exact path='/orders/add' render={() => <FormOrder isNewOrder={true}/>} />
              <Route exact path='/orders/:id' component={Order} />
              <Route exact path='/orders/:id/edit' render={() => <FormOrder isNewOrder={false}/>} />
              <Route exact path='/offers' component={Offers} />
              <Route exact path='/offers/add' render={() => <FormOffer isNewAnnounce={true}/>} />
              <Route exact path='/offers/:id' component={Offer} />
              <Route exact path='/offers/:id/edit' render={() => <FormOffer isNewAnnounce={false}/>} />
              <Route path='*' component={NotFound} />
            </Switch>
          </MainLayout>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  </Provider>
);

export { App };
