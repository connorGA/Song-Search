const db = require('./models');
const axios = require('axios');
const { response } = require('express');

axios.get('https://genius.p.rapidapi.com/songs/')
.then(response => {
    console.log(response.data);
})

// Implement CRUD for user model

// CREATE
async function createUser() {
    try {
        const newUser = await db.user.create({
            name: "My Name",
            email: "myemail@gmail.com"
        });
        console.log('my new user >>>', newUser);
    } catch (error) {
        console.log('new user was not created b/c of >>>', error);
    }
    
}
// @todo run createUser function below

// READ
// find one user
async function findOneUser() {
    try {
        const user = await db.user.findOne({
            where: { id: 1 }
        });
        console.log('current user here >>>', user);  
    } catch (error) {
        console.log('did not find user b/c of >>>', error);
    }
}
// @todo run findOneUser function below

// find all users
async function findAllUsers() {
    try {
        const users = await db.user.findAll();
        console.log('all users here >>>', users);  
    } catch (error) {
        console.log('did not find all users because of >>>', error);
    }
}
// @todo run findAllUsers function below

// find one user
async function findOrCreate() {
    try {
        const users = await db.user.findOrCreate({
            where: { email: 'brainsmith@gmail.com' },
            defaults: {
                name: 'Brian Smith',
            },
        });
        console.log('all users here >>>', users);  
    } catch (error) {
        console.log('did not find all users because of >>>', error);
    }
}
// @todo run findOrCreate function below

// UPDATE
async function updateUser() {
    try {
        const numRowsUpdated = await db.user.update({
            name: 'Brain Taco'
        }, {
            where: {
                email: 'brainsmith@gmail.com'
            }
        });
        console.log('number of users updated', numRowsUpdated);
    } catch (error) {
        console.log('did not update user(s) because of >>>', error);
    }
}
// @todo run updateUser function below

// DELETE
async function deleteUser() {
    try {
        let numOfRowsDeleted = await db.user.destroy({
            where: { email: 'brainsmith@gmail.com' }
        });
        console.log('number of rows deleted >>>', numOfRowsDeleted);
    } catch (error) {
        console.log('did not delete user(s) because of >>>', error);
    }
}
// @todo run deleteUser function below


db.favorite.create({
    favSong: 'Chiasma',
    album: 'Let the Sun Talk',
    artist: 'Mavi'
  }).then(song => {
    console.log('Created: ', song.favSong)
  })

db.favorite.findOne({
  where: {
    favSong: 'Chiasma'
  }
}).then(song => {
  console.log('Found: ', song.favSong)
})

//create some favSongs with async/await syntax
async function createFavoriteSong() {
    try {
      const newFavoriteSong = await db.favorite.create({ title: 'Nikes', album: 'Blonde', artist: 'Frank Ocean'})
      console.log('My new Favorite Song is:', newFavoriteSong)
      const foundFavoriteSong = await db.favorite.findOne({
        where: {
          title: 'Nikes'
        }
      })
      console.log('the found FavoriteSong is:', foundFavoriteSong)
    } catch (err) {
      console.log(err)
    }
  }
  
  createFavoriteSong();


  async function createDislikedSong() {
    try {
      const newDislikedSong = await db.dislike.create({ title: 'Gucci Gang', artist: 'Lil Pump'})
      console.log('My new Disliked Song is:', newDislikedSong)
      const foundDislikedSong = await db.dislike.findOne({
        where: {
          title: 'Gucci Gang'
        }
      })
      console.log('the found DislikedSong is:', foundDislikedSong)
    } catch (err) {
      console.log(err)
    }
  }
  
  createDislikedSong();


  db.user.findOne({
    where: {
      name: 'Connor Cappello'
    }
  })
  .then(user => {
    console.log('adding fav song to this user:', user.name)
    user.createFavorite({
      title: 'Chiasma',
      album: 'Let the Sun Talk',
      artist: 'Mavi'
    }).then(song => {
      console.log(song);
    });
  });