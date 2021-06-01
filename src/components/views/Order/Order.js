import React from 'react';
import PropTypes from 'prop-types';

import { Loading } from '../../common/Loading/Loading';
import { Error } from '../../common/Error/Error';
import { Btn } from '../../common/Btn/Btn';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getOneOrder, fetchOneOrder, getLoadingOrders, fetchDeleteOneOrder } from '../../../redux/ordersRedux.js';

import styles from './Order.module.scss';

class Component extends React.Component {

  componentDidMount() {
    const {fetchOneOrder} = this.props;
    fetchOneOrder();
  }

  render() {
    const {className, oneOrder, loading, fetchDeleteOneOrder} = this.props;

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
      return (
        <div className={clsx(className, styles.root)}>
          {loading && loading.deleted === true
            ?
            <h2 className={styles.title}>Order was deleted</h2>
            :
            <div>
              <h2 className={styles.title}>Order id {oneOrder.idSubmited}</h2>
              <Grid container justify="space-between" className={styles.containerFlex}>
                <Grid item xs={12} md={6}>
                  <Paper className={styles.box}>
                    <h5>Data order</h5>
                    <Typography variant="body1" component="div" className={styles.box__item}><span className={styles.box__text}>Date:</span> {oneOrder.dataSubmited ? oneOrder.dataSubmited.slice(0,10) : null}</Typography>
                    <Typography variant="body1" component="div" className={styles.box__item}><span className={styles.box__text}>First name:</span>  {oneOrder.firstName}</Typography>
                    <Typography variant="body1" component="div" className={styles.box__item}><span className={styles.box__text}>Surname:</span>  {oneOrder.surname}</Typography>
                    <Typography variant="body1" component="div" className={styles.box__item}><span className={styles.box__text}>Email:</span>  {oneOrder.email}</Typography>
                    <Typography variant="body1" component="div" className={styles.box__item}><span className={styles.box__text}>Phone:</span>  {oneOrder.phone}</Typography>
                    <Typography variant="body1" component="div" className={styles.box__item}><span className={styles.box__text}>Status:</span>  {oneOrder.statusSubmited}</Typography>
                  </Paper>
                </Grid>
                {oneOrder.apartments && oneOrder.apartments.map(item => (
                  <Grid item xs={12} md={6} key={item._id}>
                    <Paper className={styles.box + ' ' + styles.background}>
                      <h5>Booking apartment (id {item.idOrder})</h5>
                      <Typography variant="body1" component="div" className={styles.box__item}><span className={styles.box__text}>Name:</span> {item.name}</Typography>
                      <Typography variant="body1" component="div" className={styles.box__item}><span className={styles.box__text}>City:</span> {item.city}</Typography>
                      <Typography variant="body1" component="div" className={styles.box__item}><span className={styles.box__text}>From:</span>  {item.from}</Typography>
                      <Typography variant="body1" component="div" className={styles.box__item}><span className={styles.box__text}>Nights:</span>  {item.nights}</Typography>
                      <Typography variant="body1" component="div" className={styles.box__item}><span className={styles.box__text}>People:</span>  {item.people}</Typography>
                      <Typography variant="body1" component="div" className={styles.box__item}><span className={styles.box__text}>Total price:</span>  {item.totalPrice}</Typography>
                      <Typography variant="body2" component="div" className={styles.box__item}><span className={styles.box__text}>Category:</span>  {item.category}</Typography>
                      <Typography variant="body2" component="div" className={styles.box__item}><span className={styles.box__text}>Price (for night):</span>  {item.priceFromNight}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
              <Grid container justify="space-between" className={styles.containerFlex}>
                <Grid item xs={12} align="center">
                  <Button type="submit" variant='outlined' color='secondary' onClick={() => fetchDeleteOneOrder(oneOrder)}>Delete</Button>
                  <Btn variant='contained' color='primary' link={`/orders/${oneOrder._id}/edit`} text='Edit' />
                </Grid>
              </Grid>
            </div>
          }
        </div>
      );
    }
  }
}

Component.propTypes = {
  className: PropTypes.string,
  oneOrder: PropTypes.object,
  fetchOneOrder: PropTypes.func,
  loading: PropTypes.object,
  fetchDeleteOneOrder: PropTypes.func,
};

const mapStateToProps = state => ({
  oneOrder: getOneOrder(state),
  loading: getLoadingOrders(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchOneOrder: () => dispatch(fetchOneOrder(props.match.params.id)),
  fetchDeleteOneOrder: (order) => dispatch(fetchDeleteOneOrder(order)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Order,
  Container as Order,
  Component as OrderComponent,
};
