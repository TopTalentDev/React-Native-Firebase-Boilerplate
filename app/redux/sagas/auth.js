import firebase from 'react-native-firebase';
import { eventChannel } from 'redux-saga';
import { take, call, put, fork, takeEvery } from 'redux-saga/effects';
import { AUTH_ANONYMOUS_LOGIN_REQUEST, AUTH_LOGIN_REQUEST, AUTH_LOGOUT_REQUEST } from '../actionTypes';
import actionCreators from '../actions';

export function authListener() {
  const auth = firebase.auth();
  return eventChannel(emit => {
    const unsubscribe = auth.onAuthStateChanged(user => emit({ user }), error => emit({ error }));
    return unsubscribe;
  });
}

/**
 * Listens as long as app is in memory in foreground/background
 */
export function* listenForAuthChange() {
  const authChannel = yield call(authListener);
  while (true) {
    const payload = yield take(authChannel);
    if (payload.error) {
      yield put(actionCreators.setAuthError(payload.error));
    } else if (payload.user) {
      yield put(actionCreators.setAuthChange(payload.user));
    }
  }
}

export function* loginAnonymously() {
  try {
    const auth = firebase.auth();
    const result = yield call([auth, auth.signInAnonymously]);
    yield put(actionCreators.setAdditionalUserInfo(result.additionalUserInfo));
  } catch (error) {
    yield put(actionCreators.setAuthError(error));
  }
}

export function* login() {
  try {
    // Add login logic here

    yield put(actionCreators.setLoginSuccess('', {}));
  } catch (error) {
    yield put(actionCreators.setAuthError(error));
  }
}

export function* logout() {
  try {
    const auth = firebase.auth();
    yield call([auth, auth.signOut]);
  } catch (error) {
    yield put(actionCreators.setAuthError(error));
  }
}

export function* watchInitializationRequest() {
  yield takeEvery(AUTH_ANONYMOUS_LOGIN_REQUEST, loginAnonymously);
  yield takeEvery(AUTH_LOGIN_REQUEST, login);
  yield takeEvery(AUTH_LOGOUT_REQUEST, logout);
}

export default function* root() {
  yield fork(watchInitializationRequest);
}
