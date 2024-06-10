const adminModel = require("../models/adminUser");
const fs = require("fs");
const path = require("path");
const hotelModel = require("../models/hotel");
const roomModel = require("../models/room");
const spotModel = require("../models/spot");
const ticketModel = require("../models/ticket");
const adminController = {
  signIn: async (req, res) => {
    try {
      const { name, password } = req.body;
      const admin = await adminModel.findOne({
        name,
        password,
      });
      if (admin) {
        return res.status(200).json({
          message: "Admin SignIn Successfully",
        });
      }
      return res.status(200).json({
        message: "Invalid Credentials",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  addHotel: async (req, res) => {
    try {
      const {
        name,
        status,
        type,
        location,
        description,
        amenities,
        checkIn,
        checkOut,
        openingDays,
        position,
      } = req.body;

      const imagePaths = req.files.map((file) => path.basename(file.path));

      const newHotel = new hotelModel({
        name,
        status,
        type,
        location,
        description,
        amenities: JSON.parse(amenities),
        checkIn: JSON.parse(checkIn),
        checkOut: JSON.parse(checkOut),
        openingDays: JSON.parse(openingDays),
        position: {
          lat: JSON.parse(position)[0],
          lng: JSON.parse(position)[1],
        },
        images: imagePaths,
      });

      await newHotel.save();

      return res.status(200).json({
        message: "Hotel Added Successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  addRoom: async (req, res) => {
    try {
      const {
        hotel,
        roomName,
        guestAllowed,
        amenities,
        price,
        wasPrice,
        roomAvailable,
        cancellationPolicy,
      } = req.body;

      const imagePaths = req.files.map((file) => path.basename(file.path));

      const newRoom = new roomModel({
        hotel,
        roomName,
        guestAllowed,
        amenities: JSON.parse(amenities),
        price,
        wasPrice,
        roomAvailable,
        cancellationPolicy,
        images: imagePaths,
      });

      await newRoom.save();

      return res.status(200).json({
        message: "Room Added Successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  addSpot: async (req, res) => {
    try {
      const {
        name,
        description,
        location,
        position,
        amenities,
        entrancePolicies,
        closingPolicies,
        openingDays,
      } = req.body;

      const imagePaths = req.files.map((file) => path.basename(file.path));

      const newSpot = new spotModel({
        name,
        description,
        location,
        position: {
          lat: JSON.parse(position)[0],
          lng: JSON.parse(position)[1],
        },
        amenities: JSON.parse(amenities),
        entrancePolicies: JSON.parse(entrancePolicies),
        closingPolicies: JSON.parse(closingPolicies),
        openingDays: JSON.parse(openingDays),
        images: imagePaths,
      });

      await newSpot.save();

      return res.status(200).json({
        message: "Spot Added Successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  addTicket: async (req, res) => {
    try {
      const {
        name,
        guestAllowed,
        amenities,
        cancellationPolicy,
        price,
        wasPrice,
        roomAvailable,
      } = req.body;

      const imagePaths = req.files.map((file) => path.basename(file.path));

      const newTicket = new ticketModel({
        name,
        guestAllowed,
        amenities: JSON.parse(amenities),
        cancellationPolicy,
        price,
        wasPrice,
        roomAvailable,
        images: imagePaths,
      });

      await newTicket.save();

      return res.status(200).json({
        message: "Ticket Added Successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  getHotelNames: async (req, res) => {
    try {
      const hotels = await hotelModel.find({}, "name");
      return res.status(200).json({
        hotels,
        message: "Hotel Names Fetched Successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  getSpotNames: async (req, res) => {
    try {
      const spots = await spotModel.find({}, "name");
      return res.status(200).json({
        spots,
        message: "Spot Names Fetched Successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
};

module.exports = adminController;
