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
import { Input } from '@material-ui/core';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getOneOrder, getLoadingOrders, fetchAddOneOrder, fetchEditOrder } from '../../../redux/ordersRedux.js';
import { getAllApartments, fetchAllApartments } from '../../../redux/apartmentsRedux.js';

import styles from './FormOrder.module.scss';

class Component extends React.Component {

  state = {
    order: {
      // apartments: this.props.isNewOrder ? '' : this.props.oneOrder.apartments,
      apartments: this.props.isNewOrder
        ?
        {
          name: '',
          city: '',
          priceFromNight: '',
          category: '',
          _id: '',
          dataOrder: '',
          idOrder: '',
          from: '',
          nights: '',
          people: '',
          totalPrice: '',
          status: '',
          image: '',
        }
        :
        this.props.oneOrder.apartments.map(el => {
          return {
            name: el.name,
            city: el.city,
            priceFromNight: el.priceFromNight,
            category: el.category,
            _id: el._id,
            dataOrder: el.dataOrder,
            idOrder: el.idOrder,
            from: el.from,
            nights: el.nights,
            people: el.people,
            totalPrice: el.totalPrice,
            status: el.status,
            image: el.image,
          };
        }),
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

  componentDidMount() {
    const {fetchAllOffers} = this.props;
    fetchAllOffers();
  }

  render() {
    const { className, oneOrder, isNewOrder, loading, offers } = this.props;
    const { order } = this.state;
    console.log('order w state:', order);
    console.log('order.apartments w state:', order.apartments);
    console.log('oneOrder:', oneOrder);
    console.log('oneOrder.name:', oneOrder.apartments);
    console.log('isNewOrder:', isNewOrder);

    return(
      <div className={clsx(className, styles.root)}>
        {loading && loading.added
          ?
          <div>
            <h2 className={styles.title}>Well done!</h2>
          </div>
          :
          <div>
            <h2 className={styles.title}>{isNewOrder ? 'Add order' : 'Edit order'}</h2>
            <Grid container spacing={3} justify="center">
              <Grid item xs={12} sm={9}>
                <Paper>
                  <Formik
                    enableReinitialize
                    initialValues={{
                      apartments: this.props.isNewOrder
                        ?
                        {
                          name: '',
                          city: '',
                          priceFromNight: '',
                          category: '',
                          _id: '',
                          dataOrder: '',
                          idOrder: '',
                          from: '',
                          nights: '',
                          people: '',
                          totalPrice: '',
                          status: '',
                          image: '',
                        }
                        :
                        order.apartments.map(i => {
                          return {
                            name: i.name,
                            city: i.city,
                            priceFromNight: i.priceFromNight,
                            category: i.category,
                            _id: i._id,
                            dataOrder: i.dataOrder,
                            idOrder: i.idOrder,
                            from: i.from,
                            nights: i.nights,
                            people: i.people,
                            totalPrice: i.totalPrice,
                            status: i.status,
                            image: i.image,
                          };
                        }),
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
                          {isNewOrder
                            ?
                            <Grid item xs={12} sm={9}>
                              <Grid container spacing={3} justify="center">
                                <Grid item xs={12} md={6}>
                                  <FormControl fullWidth>
                                    <InputLabel id="name-select">Apartments</InputLabel>
                                    <Select
                                      labelId="name-select"
                                      fullWidth
                                      name="apartments.name"
                                      id="apartments.name"
                                      value={values.apartments.name}
                                      onChange={handleChange}
                                    >
                                      {offers.map(item =>
                                        <MenuItem key={item._id} value={item.name}>{item.name}</MenuItem>
                                      )}
                                      {console.log('values.apartments.name', values.apartments.name)}
                                    </Select>
                                  </FormControl>
                                </Grid>
                                {values.apartments.name.length > 0
                                  ?
                                  <Grid item xs={12} md={6}>
                                    {offers.map(item => item.name === values.apartments.name
                                      ?
                                      <TextField
                                        key={item.city}
                                        disabled id="standard-disabled"
                                        label="City"
                                        defaultValue={values.apartments.city = item.city}
                                      />
                                      :
                                      null
                                    )}
                                    {console.log('values.apartments.city', values.apartments.city)}
                                  </Grid>
                                  :
                                  null
                                }

                              </Grid>
                            </Grid>
                            :
                            order.apartments.map(apartment =>
                              <Grid item xs={12} sm={9} key={apartment._id}>
                                <h6>Booking: {apartment.name}</h6>
                                <Grid container spacing={3} justify="center">
                                  <Grid item xs={12} md={6}>
                                    <TextField disabled id="standard-disabled" label="Apartments" defaultValue={apartment.name}/>
                                  </Grid>
                                </Grid>
                              </Grid>
                            )
                          }
                        </Grid>
                      </Form>
                    )}
                  </Formik>
                </Paper>
              </Grid>
            </Grid>
          </div>
        }
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  oneOrder: PropTypes.object,
  isNewOrder: PropTypes.bool,
  addOneOrder: PropTypes.func,
  editOneOrder: PropTypes.func,
  loading: PropTypes.object,
  fetchAllOffers:PropTypes.func,
  offers: PropTypes.array,
};

const mapStateToProps = state => ({
  oneOrder: getOneOrder(state),
  loading: getLoadingOrders(state),
  offers: getAllApartments(state),

});

const mapDispatchToProps = dispatch => ({
  addOneOrder: order => dispatch(fetchAddOneOrder(order)),
  editOneOrder: order => dispatch(fetchEditOrder(order)),
  fetchAllOffers: offer => dispatch(fetchAllApartments(offer)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as FormOrder,
  Container as FormOrder,
  Component as FormOrderComponent,
};
