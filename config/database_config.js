const mongoose = require("mongoose");

const env = require("dotenv");
env.config({path: "./config.env"})
const url_connect = process.env.DATABASE_URL

dbConnection = async () => {
    await mongoose.connect(url_connect, {useNewUrlParser: true}).then((_) => {

    }).catch((e) => {
        process.exit(1)
    });
}

module.exports = dbConnection;