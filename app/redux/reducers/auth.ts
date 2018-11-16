import { AuthActionTypes } from '../actionTypes';
import { AuthAction } from '../actions/auth';
import { Reducer } from 'react';
import { User, AdditionalUserInfo } from '../../types';

export interface AuthState {
  user?: User
  additionalUserInfo?: AdditionalUserInfo
}
export const auth: Reducer<AuthState, AuthAction> = (state={}, action) => {
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

