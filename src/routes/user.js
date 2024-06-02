const { Router } = require("express");
const userController = require("../controllers/user");
const router = Router();

router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.patch("/update/:_id", userController.update);
module.exports = router;
