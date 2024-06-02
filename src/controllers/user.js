const UserModel = require("../models/user");

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
};

module.exports = controller;
