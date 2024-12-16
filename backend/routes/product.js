const express = require("express");
const router = express.Router();
const upload = require("../middleware/productMiddleware");

const {
  getPulsaProducts,
  getInternetProducts,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProduct,
} = require("../controllers/productController");

router.get("/allProducts", getAllProducts);
router.get("/getProductById/:id", getProductById);
router.post("/createProduct", upload.single("image"), createProduct);
router.put("/updateProduct/:id", upload.single("image"), updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;
