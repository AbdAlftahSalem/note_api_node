const {check} = require('express-validator');

const validator = require("../../middlewere/validator")


exports.registerUser = [
    check("name").notEmpty().withMessage("Enter name").isLength({min: 3})
        .withMessage("Too Short name")
        .isLength({max: 14})
        .withMessage("Too long name"),


    check("userName").notEmpty().withMessage("Enter username")
        .isLength({min: 3})
        .withMessage("Too Short username")
        .isLength({max: 18}),

    check("email").notEmpty().isEmail().withMessage("Enter valid email")
        .isLength({min: 3})
        .withMessage("Too Short email")
        .isLength({max: 18})
        .withMessage("Too long email"),

    check("password")
        .notEmpty()
        .isLength({min: 6})
        .withMessage("password at lease have 6 char"),

    check("passwordConfirm")
        .notEmpty().withMessage("password confirm required")
        .isLength({min: 6})
        .withMessage("password at lease have 6 char"),

    check("phoneNumber").notEmpty().withMessage("Enter valid phone number"), check("apiKey").notEmpty().withMessage("Enter valid api key"), check("apiSecretKey").notEmpty().withMessage("Enter valid api secret key"),

    validator,]

exports.loginUser = [

    check("email").notEmpty().isEmail().withMessage("Enter valid email")
        .isLength({min: 3})
        .withMessage("Too Short email")
        .isLength({max: 18})
        .withMessage("Too long email"),

    check("password")
        .notEmpty()
        .isLength({min: 6})
        .withMessage("password at lease have 6 char"),
    validator,
]

exports.resetPassword = [
    check("currentPassword").notEmpty().withMessage("Enter password"),
    check("newPassword")
        .notEmpty()
        .isLength({min: 6})
        .withMessage("password at lease have 6 char"),

    validator,
]

exports.getAndDeleteOneUserValidator = [
    check("id").notEmpty().isMongoId().withMessage("Please enter valid id"),

    validator,
]