import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Homepage.module.scss';

const Component = ({className}) => (
  <div className={clsx(className, styles.root)}>
    <h4 className={styles.title}>Dashboard</h4>
    <div className={styles.containerHomepage}>
      <Grid container justify="space-between">
        <Grid item xs={12} md={6} className={styles.box}>
          <Paper className={styles.box__item}>
            <h5>Last Orders</h5>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} className={styles.box}>
          <Paper className={styles.box__item}>
            <h5>Last Offer</h5>
            <div className={styles.btnContainer}>

              <Button variant="contained" color="primary" className={styles.btnContainer__item}>
                <Link to={'/offers/add'}>Add new offer</Link>
              </Button>

            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Homepage,
  // Container as Homepage,
  Component as HomepageComponent,
};
