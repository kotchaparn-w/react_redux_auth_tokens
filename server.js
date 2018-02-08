const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");

// Database
mongoose.connect('mongodb://localhost/auth');

// App Setup
app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*" }));
router(app);

// Sever Setup
const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port);

console.log("Server listening on port : ", port)