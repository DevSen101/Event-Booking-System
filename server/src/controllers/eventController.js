// src/controllers/eventController.js
const Event = require('../models/eventModel');

exports.createEvent = async (req, res) => {
  try {
    const event = req.body;
    event.available_seats = event.total_seats; 
    const result = await Event.create(event);
    res.status(201).json({ message: 'Event created', eventId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const filters = { location: req.query.location, date: req.query.date };
    const events = await Event.getAll(filters);
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.getById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = req.body;
    await Event.update(req.params.id, event);
    res.json({ message: 'Event updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await Event.delete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
