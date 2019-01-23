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
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile.id);
      // Find a record with the google id
      User.findOne({ googleId: profile.id })
        .then((existingUser) => {
          if (existingUser) {
            // we already have a record with the given profile id
            done(null, existingUser);
          } else {
            // we dont have a user record with this ID, make a new record
            // creating a new user in the mongoose world without saving it to the database(without persisting it)
            // new User({ googleID: profile.id })
            // creating a new user in the mongoose world & saving/persising it to the database
            new User({ googleId: profile.id })
              .save((err) => {
                if(!err)
                  console.log("googleId: " + profile.id);
              })
              .then(user => done(null, user));
          }
        });
    }
  )
);
