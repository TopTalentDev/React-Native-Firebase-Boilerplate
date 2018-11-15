import { handleActions, combineActions } from 'redux-actions';
import { REHYDRATE } from 'redux-persist';
import { AuthActionTypes } from '../actionTypes';
import { AuthAction } from '../actions/auth';

export interface AuthState {
  user?: any
  additionalUserInfo?: any
}
export function auth(state: AuthState = {}, action: AuthAction) {
  switch (action.type) {
    case AuthActionTypes.AUTH_STATE_CHANGE_SET: {
      return { ...state, user: action.payload };
    }
    case AuthActionTypes.AUTH_ADDITIONAL_USER_INFO_SET: {
      return { ...state, additionalUserInfo: action.payload };
    }
    case AuthActionTypes.AUTH_LOGOUT_REQUEST:
      return {};
  }
  return state;
}

