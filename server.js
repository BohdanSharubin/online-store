require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorHandler");
const productRoutes = require("./routes/productRoutes");
const asyncHandler = require("./middlewares/asyncHandler");
const AppError = require("./errors/AppError");
const clientRouter = require("./routes/clientRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5500",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/", clientRouter);
app.use(express.static("public"));

app.use(
  asyncHandler(async (req, res) => {
    throw AppError.notFound(`Route ${req.originalUrl} not found`);
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
