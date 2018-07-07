// This reducer handles the authentication piece of state. Its value
// is determined by the fetchUser action, which fetches a

// Request is sent to backend and request does not instantly resolve.
// during this case, the reducer should return null

// If user is logged in. Auth reducer should return the entire User
// model containing the user.id

// If the user is not logged in, the authReducer should return false.

import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
  console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
