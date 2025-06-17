const app = require("./app");

const PORT = process.env.PORT;

// listen server
app.listen(PORT, () => console.log("Server is running on port 8000"));
