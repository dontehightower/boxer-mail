const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
  // a post request to the backend
  // create a charge object
  app.post('/api/stripe', async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '5 Email credits from $5.00',
      source: req.body.id
    });

    console.log(charge);
  });
};
