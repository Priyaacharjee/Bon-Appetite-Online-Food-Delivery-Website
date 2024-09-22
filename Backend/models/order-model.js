// *order-model.js*
const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  foodId: [{ type: mongoose.Schema.Types.ObjectId, ref: "food" }],
  time: { type: String, require: true },
  totalAmount: Number,
  orderAddress: String,
  deliverStatus: { type: String, default: "Pending" },
  isDeleted: { type: Boolean, default: false },
  OTP: Number,
  deliveryBoy: { type: mongoose.Schema.Types.ObjectId, ref: "deliveryBoy" },
  paymentMode: { type: String, default: "Offline" },
  paymentStatus: { type: String, default: "Pending" },
  expectedDeliveryTime:{type:String,default:'45 min'}
});

module.exports = mongoose.model("order", orderSchema);
