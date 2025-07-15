const Venue = require("../models/Venue");
const cloudinary = require("../config/cloudinary");

// Helper function to upload one file buffer to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "venue-images" },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );
    stream.end(fileBuffer);
  });
};

const addVenue = async (req, res) => {
  try {
    const { name, description, location, capacity, price } = req.body;
    if (!name || !description || !location || !capacity || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Handle image upload to Cloudinary
    const files = req.files;
    if (!files || files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }

    const imageUrls = [];

    for (const file of files) {
      const imageUrl = await uploadToCloudinary(file.buffer);
      imageUrls.push({
        url: imageUrl.url,
        public_id: imageUrl.public_id,
      });
    }

    const venue = new Venue({
      name,
      description,
      location,
      capacity: parseInt(capacity),
      price: parseFloat(price),
      images: imageUrls,
      ownerId: req.user._id,
    });

    await venue.save();

    res.status(201).json({
      message: "Venue created with images",
      venue,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllVenues = async (req, res) => {
  try {
    const { location, capacity, name } = req.query;

    let query = {};
    if (name) query.name = new RegExp(name, "i");
    if (location) query.location = new RegExp(location, "i");
    if (capacity) query.capacity = { $gte: Number(capacity) };

    const venues = await Venue.find(query).populate("ownerId", "name email");

    res.status(200).json({
      message: "Venues fetched successfully",
      total: venues.length,
      venues,
    });
  } catch (error) {
    console.error("Error fetching venues:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getMyVenues = async (req, res) => {
  try {
    const venues = await Venue.find({ ownerId: req.user._id });
    if (!venues) {
      res.status(200).json({ message: "No venue found." });
    }

    res.status(200).json({
      message: "Your venues fetched successfully",
      total: venues.length,
      venues,
    });
  } catch (error) {
    console.error("Error fetching my venues:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateVenue = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, location, capacity, price } = req.body;
    const files = req.files;

    const updates = {};
    if (name) updates.name = name;
    if (description) updates.description = description;
    if (location) updates.location = location;
    if (capacity) updates.capacity = parseInt(capacity);
    if (price) updates.price = parseFloat(price);

    const venue = await Venue.findById(id);
    if (!venue) return res.status(404).json({ message: "Venue not found" });

    // Check if logged-in admin owns this venue
    if (venue.ownerId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized: You do not own this venue" });
    }

    // Update allowed fields
    const allowedFields = [
      "name",
      "description",
      "location",
      "capacity",
      "price",
    ];
    allowedFields.forEach((field) => {
      if (updates[field] !== undefined && updates[field] !== null) {
        venue[field] = updates[field];
      }
    });

    // Handle image replacement if files are sent
    if (files && files.length > 0) {
      const imageUrls = [];
      for (const file of files) {
        const imageUrl = await uploadToCloudinary(file.buffer);
        imageUrls.push({
          url: imageUrl.url,
          public_id: imageUrl.public_id,
        });
      }
      venue.images = imageUrls; // replace all images
    }

    await venue.save();

    res.status(200).json({
      message: "Venue updated successfully",
      venue,
    });
  } catch (error) {
    console.error("Error updating venue:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteVenue = async (req, res) => {
  try {
    const { id } = req.params;

    const venue = await Venue.findById(id);
    if (!venue) return res.status(404).json({ message: "Venue not found" });

    // Check ownership
    if (venue.ownerId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized: You do not own this venue" });
    }

    // Delete all associated Cloudinary images
    for (const img of venue.images) {
      if (img.public_id) {
        try {
          await cloudinary.uploader.destroy(img.public_id);
        } catch (err) {
          console.error(
            `Failed to delete image ${img.public_id}:`,
            err.message
          );
        }
      }
    }

    await venue.deleteOne(); // or use Venue.findByIdAndDelete(id)

    res.status(200).json({ message: "Venue deleted successfully" });
  } catch (error) {
    console.error("Error deleting venue:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addVenue,
  getAllVenues,
  getMyVenues,
  updateVenue,
  deleteVenue,
};
