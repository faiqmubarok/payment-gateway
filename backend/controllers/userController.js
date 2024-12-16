const Wallet = require("../models/Wallet");
const User = require("../models/User");

const getWallet = async (req, res) => {
  try {
    const { userId } = req.params;
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }
    res.status(200).json(wallet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";
    const limit = 10;

    // Hitung dokumen yang dilewati berdasarkan halaman
    const skip = (page - 1) * limit;

    // Buat filter untuk pencarian
    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } }, // Cari di nama
            { email: { $regex: search, $options: "i" } }, // Cari di email
            { noHp: { $regex: search, $options: "i" } }, // Cari di noHp
          ],
        }
      : {}; // Jika tidak ada pencarian, filter kosong

    // Hitung total pengguna sesuai filter
    const totalUsers = await User.countDocuments(query);

    // Query pengguna dengan pagination dan filter
    const users = await User.find(query)
      .sort({ role: 1 }) // Admin di atas
      .skip(skip) // Lewati sesuai halaman
      .limit(limit); // Ambil jumlah yang diinginkan

    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({
      users,
      totalUsers,
      totalPages,
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, noHp, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, noHp, role },
      { new: true, runValidators: true } // `runValidators` untuk validasi saat update
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: "fail",
        message: `User with ID ${userId} not found.`,
      });
    }

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "An error occurred while updating the user.",
      error: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  console.log("from params", userId);
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User and associated deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getWallet, getUsers, deleteUser, updateUser };
