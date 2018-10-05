import { REHYDRATE } from 'redux-persist';
import { USER_LOGIN_SUCCESS_SET, USER_LOGOUT_REQUEST } from '../actionTypes';

export function me(state = {}, action) {
  switch (action.type) {
    case REHYDRATE: {
      return { ...state };
    }
    case USER_LOGIN_SUCCESS_SET: {
      return { ...state, password: action.payload.password, ...action.payload.me };
    }
    case USER_LOGOUT_REQUEST:
      return {};
  }
  return state;
}
