import React from 'react';
import PropTypes from 'prop-types';

import { Btn } from '../../common/Btn/Btn';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getFiveApartments, fetchAllApartments } from '../../../redux/apartmentsRedux';
import { getFiveOrders, fetchAllOrders} from '../../../redux/ordersRedux';

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
    const {className, fiveApartments, fiveOrders} = this.props;
    console.log('fiveApartments w homepage:', fiveApartments);
    console.log('fiveOrders w homepage:', fiveOrders);

    return(
      <div className={clsx(className, styles.root)}>
        <h4 className={styles.title}>Dashboard</h4>
        <div className={styles.containerHomepage}>
          <Grid container justify="space-between">
            <Grid item xs={12} md={6} className={styles.box}>
              <Paper className={styles.box__item}>
                <h5 className={styles.subtitle}>Last Orders</h5>
                <TableContainer>
                  <Table className={styles.table}>
                    <TableHead className={styles.table__head}>
                      <TableRow>
                        <TableCell>Data order</TableCell>
                        <TableCell align="right">ID order</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className={styles.table__body}>
                      {fiveOrders && fiveOrders.map(order => (
                        <TableRow key={order._id}>
                          <TableCell component="th" scope="row">{order.dataSubmited ? order.dataSubmited.slice(0,10) : null}</TableCell>
                          <TableCell align="right">{order.idSubmited}</TableCell>
                          <TableCell align="right">{order.email}</TableCell>
                          <TableCell align="right" className={styles.btn__more}>
                            <Btn variant='outlined' color='primary' link={`/orders/${order._id}`} text='More' />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <div className={styles.btnContainer}>
                  <Btn variant='contained' color='primary' link='/orders' text='View all orders' />
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} className={styles.box}>
              <Paper className={styles.box__item}>
                <h5 className={styles.subtitle}>Last Offers</h5>
                <TableContainer>
                  <Table className={styles.table}>
                    <TableHead className={styles.table__head}>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">City</TableCell>
                        <TableCell align="right">Category</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className={styles.table__body}>
                      {fiveApartments && fiveApartments.map(offer => (
                        <TableRow key={offer.id}>
                          <TableCell component="th" scope="row">{offer.name}</TableCell>
                          <TableCell align="right">{offer.city}</TableCell>
                          <TableCell align="right">{offer.category}</TableCell>
                          <TableCell align="right">{offer.price}</TableCell>
                          <TableCell align="right" className={styles.btn__more}>
                            <Btn variant='outlined' color='primary' link={`/offers/${offer.id}`} text='More' />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <div className={styles.btnContainer}>
                  <Btn variant='contained' color='primary' link={`/offers`} text='View all offers' />
                  <Btn variant='contained' color='secondary' link={`/offers/add`} text='Add new offer' />
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
  fiveApartments: PropTypes.array,
  fetchAllOffers: PropTypes.func,
  fiveOrders: PropTypes.array,
  fetchAllOrders: PropTypes.func,
};

const mapStateToProps = state => ({
  fiveOrders: getFiveOrders(state),
  fiveApartments: getFiveApartments(state),
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
