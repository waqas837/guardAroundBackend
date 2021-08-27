const express = require("express");
const router = express.Router();
const userController = require("../Controller/UserController");
 
router.route("/SignUp").post(userController.SignUp);
router.route("/Login").post(userController.Login);

module.exports = router;
  

