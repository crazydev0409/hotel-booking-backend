const mongoose = require("mongoose");

// Define the Note model Schema
const ticketSchema = new mongoose.Schema(
  {
    name: String,
    guestAllowed: Number,
    amenities: [String],
    cancellationPolicy: String,
    price: Number,
    wasPrice: Number,
    roomAvailable: Number,
    images: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("tickets", ticketSchema);
