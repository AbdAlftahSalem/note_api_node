const User = require("../models/user_model")
const {ApiError} = require("../utils/error_handeler");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const env = require("dotenv");
env.config({path: "./config.env"})

exports.registerUser = async (req, res, next) => {

    const user = await User.create({
        "user_name": req.body.user_name,
        "email": req.body.email,
        "password": req.body.password,
        "role": req.body.role,
    })

    const token = generateToken(user["_id"])
    res.status(200).json({date: user, token})
}

exports.loginUser = async (req, res, next) => {
    const user = await User.findOne({email: req.body.email})
    if (!user) {
        return res.status(404).json({"status": false, "message": " Email or password incorrect"})
    } else {
        console.log(await bcrypt.compare(req.body.password, user["password"]))
        if (await bcrypt.compare(req.body.password, user["password"])) {
            const token = generateToken(user["_id"])
            return res.status(200).json({data: user, token})
        }
    }
    return res.status(404).json({"status": false, "message": " Email or password incorrect"})

}


exports.changeUserPassword = async (req, res, next) => {
    const {id} = req.params.id

    return await User.updateOne(id, {
        "password": await bcrypt.hash(req.body.password, 12), "password_change_at": Date.now(),
    }, {returnOriginal: false}).then((v) => {
        res.status(200).json({"status": true, "itemUpdatedId": id, "data": v})
    }).catch((e) => next(new ApiError(e, 400)))
}


exports.protectRout = async (req, res, next) => {
    //  get token form headers

    let token;
    if (req.headers["authorization"] && req.headers["authorization"]) {

        token = req.headers["authorization"].split(" ")[1]
    }

    if (!token) {
        return res.status(401).json({"message": "You are not login", "status": false})
    }

    //  verify token if valid expired token
    const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET)

    //  check if user in Database
    console.log(decodeToken)
    const currentUser = await User.findById(decodeToken["user_id"])

    if (!currentUser) {
        return res.status(401).json({"message": "You are not login", "status": false})
    }


    req.body.user = currentUser
    next();


}

const generateToken = (userId) => {
    return jwt.sign(
        {user_id: userId},
        process.env.TOKEN_SECRET,
        {
            expiresIn: "2h",
        }
    )
}