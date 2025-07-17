const express = require('express');
const router = express.Router();
const { protect, checkAdmin } = require('../middleware/authMiddleware');
const { bookVenue, getBookingsForAdmin } = require('../controllers/bookingController');

router.post('/bookings', protect, bookVenue);
router.get('/my-venues/bookings', protect, checkAdmin, getBookingsForAdmin);

module.exports = router;
