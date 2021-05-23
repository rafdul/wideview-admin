import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAllApartments, fetchAllApartments } from '../../../redux/apartmentsRedux';
import { getAllOrders, fetchAllOrders} from '../../../redux/ordersRedux';

import styles from './Homepage.module.scss';

class Component extends React.Component {

  componentDidMount() {
    const {fetchAllOffers, fetchAllOrders} = this.props;
    fetchAllOffers();
    fetchAllOrders();
    // console.log('fetchAllOffers:', fetchAllOffers);
    // console.log('fetchAllOrders:', fetchAllOrders);
  }

  render() {
    const {className, allOffers, allOrders} = this.props;
    console.log('allOffers w homepage:', allOffers);
    console.log('allOrders w homepage:', allOrders);

    return(
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
  }
}

Component.propTypes = {
  className: PropTypes.string,
  allOffers: PropTypes.array,
  fetchAllOffers: PropTypes.func,
  allOrders: PropTypes.array,
  fetchAllOrders: PropTypes.func,
};

const mapStateToProps = state => ({
  allOffers: getAllApartments(state),
  allOrders: getAllOrders(state),
});

const mapDispatchToProps = dispatch => ({
  fetchAllOffers: offer => dispatch(fetchAllApartments(offer)),
  fetchAllOrders: offer => dispatch(fetchAllOrders(offer)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
