const mongoose = require('../config/mongodb');

const mouseSchema = new mongoose.Schema({
  serialNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  color: String,
  weight: Number,
  quantity: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
});

const Mouse = mongoose.model('Mouse', mouseSchema);

module.exports = Mouse;
