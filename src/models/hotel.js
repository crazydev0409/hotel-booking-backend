const mongoose = require("mongoose");

// Define the Note model Schema
const hotelSchema = new mongoose.Schema(
  {
    name: String,
    status: String,
    type: String,
    images: [String],
    location: String,
    position: {
      lat: Number,
      lng: Number,
    },
    description: String,
    amenities: String,
    checkIn: String,
    checkOut: String,
    openingDays: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("hotels", hotelSchema);
