const passport = require('passport');

module.exports = app => {
  // initial route handler to kick user into OAuth flow
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // perform code exchange when user visits auth/google/callback
  app.get('/auth/google/callback', passport.authenticate('google'));
};
