const curdOperation = require("../utils/crud_operations")
const Note = require("../models/note_model")

exports.getAllNote = async (req, res, next) => {
    const notes = await curdOperation.getAllData(req, res, next, Note, {"user": req.body.user})
    return res.status(200).json(notes)
}

exports.addNote = async (req, res) => {
    try {
        const finishDate = new Date(req.body.finishDate)
        if (Date.now() > finishDate) {
            return res.status(400).json({"message": "The date send is before now date"})
        }
        const note = await Note.create({
            "title": req.body.title,
            "finishDate": finishDate,
            "user": req.body.user,
            "description": req.body.description,
        })
        return res.status(200).json(note)
    } catch (e) {
        return res.status(400).json(e)
    }

}
