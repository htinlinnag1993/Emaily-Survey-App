const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

// Create a new instance of GoogleStrategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      // userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
      proxy: true // for handling the proxy or load-balancer trust issue between heroku and google
      // callbackURL: 'https://pacific-taiga-84708.herokuapp.com/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find a record with the google id
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          // we already have a record with the given profile id
          // return done(null, existingUser); // use it to eliminate else statement(not the case) below
          done(null, existingUser);
        } else {
          // we dont have a user record with this ID, make a new record
          // creating a new user in the mongoose world without saving it to the database(without persisting it)
          // new User({ googleID: profile.id })
          // creating a new user in the mongoose world & saving/persising it to the database
          const user = await new User({ googleId: profile.id, displayName: profile.displayName }).save((err) => {
            if(err)
              console.log(err);
          });
          done(null, user);
        }

      } catch (error) {
        console.error(error);
      }
    }
  )
);
