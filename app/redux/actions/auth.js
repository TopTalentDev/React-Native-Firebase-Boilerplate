import {
  AUTH_STATE_CHANGE_SET,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGIN_REQUEST,
  AUTH_ERROR_SET,
  AUTH_ANONYMOUS_LOGIN_REQUEST,
  AUTH_ADDITIONAL_USER_INFO_SET
} from '../actionTypes';

export function requestAnonymousLogin() {
  return {
    type: AUTH_ANONYMOUS_LOGIN_REQUEST
  };
}

export function setAdditionalUserInfo(data) {
  return {
    type: AUTH_ADDITIONAL_USER_INFO_SET,
    payload: data
  };
}

export function setAuthChange(user) {
  return {
    type: AUTH_STATE_CHANGE_SET,
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
