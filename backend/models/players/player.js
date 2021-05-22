const mongoose = require('mongoose');

const ratingsSchema = new mongoose.Schema({

});

const playerSchema = new mongoose.Schema({
    Player_ID: {
        type: Number,
        required: [true, "Player_ID is required."],
        index: true
    },
    LeagueId: {
        type: mongoose.ObjectId
    },
    Ratings: {
        type: [ratingsSchema]
    }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = { Player };