// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const eventRoutes = require('./routes/eventRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/events', eventRoutes);
app.use('/booking', bookingRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Smart Event Booking System Backend Running');
});

module.exports = app;  
