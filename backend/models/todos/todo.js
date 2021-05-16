/**
 * Created by Syed Afzal
 */
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        required: true
    }
}, { strict: false });

const Todo = mongoose.model('Todo', todoSchema);

module.exports = {Todo};
