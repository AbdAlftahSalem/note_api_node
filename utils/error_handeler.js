class ApiError extends Error {

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith("4") ? "Fail" : "Error"
    }

}

const addToDataBaseWithImage = (req, res, next, functionValid) => {
    if (req.file) {
        req.body.image = req.file.path
        functionValid(req, res, next)
    } else {
        console.log("HERE ERROR")
        res.send({"status": false, "message": "no image selected"})
    }
}

exports.ApiError = ApiError;
exports.addToDataBaseWithImage = addToDataBaseWithImage;