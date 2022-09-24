require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const axios = require('axios');
const { response } = require('express');
const db = require('./models');
// let favorite = db.favorite

const SECRET_SESSION = process.env.SECRET_SESSION;
console.log('yoooooooo.....', SECRET_SESSION);


app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

app.use(session({
  secret: SECRET_SESSION,    // What we actually will be giving the user on our site as a session cookie
  resave: false,             // Save the session even if it's modified, make this false
  saveUninitialized: true    // If we have a new session, we save it, therefore making that true
}));
app.use(flash());            // flash middleware

app.use(passport.initialize());      // Initialize passport
app.use(passport.session());         // Add a session

app.use((req, res, next) => {
  console.log('res locals >>>', res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
})


// const rapidAPIHost = 'https://genius.p.rapidapi.com';
const APIKey = process.env.API_KEY

// GET / -main index of site
app.get('/', (req, res) => {
  
  res.render('index');
});


// GET / search / retrieving from API
app.get('/search', (req, res) => {

  res.render('search');
});


//GET results route / will render search data here
app.get('/results', async(req, res) => {
    const options = {
    method: 'GET',
    url: 'https://genius.p.rapidapi.com/search',
    params: {q: req.query.search},
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': 'genius.p.rapidapi.com'
    }
  };
  
  await axios.request(options).then((response) => {
    console.log(req.query);
    console.log('this is array' , response.data.response.hits);
    console.log('*********connected to API***********')
    res.render('results', {hits: response.data.response.hits});
  }).catch((error) => {
    console.error('There was an error retrieving response from API', error);
  });
});

app.post('/search/new', async(req, res) => {
  console.log('******** /new', req.body);
  const newSong = await db.favorite.create({
    title: req.body.title,
    artist: req.body.artist,
    imgURL: req.body.imgURL,
    userId: parseInt(req.body.userId)
  });
  console.log(newSong.toJSON())
})




//access to all of our auth routes GET /auth/login, GET /auth/signup, POST routes
app.use('/auth', require('./controllers/auth'));

// Add this above /auth controllers
app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get(); 
  res.render('profile', { id, name, email });
});





const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
