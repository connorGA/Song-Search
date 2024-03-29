require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const timeout = require('connect-timeout')
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const axios = require('axios');
const { response } = require('express');
const db = require('./models');
const methodOverride = require('method-override');

const SECRET_SESSION = process.env.SECRET_SESSION;
console.log('yoooooooo.....', SECRET_SESSION);


app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

app.use(timeout(30000));

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

// GET / -main index of site
app.get('/', (req, res) => {
  res.render('index');
});


// Add this above /auth controllers
app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get(); 
  res.render('profile', { id, name, email });
});

//GET ROUTE for profile edit page
app.get('/profile/edit/:id', (req, res) => {
  const { id, name, email } = req.user.get();
  res.render('edit', { id, name, email });
  
})

//GET ROUTE edit page
app.get('/profile/edit', isLoggedIn, (req, res) => {
  res.render('edit');
});

//PUT ROUTE for profile page
app.put('/profile/:id', isLoggedIn, async (req, res) => {
  try {
    const usersUpdated = await db.user.update({
      email: req.body.email,
      name: req.body.name
    }, {
      where: {
        id: req.params.id
      }
  });

  console.log('********** PUT ROUTE *************');
  console.log('Users updated', usersUpdated);
  console.log('***********************');

  // redirect back to the profile page
  res.redirect('/profile'); // route
  } catch (error) {
    console.log('*********************ERROR***********************');
    console.log(error);
    console.log('**************************************************');
    res.render('edit');
  }
});


  


//access to all of our auth routes GET /auth/login, GET /auth/signup, POST routes
app.use('/auth', require('./controllers/auth'));
app.use('/songs', isLoggedIn, require('./controllers/songs'));


//GET Route for 404 page
app.get('*', (req, res) => {
  res.status(404).render('404')
})



// this function will be called if the timeout is exceeded
app.use(function (req, res, next) {
 
  res.status(503).send('Request timed out.');
});






const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
