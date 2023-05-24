const mongoose = require("mongoose")
const {isMongoId} = require("validator");

const NoteSchema = new mongoose.Schema({

    title: {
        type: String,
        minLength: [5, "The title is too short"],
        maxLength: [100, "The title is too long"],
        required: [true, "The title is required"]
    },

    description: {
        type: String,
        minLength: [5, "The description is too short"],
        maxLength: [2000, "The description is too long"],
        default: null,
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'The user id is required'],
    },

    finishDate: {
        type: Date,
        required: [true, 'The finish date is required'],
    },

    isFinished: {
        type: Boolean,
        default: false,
    },


}, {timestamps: true})

module.exports = mongoose.model("Note", NoteSchema)