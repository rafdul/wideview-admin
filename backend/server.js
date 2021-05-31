const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const offersRoutes = require('./routes/apartments.routes');
const ordersRoutes = require('./routes/orders.routes');

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* API ENDPOINTS */
app.use('/api', offersRoutes);
app.use('/api', ordersRoutes);

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ offer: 'Not found...' });
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, '../public/images/offers')));
app.use(express.static(path.join(__dirname, '../build')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});


/* MONGOOSE */
// mongoose.connect(`mongodb+srv://${process.env.userApp}:${process.env.mongoApp}@cluster0.67klc.mongodb.net/videwievDB?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb://localhost:27017/videwievDB', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect(`mongodb+srv://rafal:kodilla@cluster0.67klc.mongodb.net/videwievDB?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* START SERVER */
console.log('process.env.PORT', process.env.PORT);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: '+ port);
});
console.log('port', port);
