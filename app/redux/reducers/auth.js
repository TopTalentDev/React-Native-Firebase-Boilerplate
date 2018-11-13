import { REHYDRATE } from 'redux-persist';
import { AUTH_CHANGE_SET, AUTH_LOGOUT_REQUEST } from '../actionTypes';

// Auth is not persisted by Redux because persistence is handled by firebase directly
export function auth(state = {}, action) {
  switch (action.type) {
    case REHYDRATE: {
      return { ...state };
    }
    case AUTH_CHANGE_SET: {
      return { ...state, user: action.payload.user };
    }
    case AUTH_LOGOUT_REQUEST:
      return {};
  }
  return state;
}
