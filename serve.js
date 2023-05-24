const express = require("express")
const mountRoutes = require("./routs");
const dbConnection = require("./config/database_config");
const env = require("dotenv");
env.config({path: "./config.env"})
const bodyParser = require("body-parser");
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const {ApiError} = require("./utils/error_handeler");
const globalError = require("./middlewere/error_handle");

const app = express()
app.use(bodyParser.json());

// Mount Routes
dbConnection().then(_ => console.log("Connecting to database success ....."))

mountRoutes(app);

app.use(cors());
app.options('*', cors());

// compress all responses
app.use(compression());


// Middlewares
app.use(express.json({limit: '20kb'}));


// Limit each IP to 100 requests per `window` (here, per 15 minutes)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message:
        'Too many accounts created from this IP, please try again after an hour',
});

app.use('/api', limiter);

app.all('*', (req, res, next) => {
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

app.use(globalError);


app.listen(process.env.PORT, () => {
    console.log(`App running : http://localhost:8000/`);
})
