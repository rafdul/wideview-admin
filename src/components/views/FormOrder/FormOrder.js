import React from 'react';
import PropTypes from 'prop-types';

import {BtnSubmit} from '../../common/BtnSubmit/BtnSubmit';
import {DatePicker} from '../../features/DatePicker/DatePicker';
import {PlusMinusSwitcher} from '../../features/PlusMinusSwitcher/PlusMinusSwitcher';
import {DisplayOrderInForm} from '../../common/DisplayOrderInForm/DisplayOrderInForm';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import uniqid from 'uniqid';
import clsx from 'clsx';

import { connect } from 'react-redux';
import { getOneOrder, getLoadingOrders, fetchAddOneOrder, fetchEditOrder } from '../../../redux/ordersRedux.js';
import { getAllApartments, fetchAllApartments } from '../../../redux/apartmentsRedux.js';
import { getAllCategories, fetchAllCategories } from '../../../redux/categoriesRedux.js';

import styles from './FormOrder.module.scss';

class Component extends React.Component {

  state = {
    order: {
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
        }
        :
        this.props.oneOrder.apartments.length > 0
          ?
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
            };
          })
          :
          {
            name: this.props.oneOrder.apartments.name,
            city: this.props.oneOrder.apartments.city,
            priceFromNight: this.props.oneOrder.apartments.priceFromNight,
            category: this.props.oneOrder.apartments.category,
            _id: this.props.oneOrder.apartments._id,
            dataOrder: this.props.oneOrder.apartments.dataOrder,
            idOrder: this.props.oneOrder.apartments.idOrder,
            from: this.props.oneOrder.apartments.from,
            nights: this.props.oneOrder.apartments.nights,
            people: this.props.oneOrder.apartments.people,
            totalPrice: this.props.oneOrder.apartments.totalPrice,
            status: this.props.oneOrder.apartments.status,
          },

      firstName: this.props.isNewOrder ? '' : this.props.oneOrder.firstName,
      surname: this.props.isNewOrder ? '' : this.props.oneOrder.surname,
      email: this.props.isNewOrder ? '' : this.props.oneOrder.email,
      phone: this.props.isNewOrder ? '' : this.props.oneOrder.phone,
      statusSubmited: this.props.isNewOrder ? '' : this.props.oneOrder.statusSubmited,
      dataSubmited: this.props.isNewOrder ? '' : this.props.oneOrder.dataSubmited,
      idSubmited: this.props.isNewOrder ? '' : this.props.oneOrder.idSubmited,
      _id: this.props.isNewOrder ? '' : this.props.oneOrder._id,
    },

    statusProduct: {
      nights: false,
      people: false,
      date: false,
    },

    dateFrom: '',
    nights: '',
    people: '',
  }

  componentDidMount() {
    const { fetchAllOffers, fetchAllCategories } = this.props;
    fetchAllOffers();
    fetchAllCategories();
  }

  setDate = (date) => {

    this.setState({dateFrom: date.toLocaleDateString('en-US')});
  }

  setNight = (nights) => {

    this.setState({nights: parseInt(nights)});
  }

  setPeople = (people) => {

    this.setState({people: people});
  }

  render() {
    const { className, isNewOrder, loading, offers, categories, addOneOrder, editOneOrder } = this.props;
    const { order, statusProduct } = this.state;
    // console.log('order w state:', order);
    // console.log('isNewOrder:', isNewOrder);
    // console.log('offers:', offers);

    return(
      <div className={clsx(className, styles.root)}>
        {loading && loading.added
          ?
          <div>
            <h2 className={styles.title}>Well done!</h2>
          </div>
          :
          <div>
            <h2 className={styles.title}>{isNewOrder ? 'Add order' : 'Edit data client'}</h2>
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
                          // image: '',
                        }
                        :
                        order.apartments.length > 0
                          ?
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
                            };
                          })
                          :
                          {
                            name: order.apartments.name,
                            city: order.apartments.city,
                            priceFromNight: order.apartments.priceFromNight,
                            category: order.apartments.category,
                            _id: order.apartments._id,
                            dataOrder: order.apartments.dataOrder,
                            idOrder: order.apartments.idOrder,
                            from: order.apartments.from,
                            nights: order.apartments.nights,
                            people: order.apartments.people,
                            totalPrice: order.apartments.totalPrice,
                            status: order.apartments.status,
                          },
                      firstName: order.firstName,
                      surname: order.surname,
                      email: order.email,
                      phone: order.phone,
                      statusSubmited: order.statusSubmited,
                      dataSubmited: order.dataSubmited,
                      idSubmited: order.idSubmited,
                      _id: order._id,
                    }}
                    onSubmit={values => {
                      if(isNewOrder) {
                        values.apartments.from = this.state.dateFrom;
                        values.apartments.nights = this.state.nights;
                        values.apartments.totalPrice = this.state.nights * values.apartments.price;
                        values.apartments.people = this.state.people;
                        values.apartments.idOrder = uniqid('order-');
                        values.apartments.dataOrder = new Date().toISOString();
                        values.apartments.status = 'editedByAdmin';
                        values.idSubmited = uniqid('submit-');
                        values.statusSubmited = 'submited';
                        values.dataSubmited = new Date().toISOString();

                        if(this.state.nights < 1) {
                          this.setState({statusProduct: {...statusProduct, nights: true}});
                        } else if(this.state.people < 1) {
                          this.setState({statusProduct: {...statusProduct, people: true}});
                        } else if(!this.state.from) {
                          this.setState({statusProduct: {...statusProduct, date: true}});
                        } else {
                          this.setState({statusProduct: {...statusProduct, nights: false, people: false, date: false}});
                        }
                        addOneOrder(values);
                        console.log('values', values);
                      } else {
                        editOneOrder(values);
                        console.log('values', values);
                      }
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
                              <Grid item xs={12} sm={9} align="center">
                                <h5 className={styles.subtitle}>{isNewOrder ? 'Add suite' : 'Data booking'}</h5>
                              </Grid>
                            </Grid>
                          </Grid>
                          {isNewOrder
                            ?
                            <Grid item xs={12} sm={9}>
                              <Grid container spacing={3} justify="center">
                                <Grid item xs={12} md={6}>
                                  <FormControl fullWidth>
                                    <InputLabel id="name-select">Category</InputLabel>
                                    <Select
                                      labelId="name-select"
                                      fullWidth
                                      name="apartments.category"
                                      id="apartments.category"
                                      value={values.apartments.category}
                                      onChange={handleChange}
                                    >
                                      {categories.map(item =>
                                        <MenuItem key={item._id} value={item.name}>{item.name}</MenuItem>
                                      )}
                                    </Select>
                                  </FormControl>
                                </Grid>
                                {values.apartments.category && values.apartments.category.length > 0
                                  ?
                                  <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                      <InputLabel id="name-select">City</InputLabel>
                                      <Select
                                        labelId="name-select"
                                        fullWidth
                                        name="apartments.city"
                                        id="apartments.city"
                                        value={values.apartments.city}
                                        onChange={handleChange}
                                      >
                                        {offers.map(item => item.category === values.apartments.category
                                          ?
                                          <MenuItem key={item.city} value={item.city}>{item.city}</MenuItem>
                                          :
                                          null
                                        )}
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                  :
                                  null
                                }
                                {values.apartments.city && values.apartments.city.length > 0
                                  ?
                                  <Grid item xs={12}>
                                    {offers.map(item => item.city === values.apartments.city
                                      ?
                                      <Grid container spacing={3} justify="center" key={item.name}>
                                        <Grid item xs={12} md={6} >
                                          <TextField
                                            xs={12} md={6}
                                            disabled id="standard-disabled"
                                            label="Name"
                                            defaultValue={values.apartments.name = item.name}
                                            className={styles.box}
                                          />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                          <TextField
                                            xs={12} md={6}
                                            disabled id="standard-disabled"
                                            label="Price (for night)"
                                            defaultValue={values.apartments.priceFromNight = item.price}
                                            className={styles.box}
                                          />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                          <div className={styles.name + ' ' + styles.date}>
                                            <Typography gutterBottom variant="body1" component="p" className={styles.text}>
                                              From:
                                            </Typography>
                                          </div>
                                          <div className={styles.choose}>
                                            <DatePicker setDate={this.setDate} />
                                            {statusProduct.date && !this.state.dateFrom
                                              ? <span className={styles.content__alert + ' ' + styles.content__alert_date}>You have to choose date from</span>
                                              : null
                                            }
                                          </div>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                          <div className={styles.name}>
                                            <Typography gutterBottom variant="body1" component="p" className={styles.text}>
                                              Nights:
                                            </Typography>
                                          </div>
                                          <div className={styles.choose}>
                                            <PlusMinusSwitcher setAmount={this.setNight} />
                                            {statusProduct.nights  && this.state.nights === 0
                                              ? <span className={styles.content__alert}>You have to choose amount of nights</span>
                                              : null
                                            }
                                          </div>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                          <div className={styles.name}>
                                            <Tooltip title={`max. ${item.bedrooms *2 } people`}>
                                              <Typography gutterBottom variant="body1" component="p" className={styles.text}>
                                                People <FontAwesomeIcon icon={faInfoCircle} className={styles.fontIcon}/> :
                                              </Typography>
                                            </Tooltip>
                                          </div>
                                          <div className={styles.choose}>
                                            <PlusMinusSwitcher maxValue={`${item.bedrooms *2}`} setAmount={this.setPeople} />
                                            {statusProduct.people && this.state.people === 0
                                              ? <span className={styles.content__alert}>You have to choose amount of people</span>
                                              : null
                                            }
                                          </div>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                          <TextField
                                            xs={12} md={6}
                                            label="Total price"
                                            value={values.apartments.totalPrice = this.state.nights * item.price}
                                            className={styles.box}
                                          />
                                        </Grid>
                                      </Grid>
                                      :
                                      null
                                    )}
                                  </Grid>
                                  :
                                  null
                                }
                              </Grid>
                            </Grid>
                            :
                            order.apartments.length > 0
                              ?
                              order.apartments.map(apartment =>
                                <DisplayOrderInForm key={apartment._id} order={apartment}/>
                              )
                              :
                              <DisplayOrderInForm order={order.apartments}/>
                          }
                          <Grid item xs={12} sm={9} align="center" className={styles.btn}>
                            <BtnSubmit variant='contained' color='secondary' text='Save'/>
                          </Grid>
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
  fetchAllOffers: PropTypes.func,
  offers: PropTypes.array,
  categories: PropTypes.array,
  fetchAllCategories: PropTypes.func,
};

const mapStateToProps = state => ({
  oneOrder: getOneOrder(state),
  loading: getLoadingOrders(state),
  offers: getAllApartments(state),
  categories: getAllCategories(state),
});

const mapDispatchToProps = dispatch => ({
  addOneOrder: order => dispatch(fetchAddOneOrder(order)),
  editOneOrder: order => dispatch(fetchEditOrder(order)),
  fetchAllOffers: offer => dispatch(fetchAllApartments(offer)),
  fetchAllCategories: category => dispatch(fetchAllCategories(category)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as FormOrder,
  Container as FormOrder,
  Component as FormOrderComponent,
};
