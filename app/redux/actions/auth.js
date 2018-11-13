import {
  AUTH_CHANGE_SET,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGIN_REQUEST,
  AUTH_ERROR_SET,
  USER_ANONYMOUS_LOGIN_REQUEST
} from '../actionTypes';

export function requestAnonymousLogin() {
  return {
    type: USER_ANONYMOUS_LOGIN_REQUEST
  };
}

export function setAuthChange(user) {
  return {
    type: AUTH_CHANGE_SET,
    payload: user
  };
}

export function setAuthError(error) {
  return {
    type: AUTH_ERROR_SET,
    payload: error
  };
}

export function requestLogin() {
  return {
    type: AUTH_LOGIN_REQUEST
  };
}

export function requestLogout() {
  return {
    type: AUTH_LOGOUT_REQUEST
  };
}
