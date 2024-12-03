const express = require("express");
const router = express.Router();

const { getWallet } = require("../controllers/userController");

router.get("/getWallet/:userId", getWallet);

module.exports = router;
