// src/controllers/bookingController.js
const Booking = require('../models/bookingModel');
const Event = require('../models/eventModel');

exports.createBooking = async (req, res) => {
  try {
    const { event_id, name, email, mobile, quantity } = req.body;

    const event = await Event.getById(event_id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.available_seats < quantity)
      return res.status(400).json({ message: 'Not enough seats available' });

    const total_amount = event.price * quantity;

    await Event.reduceSeats(event_id, quantity);

    const booking = await Booking.create({ event_id, name, email, mobile, quantity, total_amount });

    res.status(201).json({ message: 'Booking confirmed', bookingId: booking.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
