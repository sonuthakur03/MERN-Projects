const express = require("express");
const path = require("path");
const handleConnectionDB = require("./connection");
const bodyParser = require("body-parser");
const todoRouter = require("./routes/todo");
const dotenv = require("dotenv");

// init app
const app = express();

// env variable
dotenv.config();

// view engine
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

// database connection
handleConnectionDB(process.env.CONNECTION_URL)
	.then(() => console.log("Database Connected"))
	.catch((err) => console.log("Connection error", err.message));

// routes
app.use("/", todoRouter);

module.exports = app;
