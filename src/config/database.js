const config = require("./index")
const mongoose = require("mongoose")


mongoose
    .connect(config.databaseURL)
    .then(() => console.log("Database is connected successfully"))
    .catch(() => console.error("Database connect is failed"))