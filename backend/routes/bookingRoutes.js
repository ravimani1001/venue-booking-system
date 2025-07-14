const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { bookVenue } = require('../controllers/bookingController');

router.post('/bookings', protect, bookVenue);

module.exports = router;
