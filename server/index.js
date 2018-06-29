// Main express server file.

// This version handles passport authentication using the GoogleStrategy.
// PassportJS logic & GoogleStrategy implementation is handeled in
//  ./services/passport.js
// Authentication routes are in ./routes/authRoutes.js

const express = require('express');
require('./services/passport');

const app = express();
require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
