const express = require("express");
const router = express.Router();
const { createTransaction, handleWebhook, getUserTransaction } = require("../controllers/transactionController");

router.post("/create", createTransaction);
router.post("/webhook", handleWebhook);
router.get("/getUserTransactions/:userID", getUserTransaction);

module.exports = router;
