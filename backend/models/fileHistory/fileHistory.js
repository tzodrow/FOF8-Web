const mongoose = require('mongoose');

const fileHistorySchema = new mongoose.Schema({
    Name: {
        type: String
    },
    UploadDate: {
        type: Date
    },
    Completed: {
        type: Boolean
    },
    LeagueId: mongoose.ObjectId
});

const FileHistory = mongoose.model('FileHistory', fileHistorySchema);

module.exports = { FileHistory };