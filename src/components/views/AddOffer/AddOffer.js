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

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { fetchAddOneApartments } from '../../../redux/apartmentsRedux.js';

import styles from './AddOffer.module.scss';

class Component extends React.Component {

  render() {
    const {className, addOneOffer} = this.props;

    return(
      <div className={clsx(className, styles.root)}>
        <h2 className={styles.title}>Add offer</h2>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} sm={9}>
            <Paper>
              <Formik
                initialValues={{
                  name: '',
                  city: '',
                  category: '',
                  description: '',
                  price: '',
                  bedrooms: '',
                  kitchen: '',
                  balcony: '',
                  swimpool: '',
                  locationLat: '',
                  locationLng: '',
                  map: '',
                }}
                onSubmit={values => {
                  console.log('values', values);
                  addOneOffer(values);
                }}
                validationSchema={Yup.object().shape({
                  name: Yup.string().required('Name of suit is required'),
                  city: Yup.string().required('City is required'),
                  category: Yup.string().required('Chose category from list'),
                  description: Yup.string().max(80, 'Required max. 80 characters'),
                  price: Yup.number().required('Price should be positive number').positive().integer(),
                  bedrooms: Yup.string().required('Amount of number should be positive number'),
                  kitchen: Yup.string(),
                  balcony: Yup.string(),
                  swimpool: Yup.string(),
                  locationLat: Yup.number(),
                  locationLng: Yup.number(),
                  map: Yup.string(),
                })}
              >

                {({handleChange, errors, touched, values}) => (
                  <Form>
                    <Grid container spacing={3} justify="center" className={styles.formContainer}>
                      <Grid item xs={12} sm={9}>
                        <TextField
                          size="small"
                          name="name"
                          id="name"
                          label="Name"
                          value={values.name}
                          fullWidth
                          onChange={handleChange}
                          error={errors.name && touched.name ? true : false}
                        />
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <Grid container spacing={3} justify="center">
                          <Grid item xs={12} sm={4}>
                            <TextField
                              size="small"
                              name="city"
                              id="city"
                              label="City"
                              value={values.city}
                              fullWidth
                              onChange={handleChange}
                              error={errors.city && touched.city ? true : false}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <FormControl fullWidth >
                              <InputLabel id="category-select">Category</InputLabel>
                              <Select
                                labelId="category-select"
                                fullWidth
                                name="category"
                                id="category"
                                value={values.category}
                                onChange={handleChange}
                                error={errors.category && touched.category ? true : false}
                              >
                                <MenuItem value="cities">cities</MenuItem>
                                <MenuItem value="countryside">countryside</MenuItem>
                                <MenuItem value="mountains">mountains</MenuItem>
                                <MenuItem value="seaside">seaside</MenuItem>
                              </Select>
                            </FormControl>
                            <FormHelperText>Choose category</FormHelperText>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              size="small"
                              type="number"
                              name="price"
                              id="price"
                              label="Price"
                              value={values.price}
                              fullWidth
                              onChange={handleChange}
                              error={errors.price && touched.price ? true : false}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <TextField
                          size="small"
                          variant="outlined"
                          name="description"
                          id="description"
                          label="Description"
                          value={values.description}
                          fullWidth
                          multiline
                          rows={4}
                          onChange={handleChange}
                          error={errors.description && touched.description ? true : false}
                        />
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <Grid container spacing={3} justify="center">
                          <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth>
                              <InputLabel id="bedrooms-select">Bedrooms</InputLabel>
                              <Select
                                labelId="bedrooms-select"
                                fullWidth
                                name="bedrooms"
                                id="bedrooms"
                                value={values.bedrooms}
                                onChange={handleChange}
                                error={errors.bedrooms && touched.bedrooms ? true : false}
                              >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth>
                              <InputLabel id="kitchen-select">Kitchen</InputLabel>
                              <Select
                                labelId="kitchen-select"
                                fullWidth
                                name="kitchen"
                                id="kitchen"
                                value={values.kitchen}
                                onChange={handleChange}
                              >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth>
                              <InputLabel id="balcony-select">Balcony</InputLabel>
                              <Select
                                labelId="balcony-select"
                                fullWidth
                                name="balcony"
                                id="balcony"
                                value={values.balcony}
                                onChange={handleChange}
                              >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth>
                              <InputLabel id="swimpool-select">Swimpool</InputLabel>
                              <Select
                                labelId="swimpool-select"
                                fullWidth
                                name="swimpool"
                                id="swimpool"
                                value={values.swimpool}
                                onChange={handleChange}
                              >
                                <MenuItem value="private">private</MenuItem>
                                <MenuItem value="public">public</MenuItem>
                                <MenuItem value="no">no</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <Grid container spacing={3} justify="center">
                          <Grid item xs={12} sm={6}>
                            <TextField
                              type="number"
                              size="small"
                              name="locationLat"
                              id="locationLat"
                              label="LocationLat"
                              value={values.locationLat}
                              fullWidth
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              type="number"
                              size="small"
                              name="locationLng"
                              id="locationLng"
                              label="LocationLng"
                              value={values.locationLng}
                              fullWidth
                              onChange={handleChange}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <TextField
                          size="small"
                          name="map"
                          id="map"
                          label="Map"
                          value={values.map}
                          fullWidth
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={9} className={styles.paperCard__item} align="center">
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
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  addOneOffer: PropTypes.func,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  addOneOffer: offer => dispatch(fetchAddOneApartments(offer)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as AddOffer,
  Container as AddOffer,
  Component as AddOfferComponent,
};
