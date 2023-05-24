const User = require("../models/user_model")
const {ApiError} = require("../utils/error_handeler");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


exports.registerUser = async (req, res, next) => {

    const user = await User.create({
        "user_name": req.body.user_name,
        "email": req.body.email,
        "password": req.body.password,
        "role": req.body.role,
    })

    const token = generateToken(user._id)
    res.status(200).json({date: user, token})
}

exports.loginUser = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({email: req.body.email})
    if (user || bcrypt.compare(req.body.password, user["password"])) {
        return next(ApiError("Invalid email or password"))
    }
    const token = generateToken(user["_id"])
    res.status(200).json({data: user, token})
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
    if (req.headers["authrization"] && req.headers["authrization"].startWith("Bearer")) {

        token = req.headers["authrization"].split(" ")[1]
    }

    if (!token) {
        next(ApiError("You are not login", 401))
    }

    //  verify token if valid expired token
    const decodeToken = jwt.verify(token, "ABDABDABDABDABDABDABDABDABDABD")

    //  check if user in Database
    const currentUser = await User.findById(decodeToken.userId)

    if (!currentUser) {
        return next(ApiError("No user found", 401));
    }


    //  check if password has change
    if (currentUser.password_change_at) {
        const passwordChangeTimeStamp = parseInt(currentUser.password_change_at.getTime() / 1000, 10);

        if (passwordChangeTimeStamp > decodeToken.iat) {
            return next(ApiError("Token Invalido", 401));
        }
    }

    req.user = currentUser
    next();


}

const generateToken = (userId) => {
    return jwt.sign({userId: userId}, "ABDABDABDABDABDABDABDABDABDABD", {
        expiresIn: "90d"
    })
}