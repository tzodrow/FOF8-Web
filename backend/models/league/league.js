const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
    Name: {
        type: String
    },
    CreateDate: {
        type: Date
    },
    Active: {
        type: Boolean
    }
});

const League = mongoose.model('League', leagueSchema);

module.exports = { League };