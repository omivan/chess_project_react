const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    details: {
        type: String,
        required: true
    },
    datePlayed: {
        type: Date,
        default: Date.now
    },
    result: {
        type: Number,  // Now expecting a number
        required: true
    },
    moves: {
        type: [String],  // Array of strings
        required: true
    },
    color: {
        type: String,
        enum: ['white', 'black'],  // Only allow 'white' or 'black'
        required: true
    }
});

module.exports = mongoose.model('Game', GameSchema);
