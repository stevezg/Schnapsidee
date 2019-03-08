
# [Deployed Version](https://german-steve-sean.herokuapp.com/)
The server is in a seperate repo that can be found [Here](https://github.com/thinkful-ei26/spaced-repitition-steve-sean-SERVER)

### Description
#### Tech Stack
The backend for this app uses NodeJS with express.  Authenitcation is handled using JWTs with passport.  BcryptJS is used to hash passwords.
The database is a mongo database.  It's hosted on [mLab](https://mlab.com/).
The client uses React and Redux.
The server and client are both hosted on [Heroku](https://www.heroku.com/)
#### Code Base
All components are located in src/components.  Other than logging in and registering, dashboard.js is responsible for dispatching all actions.
All actions are located in src/users.  auth.js handles logging in and JWTs.  users.js handles registration.  words.js is where the main functionality of the app is.  This is responsible for fetching words and progress and also submitting answers from and to the server.
On the backend, index.js is the main file.  The rest is divided into directories containing their own index.js file that imports from other files in the directory and simply exports everything in one place.
Auth contains the local and jwt strategies as well as a router with login and refresh endpoints.
Users contains our user model, which has methods to hash and validate passwords using bcrypt.  Registration is handled in the users router.
Words just has a router.  This is where the get word, get progress, and answer question endpoints are.  The answer question endpoint has our spaced repetition algorithm.