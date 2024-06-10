const mongoose = require("mongoose");

// Define the Note model Schema
const spotSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    location: String,
    position: {
      lat: Number,
      lng: Number,
    },
    amenities: [String],
    entrancePolicies: [String],
    closingPolicies: [String],
    openingDays: [String],
    images: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("spots", spotSchema);
