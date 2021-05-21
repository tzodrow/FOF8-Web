const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
    Name: {
        String
    },
    CreateData: {
        Date
    },
    Active: {
        Boolean
    }
}, { strict: true });

const League = mongoose.model('League', leagueSchema);

module.exports = { League };