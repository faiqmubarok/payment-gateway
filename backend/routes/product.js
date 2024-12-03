const express = require("express");
const router = express.Router();

const { getPulsaProducts, getInternetProducts } = require("../controllers/productController");

router.get("/pulsa", getPulsaProducts);
router.get("/internet", getInternetProducts);

module.exports = router;