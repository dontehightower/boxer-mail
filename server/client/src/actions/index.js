// Action Creator

// The fetchUser action sends a GET request to /api/current_user,
// which is an api route that returns the mongoose model instance
// the currently logged in user. When no user is logged in,
// res.data == ''.

import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};
