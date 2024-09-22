// *foodsRouter.js*
const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const { uploadFoodItem } = require("../middlewares/multer");
const {
  createFoodItems,
  fetchAllFoodItems,
  deleteFoodItem,
  updateFoodItem,
  fetchSingleFoodItem,
} = require("../controller/foodController");

router.get("/", (req, res) => {
  res.send("Food");
});

// CREATE NEW FOOD ITEM
router.post(
  "/createfooditem",
  isLoggedIn,
  uploadFoodItem.single("image"),
  createFoodItems
);

// FETCH ALL FOOD ITEM
router.get("/getallfooditems", fetchAllFoodItems);

// FETCH SINGLE FOOD ITEM
router.get("/getsinglefooditem", isLoggedIn, fetchSingleFoodItem);

// DELETE FOOD ITEM
router.delete("/deletefooditem", isLoggedIn, deleteFoodItem);

//  UPDATE FOOD ITEM
router.put(
  "/updatefooditem",
  isLoggedIn,
  uploadFoodItem.single("image"),
  updateFoodItem
);

module.exports = router;
