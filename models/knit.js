const mongoose = require('../config/mongodb');

const knitSchema = new mongoose.Schema({
    rfno: String,
    buyer: String,
    style: String,
    ycount: String,
    lotno: String,
    fabtype: String,
    sl: String,
    colour: String,
    reqgsm: String,
    aftgsm: String,
    mdia: String,
    fdia: String,
    knitcompany: String,
    productionqty: String,
    balanceqty: String,
    startdate: String,
    closedate: String,
    note: String
});

const knit = mongoose.model('Knit', knitSchema);

module.exports = knit;