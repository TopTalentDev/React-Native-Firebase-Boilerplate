import { handleActions, combineActions } from 'redux-actions';
import { REHYDRATE } from 'redux-persist';
import { AUTH_STATE_CHANGE_SET, AUTH_LOGOUT_REQUEST, AUTH_ADDITIONAL_USER_INFO_SET } from '../actionTypes';
import { requestAnonymousLogin, requestUserCreateWithEmailAndPassword } from '../actions/auth';

// Auth is not persisted by Redux because persistence is handled by firebase directly
export function auth(state = {}, action) {
  switch (action.type) {
    case REHYDRATE: {
      return { ...state };
    }
    case AUTH_STATE_CHANGE_SET: {
      return { ...state, user: action.payload };
    }
    case AUTH_ADDITIONAL_USER_INFO_SET: {
      return { ...state, additionalUserInfo: action.payload };
    }
    case AUTH_LOGOUT_REQUEST:
      return {};
  }
  return state;
}

