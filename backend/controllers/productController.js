const Product = require("../models/Product");
const fs = require("fs");
const path = require("path");

const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";
    const type = req.query.type || "";
    const limit = 10;

    const skip = (page - 1) * limit;

    const query = {
      ...(search && { name: { $regex: search, $options: "i" } }), 
      ...(type && { type }), 
    };

    const totalProducts = await Product.countDocuments(query);

    const products = await Product.find(query).skip(skip).limit(limit);

    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      products,
      totalProducts,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


const createProduct = async (req, res) => {
  try {
    const { name, type, price, description, value } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const product = new Product({
      name,
      type,
      price,
      image: imagePath,
      description,
      value,
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, type, price, description, value } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name || product.name;
    product.type = type || product.type;
    product.price = price || product.price;
    product.description = description || product.description;
    product.value = value || product.value;
    if (imagePath) {
      product.image = imagePath; // Update gambar jika ada file baru
    }

    await product.save();
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.image) {
      const imagePath = path.resolve(product.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image file:", err);
        }
      });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
