const express = require("express")
const mountRoutes = require("./rout");
const dbConnection = require("./config/database_config");


const app = express()

app.get("/", (req, res, next) => res.send("HI"))
// Mount Routes
dbConnection().then(_ => console.log("Connecting to database success ....."))

mountRoutes(app);


app.listen(8000, () => {
    console.log(`App running : http://localhost:8000/`);
})
