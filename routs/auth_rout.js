const express = require("express")
const validator = require("../utils/validators/user_controller_validator")


const {
    loginUser, registerUser
} = require("../controllers/auth_controllers")


const router = express.Router();


router.route("/register").post(validator.registerUser, registerUser)
router.route("/login").post(validator.loginUser, loginUser)
module.exports = router;
