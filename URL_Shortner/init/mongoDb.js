const mongoose = require("mongoose");

const handleConnectionDB = async (url) => {
	return mongoose.connect(url);
};

module.exports = handleConnectionDB;
