const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const productRoutes = require("./product");
const transactionRoutes = require("./transaction");
const userRoutes = require("./user");

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/transactions", transactionRoutes);
router.use("/users", userRoutes);

module.exports = router;
