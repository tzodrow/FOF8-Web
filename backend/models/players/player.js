const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    Player_ID: {
        type: Number,
        trim: true,
        required: true
    }
}, { strict: false });

const Player = mongoose.model('Player', playerSchema);

module.exports = {Player};
