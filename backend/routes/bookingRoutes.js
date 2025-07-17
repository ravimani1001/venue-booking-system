const express = require('express');
const router = express.Router();
const { protect, checkAdmin } = require('../middleware/authMiddleware');
const { bookVenue, getBookingsForAdmin, getMyBookings } = require('../controllers/bookingController');

router.post('/bookings', protect, bookVenue);
router.get('/my-venues/bookings', protect, checkAdmin, getBookingsForAdmin);
router.get('/bookings/me', protect, getMyBookings);

module.exports = router;
