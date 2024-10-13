const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    trim: true,
  },
  email: String,
  password: String,
  image: {
    public_id: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
  },
  products: {
    type: Array,
    default: [],
  },
  currentOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: "order" }],
  gstin: String,
});

module.exports = mongoose.model("admin", adminSchema);