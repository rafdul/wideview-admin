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
    // console.log('req.body', req.body);
    // const {} = req.body;

    // const newOrder = new Apartment({});
    // await newOrder.save();
    // res.json(newOrder);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
