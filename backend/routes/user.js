const express = require("express");
const router = express.Router();

const { getWallet, getUsers, updateUser, deleteUser } = require("../controllers/userController");

router.get("/getWallet/:userId", getWallet);
router.get("/getUsers", getUsers);
router.put("/updateUser/:userId", updateUser);
router.delete("/deleteUser/:userId", deleteUser);

module.exports = router;
