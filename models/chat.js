const mongoose = require('../config/mongodb');

const chatSchema = new mongoose.Schema({
    ref: String,
    message: String,
    image: String
});

const chat = mongoose.model('chat', chatSchema);

module.exports = chat;

