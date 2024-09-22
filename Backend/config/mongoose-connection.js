const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");
require('dotenv').config();

const mongoUri = process.env.MONGODB_URI;

mongoose
  .connect(`${mongoUri}`,{ dbName: "food_delivery" })
  .then(() => {
    dbgr("Connected");
  })
  .catch((err) => {
    dbgr(err.message);
  });

module.exports = mongoose.connection;