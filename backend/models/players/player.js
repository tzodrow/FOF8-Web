const mongoose = require('mongoose');

const ratingsSchema = new mongoose.Schema({

}, { strict: false });

const playerSchema = new mongoose.Schema({
    Player_ID: {
        type: Number,
        required: [true, "Player_ID is required."],
        index: true
    },
    Interviewed: { 
        type: Boolean
    },
    Low_Screen_Passes: {
        type: Number
    },
    Low_Short_Passes: {
        type: Number
    },
    First_Name: { 
        type: String
    },
    Last_Name: {
        type: String
    },
    Position_Group: {
        type: String
    },	
    College: {
        type: String
    },
    Height: {
        type: Number
    },
    Weight: {
        type: Number
    },	
    Dash: {
        type: Number
    },	
    Solecismic: {
        type: Number
    },
    Strength: {
        type: Number
    },
    Agility: {
        type: Number
    },
    Jump: {
        type: Number
    },
    Position_Specific: {
        type: Number
    },
    Developed: {
        type: Number
    },
    Grade: {
        type: Number
    },
    Ratings: {
        type: [ratingsSchema]
    }
}, { strict: false });

const Player = mongoose.model('Player', playerSchema);

module.exports = { Player };