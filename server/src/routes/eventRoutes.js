// src/routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Public routes
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);

// Admin routes
router.post('/', adminMiddleware, eventController.createEvent);
router.put('/:id', adminMiddleware, eventController.updateEvent);
router.delete('/:id', adminMiddleware, eventController.deleteEvent);

module.exports = router;
