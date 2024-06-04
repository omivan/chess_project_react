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
    result: String
});

module.exports = mongoose.model('Game', GameSchema);
