# SongSearch
SongSearch is an app built off of Genius' API that allows users to access data on thousands of songs.  User's can search for songs by "song title" or "artist name" and curate their own playlists. Songs can be added to the user's 'Favorites' playlist, containing a collection of all the songs they love. Or, users can move songs into their 'Dislikes' playlist, to keep track of all the songs they can't stand.
[SongSearch](https://genius-songsearch.herokuapp.com/)

## Installation Instructions
1. `Fork` and `clone` this repo onto your local machine
2. Install all dependencies listed inside of `package.json`
```
nmp install
``` 
3. Head over to [RapidApi-GeniusAPI](https://rapidapi.com/brianiswu/api/genius/)  to grab yourself an API Key(labeled "X-RapidAPI-Key" in their documentation). Place your key inside of a `.env` file and set it equal to the variable `API_KEY`.
4. Also inside `.env`, create a variable `SECRET_SESSION` and set it equal to your preferred session value
5. Create a database
```
npm install sequelize-cl

npx sequelize-cli db:create express_auth_dev
```
6. Migrate database
```
npx sequelize-cli db:migrate
```
7. Run `nodemon` or `npm start` inside terminal to start up server and head over to `localhost:3000` on your browser


## User Stories
1. As a user, I want to be able to search for songs based on the artist or song name, and view details about the songs.
2. As a user, I want to be able to search for my favorite songs and add them to a playlist of songs I like.
3. As a user, I want to be able to search for songs I hate and keep track of them in a bad songs playlist.

## Glimpse
![](/images/Screen%20Shot%202022-10-11%20at%209.23.34%20PM.png)

## Wireframes
![](/images/Screen%20Shot%202022-09-27%20at%206.28.06%20PM.png)
![](/images/Screen%20Shot%202022-09-27%20at%206.28.29%20PM.png)
## Application Routes
| Method | Path | Location | Purpose |
| ------ | ---------------- | -------------- | ------------------- |
| GET | / | server.js | Home page |
| GET | /profile | server.js | Current User Profile |
| GET | /profile/edit/:id | server.js | Profile edit page for current user |
| GET | /profile/edit | server.js | Profile edit page |
| PUT | /profile/:id | server.js | Update profile info |
| GET | /auth/login | auth.js | Login form |
| GET | /auth/signup | auth.js | Signup form |
| POST | /auth/login | auth.js | Login user |
| POST | /auth/signup | auth.js | Creates user |
| GET | /auth/logout | auth.js | Logout current user |
| GET | /favorites | song.js | Favorites playlist | 
| GET | /dislikes | song.js | Dislikes playlist |
| GET | /search | song.js | Search form |
| GET | /favorites/:id | song.js | Show page for one favorite |
| GET | /dislikes/:id | song.js | Show page for one dislike |
| POST | /results | song.js | Returns results of songs pertaining to search | 
| POST | /new/favorites | song.js | Add new favorite to playlist | 
| POST| /new/dislikes | song.js | Add new dislike to playlist |
| DELETE | /favorites/:id | song.js | Delete song from favorites |
| DELETE | /dislikes/:id | song.js | Delete song from dislikes |

## Future Innovations
1. Add social functionality that allows users to view and interact with other profiles