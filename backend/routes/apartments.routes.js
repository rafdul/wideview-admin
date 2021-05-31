const express = require('express');
const router = express.Router();
const Apartment = require('../models/apartment.model');
const path = require('path');

const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    let nameImage = Date.now() + '-wideviev-' + file.originalname;
    console.log('file:', file);
    cb(null, nameImage);
    console.log('nameImage:', nameImage);
  },
});
let upload = multer({ storage });


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
    console.log('req.params w get/id:', req.params);
    console.log('req.body._id:', req.body._id);
    if(!result) res.status(404).json({ offers: 'Not found'});
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/offers/add', upload.array('image', 3), async (req,res) => {
  try {
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);
    console.log('req.files:', req.files);
    // console.log('req.file.filename:', req.file.filename);
    // console.log('req.files.filename:', req.files.filename);
    console.log('req.body.image:', req.body.image);

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
    // console.log('editedOffer', editedOffer);
    if(editedOffer) {
      const changedOffer = await Apartment.updateOne({_id: req.body._id}, {$set: {name, city, category, description, price, bedrooms, kitchen, balcony, swimpool, location: {lat: locationLat, lng: locationLng}, map}});
      console.log('changedOffer', changedOffer);
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

router.delete('/offers/delete', async (req, res) => {
  try {
    console.log('req.params:', req.params);
    console.log('req.body w delete:', req.body);
    // console.log('req w delete:', req);
    const deleted = await Apartment.findById(req.body._id);
    console.log('deleted', deleted);
    if(deleted) {
      await Apartment.deleteOne({_id: req.body._id});
      res.json({message: 'Offer deleted'});
    }
    else {
      res.status(404).json({ offers: 'Not found'});
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
});


module.exports = router;
