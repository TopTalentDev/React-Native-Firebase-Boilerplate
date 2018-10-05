import { USER_LOGIN_SUCCESS_SET, USER_LOGOUT_REQUEST, USER_LOGIN_REQUEST, USER_LOGIN_ERROR_SET } from '../actionTypes';

export function setLoginSuccess(password, me) {
  return {
    type: USER_LOGIN_SUCCESS_SET,
    payload: { password, me }
  };
}

export function setLoginError(error) {
  return {
    type: USER_LOGIN_ERROR_SET,
    payload: error
  };
}

export function requestLogin() {
  return {
    type: USER_LOGIN_REQUEST
  };
}

export function requestLogout() {
  return {
    type: USER_LOGOUT_REQUEST
  };
}
