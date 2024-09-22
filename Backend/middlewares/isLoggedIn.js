const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const adminModel = require("../models/admin-model");
const deliveryBoyModel = require("../models/deliveryBoy-model");

module.exports = async (req, res, next) => {
  try {
    let token = req.cookies.token;
    
    if (token) {
      let decode = jwt.verify(token, process.env.JWT_KEY);
      let user = await userModel
        .findOne({ email: decode.email })
        .select("-password");
      if (user) {
        req.user = user;
        next();
      } else{
        let admin = await adminModel
          .findOne({ email: decode.email })
          .select("-password");
        if (admin) {
          req.admin = admin;
          next();
        }else{
          let deliveryBoy = await deliveryBoyModel
          .findOne({ email: decode.email })
          .select("-password");
        if (deliveryBoy) {
          req.deliveryBoy = deliveryBoy;
          next();
        }
        }
      }
    } else {
      res.send("You need to login first");
    }
  } catch (err) {
    console.log(err.message);
    res.send("Something went wrong");
  }
};
