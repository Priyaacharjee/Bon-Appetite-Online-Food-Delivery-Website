// *category-model.js*
const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
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
});

module.exports = mongoose.model("category", categorySchema);