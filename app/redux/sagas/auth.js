import { put, fork, takeEvery } from 'redux-saga/effects';
import { USER_LOGIN_REQUEST, USER_LOGOUT_REQUEST } from '../actionTypes';
import actionCreators from '../actions';

export function* login() {
  try {
    // Add login logic here

    yield put(actionCreators.setLoginSuccess('', {}));
  } catch (error) {
    yield put(actionCreators.setLoginError(error));
  }
}

export function* logout() {
  try {
    // Add logout logic here
  } catch (error) {
    yield put(actionCreators.setLoginError(error));
  }
}

export function* watchInitializationRequest() {
  yield takeEvery(USER_LOGIN_REQUEST, login);
  yield takeEvery(USER_LOGOUT_REQUEST, logout);
}

export default function* root() {
  yield fork(watchInitializationRequest);
}
