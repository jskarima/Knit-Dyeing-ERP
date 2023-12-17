const mongoose = require('../config/mongodb');

const contactSchema = new mongoose.Schema({
    name: String,
    image: String
});

const contact = mongoose.model('contacts', contactSchema);

module.exports = contact;