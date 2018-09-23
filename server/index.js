// Main express server file.

// This version handles passport authentication using the GoogleStrategy.
// PassportJS logic & GoogleStrategy implementation is handeled in
//  ./services/passport.js
// Authentication routes are in ./routes/authRoutes.js

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

// The order of these requirements is important. The passportJS
// GoogleStrategy makes use of the mongoose User class
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000; // in milliseconds

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: THIRTY_DAYS,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express should serve production assets like main.css
  // or main.js
  app.use(express.static('/client/build'));

  // Express should serve index.html file if it doesn't
  // recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
