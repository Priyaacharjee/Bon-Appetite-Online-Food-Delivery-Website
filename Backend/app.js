const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const db = require("./config/mongoose-connection");
const adminsRouter = require("./routes/adminsRouter");
const foodsRouter = require("./routes/foodsRouter");
const usersRouter = require("./routes/usersRouter");
const deliveryBoysRouter = require("./routes/deliveryBoysRouters");
const cors = require("cors");
const companyDetailsModel = require("./models/companyDetails-model");

require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "https://bonappetiteonline.vercel.app/",
        "http://localhost:3000"
      ];
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/admins", adminsRouter);
app.use("/users", usersRouter);
app.use("/deliveryboys", deliveryBoysRouter);
app.use("/foods", foodsRouter);

app.get("/companyDetails", async (req, res) => {
  try {
    const details = await companyDetailsModel.find({});
    res.send(details);
  } catch (err) {
    res.send(err.message);
  }
});

// app.listen(8000);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});