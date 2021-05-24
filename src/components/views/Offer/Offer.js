import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getOneOffer, fetchOneApartments } from '../../../redux/apartmentsRedux.js';

import styles from './Offer.module.scss';

class Component extends React.Component {

  componentDidMount() {
    const {fetchOneOffer} = this.props;
    fetchOneOffer();
  }

  render() {
    const {className, oneOffer} = this.props;
    console.log('oneOffer', oneOffer);
    // const location = oneOffer.location;
    // console.log('location.lng', location.lng);

    return(
      <div className={clsx(className, styles.root)}>
        <h2 className={styles.title}>About offer: {oneOffer.name}</h2>
        <Grid container justify="space-between">
          <Grid item xs={12} md={6}>
            <Paper className={styles.box}>
              <Typography variant="body1" component="div" className={styles.box__item}><span className={styles.box__text}>Name:</span> {oneOffer.name}</Typography>
              <Typography variant="body1" component="div" className={styles.box__item}><span className={styles.box__text}>City:</span>  {oneOffer.city}</Typography>
              <Typography variant="body1" component="div" className={styles.box__item}><span className={styles.box__text}>Description:</span>  {oneOffer.description}</Typography>
              <Typography variant="body1" component="div" className={styles.box__item}><span className={styles.box__text}>Price:</span>  {oneOffer.price}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={styles.box}>
              <Typography variant="body1" component="div" className={styles.box__item}><span className={styles.box__text}>Bedrooms:</span> {oneOffer.bedrooms}</Typography>
              <Typography variant="body1" component="div" className={styles.box__item}><span className={styles.box__text}>Kitchen:</span>  {oneOffer.kitchen}</Typography>
              <Typography variant="body1" component="div" className={styles.box__item}><span className={styles.box__text}>Balcony:</span>  {oneOffer.balcony}</Typography>
              <Typography variant="body1" component="div" className={styles.box__item}><span className={styles.box__text}>Swimpool:</span>  {oneOffer.swimpool}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <div className={styles.imageContainer}>
              {oneOffer.image && oneOffer.image.map(item => (
                <Paper key={oneOffer.image.indexOf(item)} className={styles.image}>
                  <CardMedia
                    className={styles.image__item}
                    component="img"
                    image={oneOffer.image === undefined ? null : item}
                    title={`${oneOffer.name}_${oneOffer.image.indexOf(item)}`}
                  />
                </Paper>
              ))}
            </div>
          </Grid>
          <Grid item xs={12}>
            <Paper className={styles.box}>
              <Typography variant="caption" component="div" className={styles.box__item}><span className={styles.box__text}>Location lat:</span> {oneOffer.location === undefined ? 0 : oneOffer.location.lat}</Typography>
              <Typography variant="caption" component="div" className={styles.box__item}><span className={styles.box__text}>Location lng:</span> {oneOffer.location === undefined ? 0 : oneOffer.location.lng}</Typography>
              <Typography variant="caption" component="div" className={styles.box__item}><span className={styles.box__text}>Map link:</span> {oneOffer.map}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Component.propTypes = {
  fetchOneOffer: PropTypes.func,
  className: PropTypes.string,
  oneOffer: PropTypes.object,
};

const mapStateToProps = state => ({
  oneOffer: getOneOffer(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchOneOffer: () => dispatch(fetchOneApartments(props.match.params.id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Offer,
  Container as Offer,
  Component as OfferComponent,
};
