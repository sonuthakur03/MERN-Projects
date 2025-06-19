const express = require("express");
const handleConnectionDB = require("./init/mongoDb");
const urlRouter = require("./routes/urls");

const app = express();
const PORT = 8000;
const mongoDbUrl = "mongodb://localhost:27017/url-shortner";

// handling connection to DB
handleConnectionDB(mongoDbUrl)
	.then(() => console.log("Database connected"))
	.catch((err) => console.log(err.message));

// middleware
app.use(express.json()); // to parse application/json
app.use(express.urlencoded({ extended: true })); // to parse application/x-www-form-urlencoded

// route
app.use("/url", urlRouter);

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
