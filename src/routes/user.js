const { Router } = require("express");
const userController = require("../controllers/user");
const router = Router();

router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.patch("/update/:_id", userController.update);
router.get("/all_hotels", userController.allHotels);
router.get("/all_spots", userController.allSpots);
router.get("/get_rooms/:hotelId", userController.getRooms);
router.get("/get_tickets/:spotId", userController.getTickets);
module.exports = router;
