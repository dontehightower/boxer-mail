// simple middleware used to verify a user is logged in to the
// application before performing some actions like adding credits to
// an account or creating new email services.

// checks to see if a user object exists on the req object, if not
// sends a 401 error message.

module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }

  next();
};
