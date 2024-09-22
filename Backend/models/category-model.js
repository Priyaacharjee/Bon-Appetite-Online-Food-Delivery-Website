// *category-model.js*
const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  image: String,
  name: String,
});

module.exports = mongoose.model("category", categorySchema);
