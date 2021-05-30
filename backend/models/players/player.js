const mongoose = require('mongoose');

const ratingsSchema = new mongoose.Schema({

}, { strict: false });

const playerSchema = new mongoose.Schema({
    Player_ID: {
        type: Number,
        required: [true, "Player_ID is required."],
        index: true
    },
    LeagueId: {
        type: mongoose.ObjectId
    },
    Season_1_Year : {
        type: Number
    },
    Position_Group : {
        type: String
    },
    Overall_Projection_QB : {
        type: Number
    },
    Ratings: {
        type: [ratingsSchema]
    }
}, { strict: false });

const Player = mongoose.model('Player', playerSchema);

module.exports = { Player };