const User = require("../models/User");
const Product = require("../models/Product");
const Transaction = require("../models/Transaction");
const midtransClient = require("midtrans-client");
const Wallet = require("../models/Wallet");

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

const createTransaction = async (req, res) => {
  const { noHp, productId, amount } = req.body;

  try {
    const user = await User.findOne({ noHp });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    // Buat parameter transaksi Midtrans
    const transactionParams = {
      transaction_details: {
        order_id: `order-${Date.now()}`, // Unique order ID
        gross_amount: amount, // Total pembayaran
      },
      customer_details: {
        name: user.name,
        email: user.email,
        phone: user.noHp,
      },
      item_details: [
        {
          id: product._id,
          price: product.price,
          quantity: 1,
          name: product.name,
        },
      ],
    };

    // Simpan transaksi ke database dengan status 'pending'
    const dbTransaction = new Transaction({
      transactionId: transactionParams.transaction_details.order_id,
      userId: user._id,
      productId: product._id,
      amount: amount,
      status: "pending",
      paymentMethod: "midtrans",
    });
    await dbTransaction.save();

    // Request ke Midtrans untuk mendapatkan token transaksi
    const transaction = await snap.createTransaction(transactionParams);

    res.status(201).json({
      message: "Transaksi diterima",
      data: {
        userId: user._id,
        productId: product._id,
        amount: amount,
        redirect_url: transaction.redirect_url, // URL untuk pembayaran
        token: transaction.token, // Token untuk validasi transaksi
      },
    });
  } catch (err) {
    console.error("Error creating transaction:", err); // Menampilkan stack trace error di konsol
    res.status(500).json({
      message: "Error creating transaction",
      error: err.message, // Menampilkan pesan error yang lebih spesifik
      stack: err.stack, // Menampilkan stack trace error
    });
  }
};

const handleWebhook = async (req, res) => {
  const { order_id, transaction_status, fraud_status, payment_type } = req.body;

  try {
    // Update status transaksi di database
    const transaction = await Transaction.findOne({ transactionId: order_id });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found!" });
    }

    if (transaction_status === "capture" && fraud_status === "accept") {
      transaction.status = "success";
      transaction.paymentMethod = payment_type;
    } else if (transaction_status === "settlement") {
      transaction.status = "success";
      transaction.paymentMethod = payment_type;
    } else if (
      transaction_status === "cancel" ||
      transaction_status === "deny"
    ) {
      transaction.status = "failed";
      transaction.paymentMethod = payment_type || "midtrans";
    } else {
      transaction.status = "pending";
      transaction.paymentMethod = payment_type || "midtrans";
    }

    await transaction.save();

    // Update wallet if transaction is successful
    if (transaction.status === "success") {
      const product = await Product.findById(transaction.productId);
      const wallet = await Wallet.findOne({ userId: transaction.userId });

      if (wallet && product) {
        if (product.type === "pulsa") {
          wallet.pulsa += product.value;
        } else if (product.type === "internet") {
          wallet.internet += product.value;
        }

        await wallet.save();
      }
    }

    res.status(200).json({ message: "Webhook processed successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error processing webhook", error: err.message });
  }
};

const getUserTransaction = async (req, res) => {
  const { userID } = req.params;

  try {
    const transactions = await Transaction.find({ userId: userID }).sort({
      createdAt: -1,
    });

    // Mengambil data produk untuk setiap transaksi
    const result = await Promise.all(
      transactions.map(async (transaction) => {
        const product = await Product.findById(transaction.productId);

        return {
          ...transaction.toObject(),
          product: {
            id: product._id,
            name: product.name,
            type: product.type,
            description: product.description,
          },
        };
      })
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTransaction,
  handleWebhook,
  getUserTransaction,
};
