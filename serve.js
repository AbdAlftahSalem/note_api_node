const express = require("express")
const mountRoutes = require("./routs");
const dbConnection = require("./config/database_config");


const app = express()

// Mount Routes
dbConnection().then(_ => console.log("Connecting to database success ....."))

mountRoutes(app);


app.listen(8000, () => {
    console.log(`App running : http://localhost:8000/`);
})
