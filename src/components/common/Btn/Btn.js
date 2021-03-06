import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Btn.module.scss';

const Component = ({color, link, text, variant}) => (
  <Link to={link} className={styles.btn__link}>
    <Button variant={variant} color={color} className={styles.btn__item}>
      {text}
    </Button>
  </Link>
);

Component.propTypes = {
  color: PropTypes.string,
  link: PropTypes.string,
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
  Component as Btn,
  // Container as Btn,
  Component as BtnComponent,
};
