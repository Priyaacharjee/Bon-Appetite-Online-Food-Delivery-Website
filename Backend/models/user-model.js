// *user-model.js*
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "food" }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "order" }],
  deliveredOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: "order" }],
  cancledOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: "order" }],
  contact: Number,
  address: String,
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("user", userSchema);
