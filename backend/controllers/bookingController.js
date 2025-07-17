const Venue = require('../models/Venue');
const Booking = require('../models/Booking');

const bookVenue = async (req, res) => {
  try {
    const { venueId, dates } = req.body;

    if (!venueId || !Array.isArray(dates) || dates.length === 0) {
      return res.status(400).json({ message: 'Venue ID and at least one booking date are required' });
    }

    const venue = await Venue.findById(venueId);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });

    const requestedDates = dates.map(date => new Date(date).toDateString());
    const alreadyBooked = venue.bookedDates.map(d => new Date(d).toDateString());

    // Check for conflicts
    const conflicts = requestedDates.filter(date => alreadyBooked.includes(date));
    if (conflicts.length > 0) {
      return res.status(400).json({
        message: 'Some of the selected dates are already booked',
        conflicts
      });
    }

    // Add new dates
    const newBookedDates = requestedDates.map(date => new Date(date));
    venue.bookedDates.push(...newBookedDates);
    await venue.save();

    // Calculate total price
    const pricePerDay = venue.price; // add this to Venue model
    const totalPrice = pricePerDay * dates.length;

    // Create booking
    const booking = await Booking.create({
    userId: req.user._id,
    venueId: venue._id,
    dates: newBookedDates,
    totalPrice
    });

    res.status(201).json({
      message: 'Venue booked successfully',
      venue: venue.name,
      location : venue.location,
      booking
    });

  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getBookingsForAdmin = async (req, res) => {
  try {
    const adminId = req.user._id;

    // Step 1: Get all venue IDs owned by admin
    const venues = await Venue.find({ ownerId: adminId });
    const venueIds = venues.map(v => v._id);

    // Step 2: Find all bookings for those venues
    const bookings = await Booking.find({ venueId: { $in: venueIds } })
      .populate('venueId', 'name location') // get venue name + location
      .populate('userId', 'name email');     // get user info

    res.status(200).json({
      message: 'All bookings for your venues',
      total: bookings.length,
      bookings
    });

  } catch (error) {
    console.error('Error getting admin bookings:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookings = await Booking.find({ userId })
      .populate('venueId', 'name location price')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Your bookings fetched successfully',
      total: bookings.length,
      bookings
    });

  } catch (error) {
    console.error('Error fetching my bookings:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
    bookVenue,
    getBookingsForAdmin,
    getMyBookings,
}