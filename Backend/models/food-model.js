// *food-model.js*
const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
  image: String,
  name: String,
  price: Number,
  category: String,
  restaurent: String,
  quantity: String,
  setAsTodaysOffer: { type: Boolean, default: false },
});

module.exports = mongoose.model("food", foodSchema);
