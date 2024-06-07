const { Router } = require("express");
const adminController = require("../controllers/admin");
const router = Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set up storage with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../../src/uploads");
    fs.exists(dir, (exist) => {
      if (!exist) {
        return fs.mkdir(dir, (error) => cb(error, dir));
      }
      return cb(null, dir);
    });
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

const upload = multer({ storage: storage });
router.post("/signin", adminController.signIn);
router.post("/add_hotel", upload.array("images"), adminController.addHotel);
router.post("/add_room", upload.array("images"), adminController.addRoom);
router.get("/get_hotel_names", adminController.getHotelNames);
module.exports = router;
