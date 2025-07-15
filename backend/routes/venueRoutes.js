const express = require('express');
const router = express.Router();
const { protect, checkAdmin } = require('../middleware/authMiddleware');
const { addVenue, getAllVenues, getMyVenues, updateVenue } = require('../controllers/venueController');
const upload = require('../middleware/multer');

router.post('/venues', protect, checkAdmin, upload.array('images', 5), addVenue);
router.get('/venues', getAllVenues);
router.get('/my-venues', protect, checkAdmin, getMyVenues);
router.put('/venues/:id', protect, checkAdmin, upload.array('images', 5), updateVenue);

module.exports = router;
