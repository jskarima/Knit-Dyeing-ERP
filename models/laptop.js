const mongoose = require('../config/mongodb');

const laptopSchema = new mongoose.Schema({
  serialNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  color: String,
  weight: Number,
  quantity: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
});

const laptop = mongoose.model('Laptop', laptopSchema);

module.exports = laptop;
