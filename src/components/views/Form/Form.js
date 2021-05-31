import React from 'react';
import PropTypes from 'prop-types';
import ImageUploader from 'react-images-upload';

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
import { getOneOffer, getLoadingApartments, fetchAddOneApartments, fetchEmptyOne, fetchEditApartments } from '../../../redux/apartmentsRedux.js';

import styles from './Form.module.scss';

class Component extends React.Component {

  state = {
    offer: {
      _id: this.props.isNewAnnounce ? '' : this.props.oneOffer._id,
      name: this.props.isNewAnnounce ? '' : this.props.oneOffer.name,
      city: this.props.isNewAnnounce ? '' : this.props.oneOffer.city,
      category: this.props.isNewAnnounce ? '' : this.props.oneOffer.category,
      description: this.props.isNewAnnounce ? '' : this.props.oneOffer.description,
      price: this.props.isNewAnnounce ? '' : this.props.oneOffer.price,
      bedrooms: this.props.isNewAnnounce ? '' : this.props.oneOffer.bedrooms,
      kitchen: this.props.isNewAnnounce ? '' : this.props.oneOffer.kitchen,
      balcony: this.props.isNewAnnounce ? '' : this.props.oneOffer.balcony,
      swimpool: this.props.isNewAnnounce ? '' : this.props.oneOffer.swimpool,
      location: this.props.isNewAnnounce ? '' : this.props.oneOffer.location,
      map: this.props.isNewAnnounce ? '' : this.props.oneOffer.map,
      image: this.props.isNewAnnounce ? '' : this.props.oneOffer.image,
    },
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(this.props.isNewAnnounce && this.props.isNewAnnounce !== prevProps.isNewAnnounce) {
      console.log('prevProps', prevProps);
      console.log('prevState', prevState);

      const {fetchEmptyOne} = this.props;
      fetchEmptyOne();

      this.setState({
        offer: {
          _id: '',
          name: '',
          city: '',
          category: '',
          description: '',
          price: '',
          bedrooms: '',
          kitchen: '',
          balcony: '',
          swimpool: '',
          location: '',
          map: '',
          image: '',
        },
      });
    }
  }

  render() {
    const {className, addOneOffer, isNewAnnounce, oneOffer, loading, editOneOffer} = this.props;
    const {offer} = this.state;

    console.log('isNewAnnounce', isNewAnnounce);
    console.log('oneOffer', oneOffer);
    console.log('offer', offer);

    return(
      <div className={clsx(className, styles.root)}>

        {loading && loading.added
          ?
          <div>
            <h2 className={styles.title}>Well done!</h2>
          </div>
          :
          <div>
            <h2 className={styles.title}>{isNewAnnounce ? 'Add offer' : 'Edit offer'}</h2>
            <Grid container spacing={3} justify="center">
              <Grid item xs={12} sm={9}>
                <Paper>
                  <Formik
                    enableReinitialize
                    initialValues={{
                      name: offer.name,
                      city: offer.city,
                      category: offer.category,
                      description: offer.description,
                      price: offer.price,
                      bedrooms: offer.bedrooms,
                      kitchen: offer.kitchen,
                      balcony: offer.balcony,
                      swimpool: offer.swimpool,
                      locationLat: isNewAnnounce ? '' : (oneOffer.location === undefined ? 0 : oneOffer.location.lat),
                      locationLng: isNewAnnounce ? '' : (oneOffer.location === undefined ? 0 : oneOffer.location.lng),
                      map: offer.map,
                      image: offer.image,
                    }}
                    onSubmit={values => {
                      console.log('values', values);
                      if(isNewAnnounce) {
                        const formData = new FormData();
                        for (let key of ['name','city', 'category', 'description', 'price', 'bedrooms', 'kitchen', 'balcony', 'swimpool', 'locationLat', 'locationLng', 'map']) {
                          formData.append(key, values[key]);
                        }
                        console.log('values.image', values.image);
                        values.image.map(el => formData.append('image', el));
                        // formData.append('image', values.image);
                        console.log(formData);
                        addOneOffer(formData);
                      } else {
                        values._id = offer._id;
                        editOneOffer(values);
                      }
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
                    {({handleChange, setFieldValue, errors, touched, values}) => (
                      <Form encType="multipart/form-data" method="post">
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
                          <Grid item xs={12} sm={9}>
                            <Typography variant="body1" gutterBottom align="center">
                              Add photo
                            </Typography>
                            <ImageUploader
                              name="image"
                              id="image"
                              withIcon={true}
                              buttonText='Choose image'
                              imgExtension={['.jpg', '.gif', '.png']}
                              maxFileSize={5242880}
                              withPreview={true}
                              onChange={event => {
                                setFieldValue('image', event);
                                console.log('event', event);
                                console.log('event', values.image.concat(event));
                              }}
                              className={styles.file}
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
        }
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  addOneOffer: PropTypes.func,
  isNewAnnounce: PropTypes.bool,
  oneOffer: PropTypes.object,
  fetchEmptyOne: PropTypes.func,
  loading: PropTypes.object,
  editOneOffer: PropTypes.func,
};

const mapStateToProps = state => ({
  oneOffer: getOneOffer(state),
  loading: getLoadingApartments(state),
});

const mapDispatchToProps = dispatch => ({
  addOneOffer: offer => dispatch(fetchAddOneApartments(offer)),
  fetchEmptyOne: arg => dispatch(fetchEmptyOne(arg)),
  editOneOffer: offer => dispatch(fetchEditApartments(offer)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Form,
  Container as Form,
  Component as FormComponent,
};
