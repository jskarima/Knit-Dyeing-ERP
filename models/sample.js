const mongoose = require('../config/mongodb');

const sampleSchema = new mongoose.Schema({
    job: String,
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
    knitclodate: String,
    knitcompany: String,
    actuclodate: String,
    note: String   
});

const sample = mongoose.model('Sample', sampleSchema);

module.exports = sample;