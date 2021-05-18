const mongoose = require('mongoose');

const draftSchema = new mongoose.Schema({
    Player_ID: {
        type: Number,
        trim: true,
        required: true,
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
    }
}, { strict: false });

// TODO: Figure out indexes
// draftSchema.index({Low_Screen_Passes: 1, Low_Short_Passes: 1});
// draftSchema.indexes();

const Draft = mongoose.model('Draft', draftSchema);

module.exports = { Draft };