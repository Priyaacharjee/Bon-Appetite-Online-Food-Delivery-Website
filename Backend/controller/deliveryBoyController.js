const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const deliveryBoyModel = require("../models/deliveryBoy-model");
const orderModel = require("../models/order-model");
const userModel = require("../models/user-model");
const deliveredOrderModel = require("../models/deliveredOrder-model");

// Login
module.exports.loginDeliveryBoy = async (req, res) => {
  try {
    let token = req.cookies.token;
    if (token) {
      res.send("You are already logged in.");
    } else {
      let { email, password } = req.body;

      if (email && password) {
        let deliveryBoy = await deliveryBoyModel.findOne({ email });

        if (deliveryBoy) {
          bcrypt.compare(password, deliveryBoy.password, (err, result) => {
            if (result) {
              let token = generateToken(deliveryBoy);
              res.cookie("token", token, {
                httpOnly: true, // Cookie is only accessible by the web server
                secure: true,  // Set to true if using HTTPS
                sameSite: 'None', // Controls whether cookies are sent with cross-site requests
                path: '/',       // Cookie is available across the entire domain
              });
              res.send("Login successfully");
            } else {
              res.send("Wrong Password");
            }
          });
        } else {
          return res.send("Email or Password is wrong");
        }
      } else {
        return res.send("Something is missing");
      }
    }
  } catch (err) {
    return res.status(501).send("Something went wrong");
  }
};

// Fetch delivery boy
module.exports.fetchSingleDeliveryBoy = async (req, res) => {
  try {
    let deliveryBoy = req.deliveryBoy;
    await deliveryBoy.populate({
      path: "deliveryOrder",
      populate: { path: "foodId userId" },
    });
    res.send(deliveryBoy);
  } catch (err) {
    res.send(err.message);
  }
};

// Delivery successfull
module.exports.deliverySuccessfull = async (req, res) => {
  try {
    let deliveryBoy = req.deliveryBoy;
    let { otp, orderId } = req.body;

    let order = await orderModel.findOne({ _id: orderId });
    await order.populate({ path: "userId" });

    if (order.OTP == otp) {
      await deliveryBoyModel.findOneAndUpdate(
        { _id: deliveryBoy._id },
        { $pull: { deliveryOrder: orderId } }
      );

      await userModel.findOneAndUpdate(
        { _id: order.userId._id },
        { $pull: { orders: orderId } }
      );

      await userModel.findOneAndUpdate(
        { _id: order.userId._id },
        { $push: { deliveredOrders: orderId } }
      );

      await orderModel.findOneAndUpdate(
        { _id: orderId },
        { $set: { paymentStatus: "Paid", deliverStatus: "Delivered" } }
      );

      await deliveredOrderModel.updateMany({
        $push: { deliveredOrderId: orderId },
      });

      return res.send("Delivery successfully");
    }
    res.send("OTP is not correct");
  } catch (err) {
    res.send(err.message);
  }
};