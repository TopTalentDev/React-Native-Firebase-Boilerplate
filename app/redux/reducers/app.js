import { REHYDRATE } from 'redux-persist';
import { LOGIN_SUCCESS, LOGOUT_REQUESTED } from '../actionTypes';

export function me(state = {}, action) {
  switch (action.type) {
    case REHYDRATE: {
      return { ...state };
    }
    case LOGIN_SUCCESS: {
      return { ...state, password: action.payload.password, ...action.payload.me };
    }
    case LOGOUT_REQUESTED:
      return {};
  }
  return state;
}

export function app(state = {}, action) {
  switch (action.type) {
    case REHYDRATE: {
      return { ...state };
    }
  }
  return state;
}
