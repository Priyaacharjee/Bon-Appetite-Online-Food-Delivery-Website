// usersRouter.js
const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const {
  loginDeliveryBoy,
  fetchSingleDeliveryBoy,
  deliverySuccessfull,
} = require("../controller/deliveryBoyController");

router.get("/", (req, res) => {
  res.send("Delivery Boy");
});

// DELIVERY BOY LOGIN
router.post("/login", loginDeliveryBoy);

// FETCH SINGLE DELIVERY BOY
router.get("/fetchsingledeliveryboy", isLoggedIn, fetchSingleDeliveryBoy);

// FETCH SINGLE DELIVERY BOY
router.put("/deliverysuccessfull", isLoggedIn, deliverySuccessfull);

module.exports = router;
