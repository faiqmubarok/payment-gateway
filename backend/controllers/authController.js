const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Wallet = require("../models/Wallet");

// Registrasi
exports.register = async (req, res) => {
  const { name, email, noHp, password, confirmPassword } = req.body;
  if (password !== confirmPassword)
    return res.status(400).json({ message: "Passwords do not match!" });

  try {
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const phoneExist = await User.findOne({ noHp });
    if (phoneExist) {
      return res
        .status(400)
        .json({ message: "Phone number is already registered" });
    }

    const user = await User.create({ name, email, noHp, password });

    const wallet = new Wallet({
      userId: user._id, 
      pulsa: 0,        
      internet: 0,     
    });

    await wallet.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating user", error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { emailOrPhone, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { noHp: emailOrPhone }],
    });

    if (!user) return res.status(404).json({ message: "User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "The password you entered is incorrect!" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        noHp: user.noHp,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};
