const mongoose = require("mongoose");

const restaurentSchema = mongoose.Schema({
  image: String,
  name: String,
  address: String,
  food: [{ type: mongoose.Schema.Types.ObjectId, ref: 'food' }],
});

module.exports = mongoose.model("restaurent", restaurentSchema);
