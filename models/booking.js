const mongoose = require('../config/mongodb');

const contactSchema = new mongoose.Schema({
    buy: String,
    or: String,
    rf: String,
    session: String,
    ycount: String,
    yqty: String,
    lotno: String,
    ftype: String,
    sl: String,
    gsm: String,
    color: String,
    mdia: String,
    fdia: String
});

const contact = mongoose.model('contacts', contactSchema);

module.exports = contact;