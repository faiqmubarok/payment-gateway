const express = require("express");
const router = express.Router();
const {
  createTransaction,
  handleWebhook,
  getUserTransaction,
  getAllTransaction,
  deleteTransaction,
  updateTransaction,
  getUserMonthlyTransactionTotals,
} = require("../controllers/transactionController");

router.post("/create", createTransaction);
router.post("/webhook", handleWebhook);
router.get("/getUserTransactions/:userID", getUserTransaction);
router.get("/getAllTransaction", getAllTransaction);
router.get(
  "/getMonthlyTransactionTotals/:userId",
  getUserMonthlyTransactionTotals
);
router.put("/updateTransaction/:_id", updateTransaction);
router.delete("/deleteTransaction/:_id", deleteTransaction);

module.exports = router;
