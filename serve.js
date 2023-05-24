const express = require("express")
// const mountRoutes = require("./routs");
const dbConnection = require("./config/database_config");
const env = require("dotenv");
env.config({path: "./config.env"})

const app = express()

// Mount Routes
dbConnection().then(_ => console.log("Connecting to database success ....."))

// mountRoutes(app);


app.listen(process.env.PORT, () => {
    console.log(`App running : http://localhost:8000/`);
})
