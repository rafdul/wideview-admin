import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';

const Component = ({className}) => (
  <div className={clsx(className, styles.root)}>
    <div className={styles.containerHeader}>
      <div className={styles.mainLogo}>
        <Link to={'/'}>
          <img src="/images/logo/logo.svg" alt="logo" title="logo" className={styles.image}/>
        </Link>
      </div>
      <div className={styles.mainMenu}>
        <Navbar bg="light" variant="light" className={styles.menu__list}>
          <Nav className={clsx('mr-auto', styles.menu__list__flex)} >
            <Nav.Link as={Link} to={'/orders'} className={styles.menu__list__item}>Orders</Nav.Link>
            <Nav.Link as={Link} to={'/offers'} className={styles.menu__list__item}>Offers</Nav.Link>
            <Nav.Link as={Link} to={'/offers/add'} className={styles.menu__list__item}>Add offer</Nav.Link>
            <Nav.Link as={Link} to={'/orders/add'} className={styles.menu__list__item}>Add order</Nav.Link>
          </Nav>
        </Navbar>
      </div>
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
  Component as Header,
  // Container as Header,
  Component as HeaderComponent,
};
