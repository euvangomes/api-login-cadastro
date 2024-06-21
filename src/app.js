const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const rateLimiter = require('./middlewares/taxa-limite');
require("dotenv").config();
//api routers
const routers = require("./router");
const app = express();
let corsOptions = {
    origin: '*',
    optionsSucessStatus: 200
};
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors(corsOptions));
app.use(rateLimiter);
//Change * for allowed url
app.options('/login', function (req, res) {
    const allowedOrigins = '*';
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Accept");
    res.end();
});
app.use(express.json());

//'api' set router name like api
app.use("/api", routers);


module.exports = app;