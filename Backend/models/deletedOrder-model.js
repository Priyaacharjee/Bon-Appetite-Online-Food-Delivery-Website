// *order-model.js*
const mongoose = require("mongoose");

const deletedOrderSchema = mongoose.Schema({
    deletedOrderId:[{ type: mongoose.Schema.Types.ObjectId, ref: "order" }]
});

module.exports = mongoose.model("deletedOder", deletedOrderSchema);
