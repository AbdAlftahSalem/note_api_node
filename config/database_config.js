const mongoose = require("mongoose");

dbConnection = async () => {
    const url = 'mongodb+srv://abd:ljunB4ICQb6jV6iQ@cluster0.lhzqv.mongodb.net/note_api';
    await mongoose.connect(url, {useNewUrlParser: true}).then((_) => {

    }).catch((e) => {
        console.log("ERROR")
        process.exit(1)
    });
}

module.exports = dbConnection;