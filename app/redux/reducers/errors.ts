import { ErrorActionTypes, AuthActionTypes } from '../actionTypes';
import { ErrorAction } from '../actions/app';
import { AuthAction } from '../actions/auth';
import { Reducer } from 'redux';

export interface ErrorState {
  authError?: string
}

export const errors: Reducer<ErrorState, ErrorAction | AuthAction> = (state = {}, action) => {
  switch (action.type) {
    case AuthActionTypes.AUTH_ERROR_SET:
      return { ...state, authError: action.payload };
    case ErrorActionTypes.ERROR_CLEAR:
      return { ...state, [action.payload]: null };
    case ErrorActionTypes.ERROR_CLEAR_ALL:
      return {};
  }
  return state;
}
