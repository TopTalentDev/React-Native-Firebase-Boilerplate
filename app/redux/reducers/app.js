import { REHYDRATE } from 'redux-persist';
import { USER_LOGOUT_REQUEST, APP_INITIALIZED_SET, APP_INITIALIZE_ERROR } from '../actionTypes';

const appInitialState = {};
export function app(state = appInitialState, action) {
  switch (action.type) {
    case REHYDRATE: {
      return { ...state };
    }
  }
  return state;
}

const initState = {
  isInitialized: false,
  error: ''
};
export function initialization(state = initState, action) {
  switch (action.type) {
    case USER_LOGOUT_REQUEST: {
      return { ...initState };
    }
    case APP_INITIALIZED_SET: {
      return {
        ...state,
        isInitialized: true
      };
    }
    case APP_INITIALIZE_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }
  }
  return state;
}
