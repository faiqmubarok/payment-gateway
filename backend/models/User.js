const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Wallet = require("./Wallet");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  noHp: { type: String, maxlength: 13, required: true, unique: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

// Hash password sebelum menyimpan
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Middleware untuk menghapus Wallet terkait
UserSchema.pre("findOneAndDelete", async function (next) {
  const userId = this.getQuery()._id; 

  try {
    await Wallet.deleteOne({ userId });
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("User", UserSchema);
