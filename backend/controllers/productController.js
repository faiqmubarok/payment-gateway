const Product = require('../models/Product');

const getPulsaProducts = async (req, res) => {
  try {
    const products = await Product.find({ type: 'pulsa' });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInternetProducts = async (req, res) => {
  try {
    const products = await Product.find({ type: 'internet' });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPulsaProducts,
  getInternetProducts,
};
