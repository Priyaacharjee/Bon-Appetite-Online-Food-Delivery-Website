const mongoose = require("mongoose");

const companyDetails = mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  fbLink:String,
  instaLink:String
});

module.exports = mongoose.model("companyDetail", companyDetails);
