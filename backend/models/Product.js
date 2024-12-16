const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['pulsa', 'internet'], required: true },
  price: { type: Number, required: true },
  image: { type: String},
  description: { type: String },
  value: { type: Number},
});

module.exports = mongoose.model('Product', productSchema);