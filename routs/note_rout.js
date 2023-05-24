const express = require("express")

const AuthController = require("../controllers/auth_controllers")
const NoteValidator = require("../utils/validators/note_controller_validator")
const {
    getAllNote, addNote
} = require("../controllers/note_controller")


const router = express.Router();


router.route("/get-all-note").get(AuthController.protectRout, getAllNote)
router.route("/add-note").post(AuthController.protectRout, NoteValidator.addNote, addNote)
module.exports = router;
