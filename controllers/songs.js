const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');
const db = require('../models');
require('dotenv').config();
const axios = require('axios');

//GET route /songs/favorites
router.get('/favorites', async(req, res) => {
  let favorites = await db.favorite.findAll();
  favorites = favorites.map(f => f.toJSON());
  console.log(favorites);

  res.render('songs/favorites', { favorites: favorites});
});

//GET route /songs/favorites
router.get('/dislikes', async(req, res) => {
  let dislikes = await db.dislike.findAll();
  dislikes = dislikes.map(d => d.toJSON());
  console.log(dislikes);

  res.render('songs/dislikes', { dislikes: dislikes});
});


// GET ROUTE / search
router.get('/search', (req, res) => {
    res.render('songs/search');
});

//POST ROUTE / results
router.post('/results', async (req, res) => {
  // get back the search item
  console.log('>>>>> SEARCH DATA', req.body);
  // use axios to find the results
  const options = {
      method: 'GET',
      url: 'https://genius.p.rapidapi.com/search',
      params: { q: req.body.search },
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': 'genius.p.rapidapi.com'
      }
  };
  const response = await axios.request(options);
  console.log('yoooo, response >>>>', response.data.response.hits)
  console.log('**************connected to API*****************')

  // render the songs/results page 
  res.render('songs/results', { hits: response.data.response.hits });
})

//POST ROUTE for adding favorites
router.post('/new/favorites', async (req, res) => {
  console.log('******* /new/favorites', req.body);

  const favSong = await db.favorite.create({
    title: req.body.title,
    artist: req.body.artist,
    imageURL: req.body.imageURL,
    lyrics: req.body.lyrics,
    userId: parseInt(req.body.userId)
  })
  console.log(favSong.toJSON());
  res.redirect('/songs/favorites')
});

//POST ROUTE for adding dislikes
router.post('/new/dislikes', async (req, res) => {
  console.log('******* /new/dislikes', req.body);

  const badSong = await db.dislike.create({
    title: req.body.title,
    artist: req.body.artist,
    imageURL: req.body.imageURL,
    lyrics: req.body.lyrics,
    userId: parseInt(req.body.userId)
  })
  console.log(badSong.toJSON());
  res.redirect('/songs/dislikes')
});




module.exports = router;