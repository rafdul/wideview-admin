const express = require('express');
const router = express.Router();
const Apartment = require('../models/apartment.model');

router.get('/offers', async (req, res) => {
  try {
    const result = await Apartment.find();
    // console.log('offers:', result);
    if(!result) res.status(404).json({ offers: 'Not found'});
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/offers/:id', async (req, res) => {
  try {
    const result = await Apartment.findById(req.params.id);
    console.log(req.params);
    if(!result) res.status(404).json({ offers: 'Not found'});
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/offers/add', async (req,res) => {
  try {
    console.log('req.body', req.body);
    const {name, city, category, description, price, bedrooms, kitchen, balcony, swimpool, locationLat, locationLng, map } = req.body;

    const newOrder = new Apartment({name, city, category, description, price, bedrooms, kitchen, balcony, swimpool, location: {lat: locationLat, lng: locationLng}, map});
    await newOrder.save();
    res.json(newOrder);
    console.log('newOrder', newOrder);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.put('/offers/:id/edit', async (req, res) => {
  try {
    console.log('req.body edit', req.body);
    const {name, city, category, description, price, bedrooms, kitchen, balcony, swimpool, locationLat, locationLng, map } = req.body;

    const editedOffer = await Apartment.findById(req.body._id);
    console.log('editedOffer', editedOffer);
    if(editedOffer) {
      const changedOffer = await Apartment.updateOne({_id: req.body._id}, {$set: {name, city, category, description, price, bedrooms, kitchen, balcony, swimpool, location: {lat: locationLat, lng: locationLng}, map}});
      res.json(changedOffer);
    }
    else {
      throw new Error('Something wrong!');
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
