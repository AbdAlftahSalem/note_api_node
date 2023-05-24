const {check} = require('express-validator');

const validator = require("../../middlewere/validator")


exports.addNote = [


    check("title")
        .isLength({min: 5})
        .withMessage("Too Short title")
        .isLength({max: 100}).withMessage("Too long title"),

    // check("user").isMongoId().withMessage("Please enter valid id"),

    check("finishDate")
        .notEmpty()
        .withMessage("Enter valid finish date"),


    validator,]
