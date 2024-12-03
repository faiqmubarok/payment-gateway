const Wallet = require("../models/Wallet");

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

module.exports = { getWallet };