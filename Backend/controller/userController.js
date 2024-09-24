// userController.js
const userModel = require("../models/user-model");
const orderModal = require("../models/order-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const dbgr = require("debug")("development:usercheck");
const fs = require("fs");
const orderModel = require("../models/order-model");
const deliveryBoyModel = require("../models/deliveryBoy-model");
const adminModel = require("../models/admin-model");
const cloudinary = require("../utils/cloudinary");
require("dotenv").config();

// Check isLoggedIn
module.exports.checkIsLoggedIn = async (req, res) => {
  try {
    if (req.user) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (err) {
    res.send(err.send);
  }
};

// Register User
module.exports.registerUser = async (req, res) => {
  try {
    let { email, password, username, contact } = req.body;

    if (email && password && username && contact) {
      if (await userModel.findOne({ email })) {
        return res.send("User already exists. Please Login");
      }

      bcrypt.genSalt(12, async (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) {
            return res.send(err.message);
          }
          let user = await userModel.create({
            email,
            password: hash,
            username,
            contact,
          });

          let token = generateToken(user);
          res.cookie("token", token, {
            httpOnly: true, // Cookie is only accessible by the web server
            secure: true, // Set to true if using HTTPS
            sameSite: "None", // Controls whether cookies are sent with cross-site requests
            path: "/", // Cookie is available across the entire domain
          });

          res.send("User created successfully");
        });
      });
    } else {
      res.send("Something is missing");
    }
  } catch (err) {
    res.send(err.message);
  }
};

// Login
module.exports.loginUser = async (req, res) => {
  try {
    let token = req.cookies.token;
    if (token) {
      res.send("You are already logged in.");
    } else {
      let { email, password } = req.body;

      if (email && password) {
        let user = await userModel.findOne({ email });

        if (user) {
          bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
              let token = generateToken(user);
              res.cookie("token", token, {
                httpOnly: true, // Cookie is only accessible by the web server
                secure: true, // Set to true if using HTTPS
                sameSite: "None", // Controls whether cookies are sent with cross-site requests
                path: "/", // Cookie is available across the entire domain
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
    return res.send(err.message);
  }
};

// Logout
module.exports.logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true, // Cookie is only accessible by the web server
      secure: true, // Set to true if using HTTPS
      sameSite: "None", // Controls whether cookies are sent with cross-site requests
      path: "/", // Cookie is available across the entire domain
    });
    res.send("Logout successfully");
  } catch (err) {
    res.send("Something went wrong");
  }
};

// Get Single User
module.exports.getUser = async (req, res) => {
  try {
    let user = req.user;
    await user.populate({
      path: "cart",
    });

    await user.populate({
      path: "orders cancledOrders deliveredOrders",
      populate: { path: "foodId deliveryBoy" },
    });
    res.send(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Update User Details
module.exports.updateUser = async (req, res) => {
  try {
    let { username, contact, email, address } = req.body;
    let user = req.user;
    await userModel.updateOne(
      { email: user.email },
      { $set: { username, contact, email, address } }
    );
    res.send("Updated successfully");
  } catch (err) {
    res.send("Something went wrong");
  }
};

// Upload Profile Picture
module.exports.uploadProfilePicture = async (req, res) => {
  const image = req.body.image;
  if (!image) {
    return res.status(400).send("No file uploaded.");
  }
  try {
    const oldImage = req.user.image.public_id;

    const result = await cloudinary.uploader.upload(image, {
      folder: "userProfilePictures",
      width: 300,
      crop: "scale",
    });
    await userModel.updateOne(
      { email: req.user.email },
      {
        $set: {
          image: {
            public_id: result.public_id,
            url: result.secure_url,
          },
        },
      }
    );
    if (oldImage) {
      await cloudinary.uploader.destroy(req.user.image.public_id);
    }

    res.send("File uploaded successfully.");
  } catch (err) {
    res.send(err.message);
  }
};

// Add to cart
module.exports.addToCart = async (req, res) => {
  try {
    let user = req.user;
    let { foodId } = req.body;
    if (user.cart.includes(foodId)) {
      res.send("Item already present in the cart");
    } else {
      await userModel.findOneAndUpdate(
        { _id: user.id },
        { $push: { cart: foodId } }
      );
      res.send("Food item added to cart");
    }
  } catch (err) {
    res.send("Something went wrong");
  }
};

// Delete item from the cart
module.exports.deleteItemFromCart = async (req, res) => {
  try {
    let user = req.user;
    let { foodId } = req.body;

    await userModel.findOneAndUpdate(
      { _id: user.id },
      { $pull: { cart: foodId } }
    );
    res.send("Food item removed from cart");
  } catch (err) {
    res.send("Something went wrong");
  }
};

// Add to cart increase quantity
module.exports.addToCartIncreaseQuantity = async (req, res) => {
  try {
    let user = req.user;
    let { foodId } = req.body;
    await userModel.findOneAndUpdate(
      { _id: user.id },
      { $push: { cart: foodId } }
    );
    res.send("Food item added to cart");
  } catch (err) {
    res.send("Something went wrong");
  }
};

// Delete cart item decrease quantity
module.exports.deleteCartItemDecreaseQuantity = async (req, res) => {
  try {
    let user = req.user;
    let { foodId } = req.body;

    const index = user.cart.indexOf(foodId);

    user.cart.splice(index, 1);
    await user.save();

    res.send("Food item removed from cart");
  } catch (err) {
    res.send("Something went wrong");
  }
};

// Create order
module.exports.createOrder = async (req, res) => {
  try {
    let user = req.user;
    let { userCart, time, totalAmount } = req.body;

    const foodIds = userCart.map((food) => food._id);

    const OTP = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

    let deliveryBoys = [];
    deliveryBoyModel.find({}).then(async (response) => {
      response = response.filter((item) => {
        let serviceAddress = item.serviceAddress.split(", ");
        return serviceAddress.some((e) => user.address.includes(e));
      });
      deliveryBoys = response;
      if (deliveryBoys.length === 0) {
        res.send("Sorry! Our services are not available in your area.");
      } else {
        const index = Math.floor(Math.random() * deliveryBoys.length);
        const deliveryBoyId = deliveryBoys[index]._id;

        let order = await orderModal.create({
          userId: user._id,
          foodId: foodIds,
          time,
          totalAmount,
          orderAddress: user.address,
          phone: user.contact,
          OTP,
          deliveryBoy: deliveryBoyId,
        });

        await adminModel.updateMany(
          {},
          { $push: { currentOrders: order._id } }
        );

        await deliveryBoyModel.findOneAndUpdate(
          { _id: deliveryBoyId },
          { $push: { deliveryOrder: order._id } }
        );

        await userModel.findOneAndUpdate(
          { _id: user._id },
          { $push: { orders: order._id } }
        );
        res.send("Your order is placed successfully");
      }
    });
  } catch (err) {
    res.send(err.message);
  }
};

// Cancle order
module.exports.cancleOrder = async (req, res) => {
  try {
    let orderId = req.query.id;
    let user = req.user;
    let order = await orderModel.findOne({ _id: orderId });

    await userModel.updateOne(
      { _id: user._id },
      { $pull: { orders: orderId } }
    );

    await userModel.updateOne(
      { _id: user._id },
      { $push: { cancledOrders: orderId } }
    );

    await orderModel.findOneAndUpdate(
      { _id: orderId },
      { $set: { isDeleted: true } }
    );

    await deliveryBoyModel.findOneAndUpdate(
      { _id: order.deliveryBoy },
      { $pull: { deliveryOrder: orderId } }
    );
    res.send("Order deleted");
  } catch (err) {
    res.send(err.message);
  }
};