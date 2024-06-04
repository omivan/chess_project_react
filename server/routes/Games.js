const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// POST a new game
router.post('/', async (req, res) => {
    try {
        const newGame = new Game(req.body);
        const game = await newGame.save();
        res.status(201).json(game);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET all games
router.get('/', async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
