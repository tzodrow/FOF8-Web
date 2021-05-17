const mongoose = require('mongoose');

const draftSchema = new mongoose.Schema({
    Player_ID: {
        type: Number,
        trim: true,
        required: true
    }
}, { strict: false });

const Draft = mongoose.model('Draft', draftSchema);

module.exports = {Draft};
