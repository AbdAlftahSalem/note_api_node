const curdOperation = require("../utils/crud_operations")
const Note = require("../models/note_model")

exports.getAllNote = async (req, res, next) => {
    const products = await curdOperation.getOneElement(req, res, next, Note)
    res.stats(200).json(products)
}

exports.addNote = async (req, res, next) => {
    const products = await curdOperation.addElement(req, res, next, Note)
    return res.status(200).json(products)
}
