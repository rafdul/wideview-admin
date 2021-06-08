import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './DisplayOrderInForm.module.scss';

const Component = ({order}) => (
  <Grid item xs={12} sm={9} key={order._id}>
    <h6>Booking: {order.name}</h6>
    <Grid container spacing={3} justify="center">
      <Grid item xs={12} md={6}>
        <TextField disabled id="standard-disabled" label="Apartments" defaultValue={order.name} className={styles.box}/>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField disabled id="standard-disabled" label="City" defaultValue={order.city} className={styles.box}/>
      </Grid>
    </Grid>
    <Grid container spacing={3} justify="center">
      <Grid item xs={12} md={4}>
        <TextField disabled id="standard-disabled" label="Date from" defaultValue={order.from} className={styles.box}/>
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField disabled id="standard-disabled" label="Nights" defaultValue={order.nights} className={styles.box}/>
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField disabled id="standard-disabled" label="People" defaultValue={order.people} className={styles.box}/>
      </Grid>
    </Grid>
    <Grid container spacing={3} justify="center">
      <Grid item xs={12} md={6}>
        <TextField disabled id="standard-disabled" label="Price for night" defaultValue={order.priceFromNight} className={styles.box}/>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField disabled id="standard-disabled" label="Total price" defaultValue={order.totalPrice} className={styles.box}/>
      </Grid>
    </Grid>
  </Grid>
);

Component.propTypes = {
  order: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as DisplayOrderInForm,
  // Container as DisplayOrderInForm,
  Component as DisplayOrderInFormComponent,
};
