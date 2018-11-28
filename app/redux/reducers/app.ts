import { REHYDRATE } from 'redux-persist';
import { AppActionTypes, AuthActionTypes } from '../actionTypes';
import { AppAction } from '../actions/app';
import {AuthAction} from '../actions/auth'
import { Reducer } from 'redux';

export interface AppState {}

const appInitialState = {};

export const app: Reducer<AppState, any> = (state = appInitialState, action) => {
  switch (action.type) {
    case REHYDRATE: {
      return { ...state };
    }
  }
  return state;
}

export interface InitializationState {
  isInitialized: boolean
  error?: string | null
}

const initState = {
  isInitialized: false,
  error: ''
};

export const initialization: Reducer<InitializationState, AppAction | AuthAction> = (state = initState, action ) => {
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
