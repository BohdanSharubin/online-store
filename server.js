require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorHandler");
const productRoutes = require("./routes/productRoutes");
const asyncHandler = require("./middlewares/asyncHandler");
const AppError = require("./errors/AppError");

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.use(
  asyncHandler(async (req, res) => {
    throw new AppError.notFound(`Route ${req.originalUrl} not found`);
  }),
);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => console.error(err));
