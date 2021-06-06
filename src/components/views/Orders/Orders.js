import React from 'react';
import PropTypes from 'prop-types';

import { Btn } from '../../common/Btn/Btn';
import { Loading } from '../../common/Loading/Loading';
import { Error } from '../../common/Error/Error';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getLoadingOrders, getAllOrders, fetchAllOrders } from '../../../redux/ordersRedux.js';

import styles from './Orders.module.scss';

class Component extends React.Component {

  state = {
    page: 0,
    rowsPerPage: 5,
  }

  componentDidMount() {
    const { fetchAllOrders } = this.props;
    fetchAllOrders();
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({page: 0, rowsPerPage: parseInt(event.target.value, 10)});
  }

  handleChangePage = (event, newPage) => {
    this.setState({page: newPage});
  };

  render() {
    const { className, loading, allOrders } = this.props;
    const { page, rowsPerPage } = this.state;

    if(loading && loading.active === true) {
      return(
        <Loading />
      );
    }
    else if(loading && loading.error === true) {
      return(
        <Error />
      );
    }
    else{
      return(
        <div className={clsx(className, styles.root)}>
          <h2 className={styles.title}>Orders</h2>
          <div className={styles.headContainer}>
            <div className={styles.btnContainer}>
              <Btn variant='contained' color='primary' link='/orders/add' text='Add new order' />
            </div>
          </div>
          <Paper className={styles.box__item}>
            <TableContainer>
              <Table className={styles.table}>
                <TableHead className={styles.table__head}>
                  <TableRow>
                    <TableCell>Data order</TableCell>
                    <TableCell align="right">ID order</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Phone</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className={styles.table__body}>
                  {allOrders && allOrders.map(order => (
                    <TableRow key={order._id}>
                      <TableCell component="th" scope="row">{order.dataSubmited ? order.dataSubmited.slice(0,10) : null}</TableCell>
                      <TableCell align="right">{order.idSubmited}</TableCell>
                      <TableCell align="right">{order.email}</TableCell>
                      <TableCell align="right">{order.phone}</TableCell>
                      <TableCell align="right">{order.firstName}</TableCell>
                      <TableCell align="right" className={styles.btn__more}>
                        <Btn variant='outlined' color='primary' link={`/orders/${order._id}`} text='More' />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              page={page}
              rowsPerPageOptions={[5, 10, 20]}
              rowsPerPage={rowsPerPage}
              component="div"
              count={allOrders.length}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              onChangePage={this.handleChangePage}
            />
          </Paper>
        </div>
      );
    }
  }
}

Component.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.object,
  allOrders: PropTypes.array,
  fetchAllOrders: PropTypes.func,

};

const mapStateToProps = state => ({
  loading: getLoadingOrders(state),
  allOrders: getAllOrders(state),
});

const mapDispatchToProps = dispatch => ({
  fetchAllOrders: arg => dispatch(fetchAllOrders(arg)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Orders,
  Container as Orders,
  Component as OrdersComponent,
};
