// *order-model.js*
const mongoose = require("mongoose");

const deliveredOrderSchema = mongoose.Schema({
    deliveredOrderId:[{ type: mongoose.Schema.Types.ObjectId, ref: "order" }]
});

module.exports = mongoose.model("deliveredOder", deliveredOrderSchema);
