// Routes for managing surveys.
const mongoose = requrie('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Survey = mongoose.model('surveys');

module.exports = app = () => {
  // This is the route for handling the creation of email surveys. Before
  // a user is allowed to make a survey, we use middleware to make sure the
  // user is loggded in, then make sure they have enough credits.
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;
    // Create a new Survey with the properties from the request body.
    const survey = new Survey({
      title,
      subject,
      body,
      // recipients requires some coercion to transform it from the list of
      // comma seperated strings the user inputs, into an array of objects with
      // an email property. The mongoose model will set the responded property
      // to false.
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

  });
};