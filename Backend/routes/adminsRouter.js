// *adminsRouter.js*
const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const {
  createAdmin,
  loginAdmin,
  createCompanyDetails,
  logoutAdmin,
  getAdmin,
  updateCompanyName,
  updateCompanyPhone,
  updateCompanyEmail,
  getDeliveryBoy,
  createDeliveryBoy,
  getAllUsers,
  deleteDeliveryBoy,
  uploadProfilePicture,
  addNewRestaurent,
  fetchAllRestaurent,
  deleteRestaurent,
  fetchSingleRestaurent,
  updateRestaurent,
  addNewCategory,
  fetchAllCategory,
  deleteCategory,
  updateCategory,
  fetchAllOredes,
  confirmDelete,
  setAsTodaysOffer,removeFromTodaysOffer
} = require("../controller/adminController");
const {
  uploadAdminProfile,
  uploadRestaurent,
  uploadCategory,
} = require("../middlewares/multer");

// ADMIN REGISTER
if (process.env.NODE_ENV === "development") {
  router.post("/create", createAdmin);
}

router.get("/", (req, res) => {
  res.send("Admin");
});

// ADMIN LOGIN
router.post("/login", loginAdmin);

// ADMIN LOGOUT
router.post("/logout", isLoggedIn, logoutAdmin);

// ADD COMPANY DETAILS
router.post("/createcompanydetails", isLoggedIn, createCompanyDetails);

// UPDATE COMPANY NAME
router.put("/updatecompanyname", isLoggedIn, updateCompanyName);

// UPDATE COMPANY PHONE
router.put("/updatecompanyphone", isLoggedIn, updateCompanyPhone);

// UPDATE COMPANY EMAIL
router.put("/updatecompanyemail", isLoggedIn, updateCompanyEmail);

// FETCH ADMIN DETAILS
router.get("/getadmin", isLoggedIn, getAdmin);

// CREATE DELIVERY BOY
router.post("/createdeliveryboy", isLoggedIn, createDeliveryBoy);

// GET DELIVERY BOY
router.get("/getdeliveryboy", isLoggedIn, getDeliveryBoy);

// DELETE DELIVERY BOY
router.delete("/deletedeliveryboy", isLoggedIn, deleteDeliveryBoy);

// GET ALL USERS
router.get("/getallusers", isLoggedIn, getAllUsers);

// UPLOAD PROFILE PICTURE
router.post(
  "/uploadprofilepicture",
  isLoggedIn,
  uploadAdminProfile.single("image"),
  uploadProfilePicture
);

// ADD NEW RESTAURENT
router.post(
  "/addnewrestaurent",
  isLoggedIn,
  uploadRestaurent.single("image"),
  addNewRestaurent
);

// UPDATE RESTAURENT
router.put(
  "/updaterestaurent",
  isLoggedIn,
  uploadRestaurent.single("image"),
  updateRestaurent
);

// FETCH ALL RESTAURENT
router.get("/fetchallrestaurent", fetchAllRestaurent);

// FETCH A PARTICULAR RESTAURENT
router.get("/fetchsinglerestaurent", isLoggedIn, fetchSingleRestaurent);

// DELETE SINGLE RESTAURENT
router.delete("/deleterestaurent", isLoggedIn, deleteRestaurent);

// ADD NEW CATEGORY
router.post(
  "/addnewcategory",
  isLoggedIn,
  uploadCategory.single("image"),
  addNewCategory
);

// FETCH ALL CATEGORY
router.get("/getallcategory",fetchAllCategory);

// DELETE CATEGORY
router.delete("/deletecategory", isLoggedIn, deleteCategory);

// UPDATE CATEGORY
router.put(
  "/updatecategory",
  isLoggedIn,
  uploadCategory.single("image"),
  updateCategory
);

// FETCH ALL ORDER
router.get("/fetchallorders", isLoggedIn, fetchAllOredes);

// CONFIRM DELETE
router.put("/confirmdelete", isLoggedIn, confirmDelete);

// Add to todays offer
router.put("/todaysoffer", isLoggedIn, setAsTodaysOffer);

// Remove from todays offer
router.put("/removetodaysoffer", isLoggedIn, removeFromTodaysOffer);

module.exports = router;
