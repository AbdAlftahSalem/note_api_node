const curdOperation = require("../utils/crud_operations")
const Note = require("../models/note_model")

exports.getAllNote = async (req, res, next) => {
    const products = await curdOperation.getOneElement(req, res, next, Note)
    res.stats(200).json(products)
}

exports.addNote = async (req, res) => {
    try {
        const note = await Note.create({
            "title": req.body.title,
            "finishDate": req.body.finishDate,
            "user": req.body.user,
            "description": req.body.description,
        })
        return res.status(200).json(note)
    } catch (e) {
        return res.status(400).json(e)
    }

}
