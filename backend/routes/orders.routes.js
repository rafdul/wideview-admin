const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');

router.get('/orders', async (req, res) => {
  try {
    const result = await Order.find().sort({dataSubmited: -1});
    // console.log('orders', result);
    if(!result) res.status(404).json({ orders: 'Not found'});
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/orders/:id', async (req, res) => {
  try {
    const result = await Order.findById(req.params.id);
    // console.log(req);
    if(!result) res.status(404).json({ orders: 'Not found'});
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/orders/add', async (req,res) => {
  try {
    console.log('req.body:', req.body);
    const { apartments, firstName, surname, email, phone, statusSubmited, dataSubmited, idSubmited } = req.body;

    const newOrder = new Order({ apartments, firstName, surname, email, phone, statusSubmited, dataSubmited, idSubmited });
    await newOrder.save();
    res.json(newOrder);
    console.log('newOrder', newOrder);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.put('/orders/:id/edit', async (req,res) => {
  try {
    const { apartments, firstName, surname, email, phone, statusSubmited, dataSubmited, idSubmited } = req.body;

    const editedOrder = await Order.findById(req.body._id);
    if(editedOrder) {
      const changedOrder = await Order.updateOne({_id: req.body._id}, {$set: { apartments, firstName, surname, email, phone, statusSubmited, dataSubmited, idSubmited }});
      res.json(changedOrder);
    } else {
      throw new Error('Something wrong!');
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/orders/delete', async (req, res) => {
  try {
    const deleted = await Order.findById(req.body._id);
    if(deleted) {
      await Order.deleteOne({_id: req.body._id});
      res.json({message: 'Order deleted'});
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
