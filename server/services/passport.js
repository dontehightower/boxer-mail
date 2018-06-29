// Passport Authentication Strategies

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      // the route users are sent to after granting permission to app
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      // is there a user with this profile.id in the users collection?
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // there is a record with the given profile ID
          done(null, existingUser);
        } else {
          // if not create a User model instance & save it to the DB
          new User({ googleId: profile.id }).save().then(user => done(null, user));
        }
      });
    }
  )
);
