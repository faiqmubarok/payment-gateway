const User = require("../models/User");
const Product = require("../models/Product");
const Transaction = require("../models/Transaction");
const midtransClient = require("midtrans-client");
const Wallet = require("../models/Wallet");
const mongoose = require("mongoose");

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
    console.error("Error creating transaction:", err);
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
      transaction_status === "deny" ||
      transaction_status === "expire"
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

        if (!product) {
          // Jika produk tidak ditemukan, kirim informasi bahwa produk sudah tidak tersedia
          return {
            ...transaction.toObject(),
            product: {
              id: null,
              name: "Produk Tidak Tersedia",
              type: "N/A",
              description: "Produk ini sudah tidak tersedia",
            },
          };
        }

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

const getAllTransaction = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";
    const limit = 10;

    const skip = (page - 1) * limit;

    const query = search
      ? {
          $or: [
            {
              $expr: {
                $regexMatch: {
                  input: { $toString: "$_id" },
                  regex: search,
                  options: "i",
                },
              },
            },
          ],
        }
      : {};

    const totalTransactions = await Transaction.countDocuments(query);

    // Query transaksi dengan pagination dan filter
    const transactions = await Transaction.find(query)
      .populate("userId", "email")
      .populate("productId", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalTransactions / limit);

    res.status(200).json({
      success: true,
      transactions,
      totalTransactions,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching transactions",
    });
  }
};

const deleteTransaction = async (req, res) => {
  const { _id } = req.params;

  try {
    const transaction = await Transaction.findByIdAndDelete(_id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found!" });
    }

    res.status(200).json({ message: "Transaction deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting transaction", error: err });
  }
};

const updateTransaction = async (req, res) => {
  const { _id } = req.params;
  const { status } = req.body;

  try {
    const transaction = await Transaction.findByIdAndUpdate(
      _id,
      { status },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found!" });
    }

    res.status(200).json({ message: "Transaction updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating transaction", error: err });
  }
};

const getUserMonthlyTransactionTotals = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    const currentDate = new Date();
    const currentMonthShort = currentDate.toLocaleString("id-ID", {
      month: "short",
    });

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Des",
    ];

    // Ambil semua transaksi sukses berdasarkan userId
    const transactions = await Transaction.find({
      userId: userId,
      status: "success",
    });

    // Jika tidak ada transaksi, kembalikan bulan saat ini dengan 0
    if (transactions.length === 0) {
      return res.status(200).json([{ [currentMonthShort]: 0 }]);
    }

    // Kelompokkan transaksi berdasarkan bulan
    const groupedByMonth = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.createdAt);
      const month = monthNames[date.getMonth()]; // Ambil nama bulan (Jan, Feb, dst)

      if (!acc[month]) {
        acc[month] = 0; // Inisialisasi total untuk bulan tersebut
      }

      acc[month] += transaction.amount; // Tambahkan jumlah transaksi
      return acc;
    }, {});

    // Format data menjadi array seperti [{ Jan: 1000000 }, { Feb: 2000000 }]
    const result = Object.entries(groupedByMonth).map(([month, total]) => ({
      [month]: total,
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching user monthly transaction totals:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTransaction,
  handleWebhook,
  getUserTransaction,
  getAllTransaction,
  updateTransaction,
  deleteTransaction,
  getUserMonthlyTransactionTotals,
};
