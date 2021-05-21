const mongoose = require('mongoose');

const fileHistorySchema = new mongoose.Schema({
    Name: {
        String
    },
    UploadDate: {
        Date
    },
    Completed: {
        Boolean
    },
    LeagueId: mongoose.ObjectId
}, { strict: true });

const FileHistory = mongoose.model('FileHistory', fileHistorySchema);

module.exports = { FileHistory };