const mongoose = require("mongoose");

const restaurentSchema = mongoose.Schema({
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
  name: String,
  address: String,
  food: [{ type: mongoose.Schema.Types.ObjectId, ref: "food" }],
});

module.exports = mongoose.model("restaurent", restaurentSchema);