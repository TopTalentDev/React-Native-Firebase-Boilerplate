import { REHYDRATE } from 'redux-persist';
import { AppActionTypes, AuthActionTypes } from '../actionTypes';
import { AppAction } from '../actions/app';
import {AuthAction} from '../actions/auth'

interface AppState {}

const appInitialState = {};

export function app(state: AppState = appInitialState, action: any) {
  switch (action.type) {
    case REHYDRATE: {
      return { ...state };
    }
  }
  return state;
}

interface InitializationState {
  isInitialized: boolean
  error?: string | null
}

const initState = {
  isInitialized: false,
  error: ''
};

export function initialization(state: InitializationState = initState, action: AppAction | AuthAction) {
  switch (action.type) {
    case AuthActionTypes.AUTH_LOGOUT_REQUEST: {
      return { ...initState };
    }
    case AppActionTypes.APP_INITIALIZED_SET: {
      return {
        ...state,
        isInitialized: true
      };
    }
    case AppActionTypes.APP_INITIALIZE_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }
  }
  return state;
}
