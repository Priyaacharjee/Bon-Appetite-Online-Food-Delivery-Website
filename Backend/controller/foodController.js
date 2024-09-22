// *foodController.js*
const foodModel = require("../models/food-model");
const dbgr = require("debug")("development:usercheck");
const fs = require("fs");
const restaurentModel = require("../models/restaurent-model");

// Create Food Item
module.exports.createFoodItems = async (req, res) => {
  if (!req.file) {
    return res.send("No file uploaded.");
  }
  try {
    let { name, price, category, quantity, restaurent } = req.body;
    let res_details = restaurent.split("-");

    if (name && category && restaurent && price) {
      let food = await foodModel.create({
        name,
        price,
        category,
        quantity,
        restaurent: res_details[0],
        image: req.file.filename,
      });

      await restaurentModel.findOneAndUpdate(
        {
          name: res_details[0],
          address: res_details[1],
        },
        { $push: { food: food._id } }
      );
      res.send(`${name} item added successfully`);
    } else {
      res.send("Something is missing");
    }
  } catch (err) {
    res.send(err.message);
  }
};

// Fetch All Food Items
module.exports.fetchAllFoodItems = async (req, res) => {
  try {
    let foods = await foodModel.find({});
    res.send(foods);
  } catch (err) {
    res.send("Something went wrong");
  }
};

// Fetch single food item
module.exports.fetchSingleFoodItem = async (req, res) => {
  try {
    let foodId = req.query.foodId;
    if (foodId) {
      let food = await foodModel.findOne({ _id: foodId });
      console.log(food)
    } else {
      res.send("Item not found");
    }
  } catch (err) {
    res.send("Something went wrong");
  }
};

// Delete Food Item
module.exports.deleteFoodItem = async (req, res) => {
  try {
    let id = req.query.id;
    if (id) {
      let food = await foodModel.findOne({ _id: id });
      let restaurent_id = food.restaurent;
      await restaurentModel.findOneAndUpdate(
        {
          _id: restaurent_id,
        },
        { $pull: { food: id } }
      );

      const oldImage = food.image;
      if (oldImage)
        fs.unlink(`../Frontend/public/foodItemsPictures/${oldImage}`, (err) => {
          if (err) {
            console.log(err.message);
          }
        });

      await foodModel.findOneAndDelete({ _id: id });
      res.send(`${food.name} deleted successfully`);
    }
  } catch (err) {
    res.send("Something went wrong");
  }
};

// Update Food Item
module.exports.updateFoodItem = async (req, res) => {
  try {
    let { id, name, price, category, quantity, restaurent } = req.body;
    let image = req.file;
    if (name !== "undefined") {
      await foodModel.findOneAndUpdate({ _id: id }, { $set: { name } });
    }
    if (price !== 'undefined') {
      await foodModel.findOneAndUpdate({ _id: id }, { $set: { price } });
    }
    if (category !== "undefined") {
      await foodModel.findOneAndUpdate({ _id: id }, { $set: { category } });
    }
    if (quantity !== "undefined") {
      await foodModel.findOneAndUpdate({ _id: id }, { $set: { quantity } });
    }
    if (restaurent !== "undefined") {
      await foodModel.findOneAndUpdate({ _id: id }, { $set: { restaurent } });
    }

    if (image !== undefined) {
      let food = await foodModel.findOne({ _id: id });
      const oldImage = food.image;
      if (oldImage)
        fs.unlink(`../Frontend/public/foodItemsPictures/${oldImage}`, (err) => {
          if (err) {
            console.log(err.message);
          }
        });
      await foodModel.findOneAndUpdate(
        { _id: id },
        { $set: { image: image.filename } }
      );
    }

    res.send(`${name} updated successfully`);
  } catch (err) {
    res.send(err.message);
  }
};
