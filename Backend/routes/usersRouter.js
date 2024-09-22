// usersRouter.js
const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  uploadProfilePicture,
  addToCart,
  deleteItemFromCart,
  addToCartIncreaseQuantity,
  deleteCartItemDecreaseQuantity,
  createOrder,
  cancleOrder,
} = require("../controller/userController");
const { uploadUserProfile } = require("../middlewares/multer");

router.get("/", (req, res) => {
  res.send("User");
});

// USER REGISTER
router.post("/register", registerUser);

// USER LOGIN
router.post("/login", loginUser);

// USER LOGOUT
router.get("/logout", isLoggedIn, logoutUser);

// GET SINGLE USER
router.get("/getuser", isLoggedIn, getUser);

// UPDATE USER DETAILS
router.put("/updateuser", isLoggedIn, updateUser);

// UPLOAD PROFILE PICTURE
// router.post(
//   "/uploadprofilepicture",
//   isLoggedIn,
//   uploadUserProfile.single("image"),
//   uploadProfilePicture
// );

// UPLOAD PROFILE PICTURE (USING CLOUDINARY)
router.post(
  "/uploadprofilepicture",
  isLoggedIn,
  uploadProfilePicture
);

// ADD TO CART
router.put("/addtocart", isLoggedIn, addToCart);

// DELETE FROM THE CART
router.put("/deleteitemfromcart", isLoggedIn, deleteItemFromCart);

// ADD TO CART INCREASE QUANTITY
router.put("/addtocartincreasequantity", isLoggedIn, addToCartIncreaseQuantity);

// DELETE CART ITEM DECREASE QUANTITY
router.put(
  "/deletecartitemdecreasequantity",
  isLoggedIn,
  deleteCartItemDecreaseQuantity
);

// CREATE ORDER
router.post("/createorder", isLoggedIn, createOrder);

// CANCLE ORDER
router.delete("/cancleorder", isLoggedIn, cancleOrder);

module.exports = router;
