const UserModel = require("../models/user");
const HotelModel = require("../models/hotel");
const RoomModel = require("../models/room");
const SpotModel = require("../models/spot");
const TicketModel = require("../models/ticket");
const controller = {
  signUp: async (req, res) => {
    const { phone, country } = req.body;
    const ifExists = await UserModel.findOne({ phoneNumber: phone });
    if (ifExists) {
      return res.json({
        data: ifExists,
        message: "User already exists",
      });
    }
    const user = new UserModel({
      phoneNumber: phone,
      country,
    });
    user.save().then((data) => {
      res.json({
        data,
        message: "User created successfully",
      });
    });
  },

  login: async (req, res) => {
    const { phone, password } = req.body;
    const user = await UserModel.findOne({ phoneNumber: phone });
    if (user) {
      if (password.length > 0 && user.password !== password) {
        return res.json({
          data: null,
          message: "Password does not match",
        });
      } else {
        return res.json({
          data: user,
          message: "Login successful",
        });
      }
    } else {
      return res.json({
        data: null,
        message: "User does not exist",
      });
    }
  },
  checkUser: async (req, res) => {
    const { phoneNumber } = req.body;
    const user = await UserModel.findOne({ phoneNumber });
    if (user) {
      return res.json({
        data: user,
        message: "User exists",
      });
    } else {
      return res.json({
        data: null,
        message: "User does not exist",
      });
    }
  },
  update: async (req, res) => {
    const { _id } = req.params;
    const { type, value } = req.body;
    if (type === "phoneNumber") {
      const ifExists = await UserModel.findOne({ phoneNumber: value });
      if (ifExists) {
        return res.json({
          data: ifExists,
          message: "Phone number already exists",
        });
      }
    }
    UserModel.findOneAndUpdate({ _id }, { [type]: value }, { new: true }).then(
      (data) => {
        res.json({
          data,
          message: "User updated successfully",
        });
      }
    );
  },
  allHotels: async (req, res) => {
    const hotels = await HotelModel.find();
    for (let i = 0; i < hotels.length; i++) {
      const rooms = await RoomModel.find(
        { hotel: hotels[i]._id },
        { price: 1, wasPrice: 1, roomAvailable: 1 }
      );
      let hotelObj = hotels[i].toObject();
      hotelObj.minimumPrice = Math.min.apply(
        Math,
        rooms.map((room) => room.price)
      );
      hotelObj.minimumWasPrice = Math.min.apply(
        Math,
        rooms.map((room) => room.wasPrice)
      );
      hotelObj.minimumRooms = Math.min.apply(
        Math,
        rooms.map((room) => room.roomAvailable)
      );
      hotels[i] = hotelObj;
    }
    res.json({
      data: hotels,
      message: "All hotels",
    });
  },
  getRooms: async (req, res) => {
    const { hotelId } = req.params;
    const rooms = await RoomModel.find({ hotel: hotelId });
    res.json({
      data: rooms,
      message: "All rooms",
    });
  },
  allSpots: async (req, res) => {
    const spots = await SpotModel.find();
    for (let i = 0; i < spots.length; i++) {
      const tickets = await TicketModel.find({ spot: spots[i]._id });
      let spotObj = spots[i].toObject();
      spotObj.minimumPrice = Math.min.apply(
        Math,
        tickets.map((ticket) => ticket.price)
      );
      spotObj.minimumWasPrice = Math.min.apply(
        Math,
        tickets.map((ticket) => ticket.wasPrice)
      );
      spotObj.minimumTickets = Math.min.apply(
        Math,
        tickets.map((ticket) => ticket.roomAvailable)
      );
      spots[i] = spotObj;
    }
    res.json({
      data: spots,
      message: "All spots",
    });
  },
  getTickets: async (req, res) => {
    const { spotId } = req.params;
    const tickets = await TicketModel.find({ spot: spotId });
    res.json({
      data: tickets,
      message: "All tickets",
    });
  },
};

module.exports = controller;
