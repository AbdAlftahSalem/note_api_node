const express = require("express")
const validator = require("../utils/validators/user_controller_validator")
const AuthController = require("../controllers/auth_controllers")

const {
    loginUser, registerUser, getMe
} = require("../controllers/auth_controllers")


const router = express.Router();


router.route("/register").post(validator.registerUser, registerUser)
router.route("/login").post(validator.loginUser, loginUser)
router.route("/get-me").get(AuthController.protectRout, getMe)
module.exports = router;
