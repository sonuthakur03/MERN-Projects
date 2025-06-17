const mongoose = require("mongoose");

async function handleConnectionDB(url) {
	mongoose.connect(url);
}

module.exports = handleConnectionDB;
