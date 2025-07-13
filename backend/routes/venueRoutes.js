const express = require('express');
const router = express.Router();
const { protect, checkAdmin } = require('../middleware/authMiddleware');
const { addVenue } = require('../controllers/venueController');
const upload = require('../middleware/multer');

router.post('/venues', protect, checkAdmin, upload.array('images', 5), addVenue);

module.exports = router;
