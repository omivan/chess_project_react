const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {
    const token = req.header('Authorization');
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded.id)
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        next();
    } catch (ex) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

router.post('/', authenticateToken, async (req, res) => {
    try {
        const newGame = new Game(req.body);
        const game = await newGame.save();

        req.user.gamesPlayed.push(game._id);
        await req.user.save();

        res.status(201).json(game);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET all games
router.get('/', authenticateToken, async (req, res) => {
    try {
        // Assuming req.user is populated correctly by your authentication middleware
        const user = await User.findById(req.user._id).populate('gamesPlayed');
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const gameIds = user.gamesPlayed; // Array of game IDs the user has played
        const games = await Game.find({ '_id': { $in: gameIds } });

        console.log("GET games", req.user);
        console.log("GET games", games);

        res.json(games);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
