// Main express server file.

// This version handles passport authentication using the GoogleStrategy.
// PassportJS logic & GoogleStrategy implementation is handeled in
//  ./services/passport.js
// Authentication routes are in ./routes/authRoutes.js

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

// The order of these requirements is important. The passportJS
// GoogleStrategy makes use of the mongoose User class
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000; // in milliseconds

app.use(
  cookieSession({
    maxAge: THIRTY_DAYS,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
