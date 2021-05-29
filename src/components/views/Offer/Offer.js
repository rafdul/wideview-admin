import React from 'react';
import PropTypes from 'prop-types';

import { Loading } from '../../common/Loading/Loading';
import { Error } from '../../common/Error/Error';
import {Btn} from '../../common/Btn/Btn';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getOneOffer, getLoadingApartments, fetchOneApartments, fetchDeleteApartments } from '../../../redux/apartmentsRedux.js';

import styles from './Offer.module.scss';

class Component extends React.Component {

  componentDidMount() {
    const {fetchOneOffer} = this.props;
    fetchOneOffer();
  }

  deleteOffer(offer) {

    console.log('click delete');
    const {fetchDeleteOneOffer} = this.props;
    console.log('fetchDeleteOneOffer', fetchDeleteOneOffer);
    fetchDeleteOneOffer(offer);
  }

  render() {
    const {className, oneOffer, loading, fetchDeleteOneOffer} = this.props;
    console.log('oneOffer', oneOffer);
    // const location = oneOffer.location;
    // console.log('location.lng', location.lng);

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
          <h2 className={styles.title}>About offer: {oneOffer.name}</h2>
          <Grid container justify="space-between" className={styles.grid}>
            <Paper className={styles.box + ' ' + styles.grid__item1}>
              <Typography variant="body1" component="div" className={styles.box__item}><span className={styles.box__text}>Name:</span> {oneOffer.name}</Typography>
              <Typography variant="body1" component="div" className={styles.box__item}><span className={styles.box__text}>City:</span>  {oneOffer.city}</Typography>
              <Typography variant="body1" component="div" className={styles.box__item}><span className={styles.box__text}>Description:</span>  {oneOffer.description}</Typography>
              <Typography variant="body1" component="div" className={styles.box__item}><span className={styles.box__text}>Price:</span>  {oneOffer.price}</Typography>
            </Paper>
            <Paper className={styles.box + ' ' + styles.grid__item2}>
              <Typography variant="body1" component="div" className={styles.box__item}><span className={styles.box__text}>Category:</span> {oneOffer.category}</Typography>
              <Typography variant="body1" component="div" className={styles.box__item}><span className={styles.box__text}>Bedrooms:</span> {oneOffer.bedrooms}</Typography>
              <Typography variant="body1" component="div" className={styles.box__item}><span className={styles.box__text}>Kitchen:</span>  {oneOffer.kitchen}</Typography>
              <Typography variant="body1" component="div" className={styles.box__item}><span className={styles.box__text}>Balcony:</span>  {oneOffer.balcony}</Typography>
              <Typography variant="body1" component="div" className={styles.box__item}><span className={styles.box__text}>Swimpool:</span>  {oneOffer.swimpool}</Typography>
            </Paper>
            <Paper className={styles.box + ' ' + styles.grid__item3}>
              <Typography variant="caption" component="div" className={styles.box__item}><span className={styles.box__text}>Location lat:</span> {oneOffer.location === undefined ? 0 : oneOffer.location.lat}</Typography>
              <Typography variant="caption" component="div" className={styles.box__item}><span className={styles.box__text}>Location lng:</span> {oneOffer.location === undefined ? 0 : oneOffer.location.lng}</Typography>
              <Typography variant="caption" component="div" className={styles.box__item}><span className={styles.box__text}>Google map iframe:</span> {oneOffer.map}</Typography>
            </Paper>
            <Grid item align="center" className={styles.grid__item5}>
              <div onClick={() => fetchDeleteOneOffer(oneOffer)}>
                <button type="submit" >Click Me!</button>
              </div>


              <Btn variant='outlined' color='secondary' link={'#'} text='Delete' />
              <Btn variant='contained' color='primary' link={`/offers/${oneOffer._id}/edit`} text='Edit' />
            </Grid>
            <div className={styles.imageContainer + ' ' + styles.grid__item4}>
              {oneOffer.image && oneOffer.image.map(item => (
                <div key={oneOffer.image.indexOf(item)} className={styles.image}>
                  <img
                    className={styles.image__item}
                    src={oneOffer.image === undefined ? null : item}
                    alt={`${oneOffer.name}_${oneOffer.image.indexOf(item)}`}
                  />
                </div>
              ))}
            </div>
          </Grid>
        </div>
      );
    }
  }
}

Component.propTypes = {
  fetchOneOffer: PropTypes.func,
  className: PropTypes.string,
  oneOffer: PropTypes.object,
  loading: PropTypes.object,
  fetchDeleteOneOffer: PropTypes.func,
};

const mapStateToProps = state => ({
  oneOffer: getOneOffer(state),
  loading: getLoadingApartments(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchOneOffer: () => dispatch(fetchOneApartments(props.match.params.id)),
  fetchDeleteOneOffer: (offer) => dispatch(fetchDeleteApartments(offer)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Offer,
  Container as Offer,
  Component as OfferComponent,
};
