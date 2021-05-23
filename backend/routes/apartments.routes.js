const express = require('express');
const router = express.Router();
const Apartment = require('../models/apartment.model');

router.get('/offers', async (req, res) => {
  try {
    const result = await Apartment.find();
    console.log('offers:', result);
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
    // console.log(req);
    if(!result) res.status(404).json({ offers: 'Not found'});
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
