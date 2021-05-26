import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './BtnSubmit.module.scss';

const Component = ({color, text, variant}) => (
  <Button type="submit" variant={variant} color={color} className={styles.btn__item}>
    {text}
  </Button>
);

Component.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  variant: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as BtnSubmit,
  // Container as BtnSubmit,
  Component as BtnSubmitComponent,
};
