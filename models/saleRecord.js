// saleRecord.js

const mongoose = require('../config/mongodb');

const saleRecordSchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: true,
  },
  soldQuantity: {
    type: Number,
    required: true,
  },
  soldAt: {
    type: Date,
    default: Date.now,
  },
  customerName: {
    type: String,
  },
  customerMobile: {
    type: String,
  },
  customerAddress: {
    type: String,
  },
});

const SaleRecord = mongoose.model('SaleRecord', saleRecordSchema);

module.exports = SaleRecord;
