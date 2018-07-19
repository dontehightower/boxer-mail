import React, { Component } from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

import * as actions from '../actions';

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        // need to specify currency in cents
        name="Boxer Mail"
        description="Get 5 Email credits for $5.00"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        {/* Custom button used instead of default Stripe Checkout button */}
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  actions
)(Payments);
