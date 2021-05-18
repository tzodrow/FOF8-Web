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
    }
}, { strict: false });

// TODO: Figure out indexes
// draftSchema.index({Low_Screen_Passes: 1, Low_Short_Passes: 1});
// draftSchema.indexes();

const Draft = mongoose.model('Draft', draftSchema);

module.exports = {Draft};
