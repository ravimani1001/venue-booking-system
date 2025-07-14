const Venue = require('../models/Venue');
const cloudinary = require('../config/cloudinary');

// Helper function to upload one file buffer to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'venue-images' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};

const addVenue = async (req, res) => {
  try {
    const { name, description, location, capacity, price } = req.body;
    if(!name || !description || !location || !capacity || !price){
        return res.status(400).json({message : "All fields are required"})
    }

    // Handle image upload to Cloudinary
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'At least one image is required' });
    }

    const imageUrls = [];

    for (const file of files) {
      const imageUrl = await uploadToCloudinary(file.buffer);
      imageUrls.push(imageUrl);
    }

    const venue = new Venue({
      name,
      description,
      location,
      capacity : parseInt(capacity),
      price : parseFloat(price),
      images: imageUrls,
      ownerId: req.user._id,
    });

    await venue.save();

    res.status(201).json({
      message: 'Venue created with images',
      venue
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAllVenues = async (req, res) => {
  try {
    const { location, capacity, name } = req.query;

    let query = {};
    if (name) query.name = new RegExp(name, 'i');
    if (location) query.location = new RegExp(location, 'i');
    if (capacity) query.capacity = { $gte: Number(capacity) };

    const venues = await Venue.find(query).populate('ownerId', 'name email');

    res.status(200).json({
      message: 'Venues fetched successfully',
      total: venues.length,
      venues
    });

  } catch (error) {
    console.error('Error fetching venues:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
    addVenue,
    getAllVenues,
}