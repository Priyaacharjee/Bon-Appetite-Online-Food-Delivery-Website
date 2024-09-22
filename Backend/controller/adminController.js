// *adminController.js*
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const dbgr = require("debug")("development:usercheck");
const adminModel = require("../models/admin-model");
const companyDetailModel = require("../models/companyDetails-model");
const deliveryBoyModel = require("../models/deliveryBoy-model");
const userModel = require("../models/user-model");
const restaurentModel = require("../models/restaurent-model");
const categoryModel = require("../models/category-model");
const orderModel = require("../models/order-model");
const foodModel = require("../models/food-model");
const fs = require("fs");

// Create Admin
module.exports.createAdmin = async (req, res) => {
  let admins = await adminModel.find();
  if (admins.length > 0) {
    return res
      .status(504)
      .send("You don't have permission to create a new admin");
  }

  let { username, email, password } = req.body;

  if (username && email && password) {
    bcrypt.genSalt(12, async (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res.send(err.message);
        }
        await adminModel.create({
          username,
          email,
          password: hash,
        });
        res.send("Admin created successfully");
      });
    });
  } else {
    res.send("Something is missing");
  }
};

// Login Admin
module.exports.loginAdmin = async (req, res) => {
  try {
    let token = req.cookies.token;
    if (token) {
      res.send("You are already logged in.");
    } else {
      let { email, password } = req.body;

      if (email && password) {
        let admin = await adminModel.findOne({ email });

        if (admin) {
          bcrypt.compare(password, admin.password, (err, result) => {
            if (result) {
              let token = generateToken(admin);
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

// Logout Admin
module.exports.logoutAdmin = async (req, res) => {
  try {
    res.cookie("token", "");
    res.send("Logout successfully");
  } catch (err) {
    res.send("Something went wrong");
  }
};

// Create Company Details
module.exports.createCompanyDetails = async (req, res) => {
  try {
    let { name, phone, email, fbLink, instaLink } = req.body;

    if (name && phone && email && fbLink && instaLink) {
      await companyDetailModel.create({
        name,
        phone,
        email,
        fbLink,
        instaLink,
      });
    } else {
      res.send("Something is missing");
    }

    res.send("Company details added successfully");
  } catch (err) {
    console.log(err.message);
    res.send("Something went wrong");
  }
};

// Update Company Name
module.exports.updateCompanyName = async (req, res) => {
  try {
    let { name } = req.body;
    if (name) {
      await companyDetailModel.updateMany({}, { $set: { name } });
      res.send("Company Name updated successfully");
    } else {
      res.send("You have to give a New Name");
    }
  } catch (err) {
    res.send(err.message);
  }
};

// Update Company Phone
module.exports.updateCompanyPhone = async (req, res) => {
  try {
    let { phone } = req.body;
    if (phone) {
      await companyDetailModel.updateMany({}, { $set: { phone } });
      res.send("Phone updated successfully");
    } else {
      res.send("You have to give a New Phone Number");
    }
  } catch (err) {
    res.send(err.message);
  }
};

// Update Company Email
module.exports.updateCompanyEmail = async (req, res) => {
  try {
    let { email } = req.body;
    if (email) {
      await companyDetailModel.updateMany({}, { $set: { email } });
      res.send("Company Email updated successfully");
    } else {
      res.send("You have to give a New Email Id");
    }
  } catch (err) {
    res.send(err.message);
  }
};

// Fetch Single Admin
module.exports.getAdmin = async (req, res) => {
  try {
    let admin = await req.admin.populate({
      path: "currentOrders",
      populate: { path: "deliveryBoy userId foodId" },
    });
    // console.log(admin);
    res.send(admin);
  } catch (err) {
    res.send("Something went wrong");
  }
};

// Create Delivery Boy
module.exports.createDeliveryBoy = async (req, res) => {
  try {
    let { username, contact, email, password, address, serviceAddress } =
      req.body;
    if (username && contact && email && password && address && serviceAddress) {
      bcrypt.genSalt(12, async (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) {
            return res.send(err.message);
          }
          let a = await deliveryBoyModel.create({
            username,
            contact,
            email,
            password: hash,
            address,
            serviceAddress,
          });
          console.log(a);
        });
      });

      res.send("Delivery Boy added successfully");
    } else {
      res.send("Something is missing");
    }
  } catch (err) {
    res.send("Something went wrong");
  }
};

// Fetch Delivery Boy Info
module.exports.getDeliveryBoy = async (req, res) => {
  try {
    let deliveryBoys = await deliveryBoyModel.find({});
    res.send(deliveryBoys);
  } catch (err) {
    res.send("Something went wrong");
  }
};

// Delete Delivery Boy
module.exports.deleteDeliveryBoy = async (req, res) => {
  try {
    let deliveryBoyId = req.query.deliveryBoyId;
    if (deliveryBoyId) {
      await deliveryBoyModel.findOneAndDelete({ _id: deliveryBoyId });
      res.send("Deivery boy deleted successfully");
    } else {
      res.send("Something is missing");
    }
  } catch (err) {
    res.send("Something went wrong");
  }
};

// Fetch All Users
module.exports.getAllUsers = async (req, res) => {
  try {
    let users = await userModel.find({});
    res.send(users);
  } catch (err) {
    res.send("Something went wrong");
  }
};

// Upload Profile Picture
module.exports.uploadProfilePicture = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  try {
    const oldImage = req.admin.image;
    await adminModel.updateOne(
      { email: req.admin.email },
      { $set: { image: req.file.filename } }
    );
    if (oldImage)
      fs.unlink(
        `../Frontend/public/adminProfilePictures/${oldImage}`,
        (err) => {
          if (err) {
            console.log(err.message);
          }
        }
      );
    res.send("File uploaded successfully.");
  } catch (err) {
    res.send(err.message);
  }
};

// Add new restaurent
module.exports.addNewRestaurent = async (req, res) => {
  if (!req.file) {
    return res.send("No file uploaded.");
  }
  try {
    let { name, address } = req.body;
    if (name && address) {
      let restaurent = await restaurentModel.findOne({ name, address });
      if (restaurent) {
        res.send("Restaurent already exists");
      } else {
        await restaurentModel.create({
          name,
          address,
          image: req.file.filename,
        });
        res.send(`${name} added successfully`);
      }
    } else {
      res.send("Something is missing");
    }
  } catch (err) {
    res.send(err.message);
  }
};

// Fetch all restaurent
module.exports.fetchAllRestaurent = async (req, res) => {
  try {
    let restaurents = await restaurentModel.find({});
    res.send(restaurents);
  } catch (err) {
    res.send(err.message);
  }
};

// Fetch a single restaurent
module.exports.fetchSingleRestaurent = async (req, res) => {
  try {
    let { id } = req.body;
    const restaurent = await restaurentModel.findOne({ _id: id });
    res.send(restaurent);
  } catch (err) {
    res.send(err.message);
  }
};

// Delete restaurent
module.exports.deleteRestaurent = async (req, res) => {
  try {
    let id = req.query.id;
    let restaurent = await restaurentModel.findOne({ _id: id });
    let oldImage = restaurent.image;
    if (oldImage)
      fs.unlink(`../Frontend/public/restaurentPictures/${oldImage}`, (err) => {
        if (err) {
          console.log(err.message);
        }
      });
    await restaurentModel.findOneAndDelete({ _id: id });
    if (restaurent) {
      res.send(`${restaurent.name} Restaurent deleted successfully`);
    } else {
      res.send("Restaurent not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update Restaurent
module.exports.updateRestaurent = async (req, res) => {
  try {
    let { id, name, address } = req.body;
    let image = req.file;

    if (name !== "undefined") {
      await restaurentModel.findOneAndUpdate({ _id: id }, { $set: { name } });
    }
    if (address !== "undefined") {
      await restaurentModel.findOneAndUpdate(
        { _id: id },
        { $set: { address } }
      );
    }

    if (image !== undefined) {
      let restaurent = await restaurentModel.findOne({ _id: id });
      const oldImage = restaurent.image;
      if (oldImage)
        fs.unlink(
          `../Frontend/public/restaurentPictures/${oldImage}`,
          (err) => {
            if (err) {
              console.log(err.message);
            }
          }
        );
      await restaurentModel.findOneAndUpdate(
        { _id: id },
        { $set: { image: image.filename } }
      );
    }

    res.send("Restaurent updated successfully");
  } catch (err) {
    res.send(err.message);
  }
};

// Add new category
module.exports.addNewCategory = async (req, res) => {
  if (!req.file) {
    return res.send("No file uploaded.");
  }
  try {
    let { name } = req.body;
    if (name) {
      await categoryModel.create({
        name,
        image: req.file.filename,
      });
    }
    res.send(`${name} Category is created`);
  } catch (err) {
    res.send(err.message);
  }
};

// Fetch all category
module.exports.fetchAllCategory = async (req, res) => {
  try {
    let category = await categoryModel.find({});
    res.send(category);
  } catch (err) {
    res.send(err.message);
  }
};

// Delete category
module.exports.deleteCategory = async (req, res) => {
  try {
    let id = req.query.id;
    if (id) {
      let category = await categoryModel.findOne({ _id: id });
      const oldImage = category.image;
      if (oldImage)
        fs.unlink(`../Frontend/public/categoryPictures/${oldImage}`, (err) => {
          if (err) {
            console.log(err.message);
          }
        });

      await categoryModel.findOneAndDelete({ _id: id });
      res.send(`${category.name} deleted successfully`);
    }
  } catch (err) {
    res.send("Something went wrong");
  }
};

// Update Category
module.exports.updateCategory = async (req, res) => {
  try {
    let { id, name } = req.body;
    let image = req.file;
    if (name !== "undefined") {
      await categoryModel.findOneAndUpdate({ _id: id }, { $set: { name } });
    }

    if (image !== undefined) {
      let category = await categoryModel.findOne({ _id: id });
      const oldImage = category.image;
      if (oldImage)
        fs.unlink(`../Frontend/public/categoryPictures/${oldImage}`, (err) => {
          if (err) {
            console.log(err.message);
          }
        });
      await categoryModel.findOneAndUpdate(
        { _id: id },
        { $set: { image: image.filename } }
      );
    }

    res.send(`${name} category updated successfully`);
  } catch (err) {
    res.send(err.message);
  }
};

// Fetch all orders
module.exports.fetchAllOredes = async (req, res) => {
  try {
    let admin = req.admin;
    if (admin) {
      let orders = await orderModel.find({}).populate({
        path: "userId foodId deliveryBoy",
      });
      // console.log(orders)
      res.send(orders);
    }
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};

// Comfirm delete
module.exports.confirmDelete = async (req, res) => {
  try {
    let { orderId } = req.body;
    await adminModel.updateMany({
      $pull: { currentOrders: orderId },
    });
    res.send("Delete confirmed");
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};

// Set as today's offer
module.exports.setAsTodaysOffer = async (req, res) => {
  try {
    let { foodId } = req.body;
    await foodModel.findOneAndUpdate(
      { _id: foodId },
      {
        $set: { setAsTodaysOffer: true },
      }
    );
    res.send("Set as today's offer");
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};

// Remove from today's offer
module.exports.removeFromTodaysOffer = async (req, res) => {
  try {
    let { foodId } = req.body;
    await foodModel.findOneAndUpdate(
      { _id: foodId },
      {
        $set: { setAsTodaysOffer: false },
      }
    );
    res.send("Removed today's offer");
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};
