// *multer.js*
const multer = require("multer");
const path = require("path");

// User Profile Picture Upload----------------------------------------------------------------------------
const storageUserProfile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../Frontend/public/userProfilePictures");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});
module.exports.uploadUserProfile = multer({ storage: storageUserProfile });

// Admin Profile Picture Upload----------------------------------------------------------------------------
const storageAdminProfile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../Frontend/public/adminProfilePictures");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});
module.exports.uploadAdminProfile = multer({ storage: storageAdminProfile });

// Food Item Picture Upload----------------------------------------------------------------------------
const storageFoodItem = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../Frontend/public/foodItemsPictures");
  },
  filename: function (req, file, cb) {
    {const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);}
  },
});
module.exports.uploadFoodItem = multer({ storage: storageFoodItem });

// Restaurent Picture Upload----------------------------------------------------------------------------
const storageRestaurent = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../Frontend/public/restaurentPictures");
  },
  filename: function (req, file, cb) {
    {const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);}
  },
});
module.exports.uploadRestaurent = multer({ storage: storageRestaurent });

// Category Picture Upload----------------------------------------------------------------------------
const storageCategory = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../Frontend/public/categoryPictures");
  },
  filename: function (req, file, cb) {
    {const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);}
  },
});
module.exports.uploadCategory = multer({ storage: storageCategory });