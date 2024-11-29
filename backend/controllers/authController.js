const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Registrasi
exports.register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword)
    return res.status(400).json({ message: "Passwords do not match!" });

  try {
    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error creating user", error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};
