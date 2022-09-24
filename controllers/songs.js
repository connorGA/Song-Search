
const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');
const db = require('../models');
require('dotenv').config();
const axios = require('axios');

// routes
router.get('/search', (req, res) => {
    res.render('songs/search');
});


module.exports = router;