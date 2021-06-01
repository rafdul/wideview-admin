import React from 'react';
import PropTypes from 'prop-types';

import {BtnSubmit} from '../../common/BtnSubmit/BtnSubmit';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getOneOrder } from '../../../redux/ordersRedux.js';

import styles from './FormOrder.module.scss';

class Component extends React.Component {

  state = {
    order: {
      apartments: this.props.isNewOrder ? '' : this.props.oneOrder.apartments,
      firstName: this.props.isNewOrder ? '' : this.props.oneOrder.firstName,
      surname: this.props.isNewOrder ? '' : this.props.oneOrder.surname,
      email: this.props.isNewOrder ? '' : this.props.oneOrder.email,
      phone: this.props.isNewOrder ? '' : this.props.oneOrder.phone,
      statusSubmited: this.props.isNewOrder ? '' : this.props.oneOrder.statusSubmited,
      dataSubmited: this.props.isNewOrder ? '' : this.props.oneOrder.dataSubmited,
      idSubmited: this.props.isNewOrder ? '' : this.props.oneOrder.idSubmited,
      // dataOrder: { type: String },
      // status: { type: String },
      // idOrder: { type: String },
    },
  }

  render() {
    const { className, oneOrder, isNewOrder } = this.props;
    const { order } = this.state;
    console.log('oneOrder', oneOrder);
    console.log('isNewOrder', isNewOrder);

    return(
      <div className={clsx(className, styles.root)}>
        <h2 className={styles.title}>{isNewOrder ? 'Add order' : 'Edit order'}</h2>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} sm={9}>
            <Paper>
              <Formik
                enableReinitialize
                initialValues={{
                  apartments: order.apartments,
                  firstName: order.firstName,
                  surname: order.surname,
                  email: order.email,
                  phone: order.phone,
                  statusSubmited: order.statusSubmited,
                  dataSubmited: order.dataSubmited,
                  idSubmited: order.idSubmited,
                }}
                onSubmit={values => {
                  console.log('values', values);
                }}
                validationSchema={Yup.object().shape({
                  firstName: Yup.string().required('First name is required'),
                  surname: Yup.string().required('Surname is required'),
                  email: Yup.string().email().required('Enter valid email'),
                  phone: Yup.number().positive().integer(),
                  statusSubmited: Yup.string(),
                  dataSubmited: Yup.string(),
                  idSubmited: Yup.string(),
                })}
              >
                {({handleChange, setFieldValue, errors, touched, values}) => (
                  <Form encType="multipart/form-data" method="post">
                    <Grid container spacing={3} justify="center" className={styles.formContainer}>
                      <Grid item xs={12} sm={9}>
                        <Grid container spacing={3} justify="center">
                          <Grid item xs={12} md={6}>
                            <TextField
                              size="small"
                              name="firstName"
                              id="firstName"
                              label="First name"
                              value={values.firstName}
                              fullWidth
                              onChange={handleChange}
                              error={errors.firstName && touched.firstName ? true : false}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              size="small"
                              name="surname"
                              id="surname"
                              label="Surname"
                              value={values.surname}
                              fullWidth
                              onChange={handleChange}
                              error={errors.surname && touched.surname ? true : false}
                            />
                          </Grid>
                        </Grid>
                        <Grid container spacing={3} justify="center">
                          <Grid item xs={12} md={6}>
                            <TextField
                              size="small"
                              name="phone"
                              id="phone"
                              label="Phone"
                              value={values.phone}
                              fullWidth
                              onChange={handleChange}
                              error={errors.phone && touched.phone ? true : false}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              size="small"
                              name="email"
                              id="email"
                              label="Email"
                              value={values.email}
                              fullWidth
                              onChange={handleChange}
                              error={errors.email && touched.email ? true : false}
                            />
                          </Grid>
                        </Grid>
                        <Grid container spacing={3} justify="center">
                          <Grid item xs={12} md={6}>
                            <TextField
                              size="small"
                              name="statusSubmited"
                              id="statusSubmited"
                              label="Status of submit"
                              value={values.statusSubmited}
                              fullWidth
                              onChange={handleChange}
                              error={errors.statusSubmited && touched.statusSubmited ? true : false}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              size="small"
                              name="dataSubmited"
                              id="dataSubmited"
                              label="Date of submit"
                              value={values.dataSubmited}
                              fullWidth
                              onChange={handleChange}
                              error={errors.dataSubmited && touched.dataSubmited ? true : false}
                            />
                          </Grid>
                          <Grid item xs={12} sm={9} className={styles.paperCard__item} align="center">
                            <BtnSubmit variant='contained' color='secondary' text='Save'/>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  oneOrder: PropTypes.object,
  isNewOrder: PropTypes.bool,
};

const mapStateToProps = state => ({
  oneOrder: getOneOrder(state),
});

const mapDispatchToProps = dispatch => ({
  // someAction: arg => dispatch(reduxActionCreator(arg)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as FormOrder,
  Container as FormOrder,
  Component as FormOrderComponent,
};
