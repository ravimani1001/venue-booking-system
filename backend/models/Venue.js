const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  location: {
    type: String,
    required: true,
    trim: true,
  },

  capacity: {
    type: Number,
    required: true,
  },
  
  price : {
    type : Number,
    required : true
  },

  images: [
    {
      url: String,
      public_id: String
    }

  ],

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  bookedDates: [
    {
      type: Date,
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Venue', venueSchema);
