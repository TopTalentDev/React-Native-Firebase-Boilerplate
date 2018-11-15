import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { eventChannel } from 'redux-saga';
import { take, call, put, fork, takeEvery } from 'redux-saga/effects';
import {
  AUTH_ANONYMOUS_LOGIN_REQUEST,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGOUT_REQUEST,
  AUTH_FACEBOOK_LOGIN_REQUEST,
  AUTH_CREATE_EMAIL_PASSWORD_USER_REQUEST
} from '../actionTypes';
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

export function* createUserWithEmailAndPassword(action) {
  try {
    const auth = firebase.auth();
    yield call([auth, auth.createUserWithEmailAndPassword], action.payload.email, action.payload.password);
  } catch (error) {
    yield put(actionCreators.setAuthError(error.toString()));
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

export function* loginWithFacebook() {
  try {
    const auth = firebase.auth();
    const loginResult = yield call([LoginManager, LoginManager.logInWithReadPermissions], ['public_profile', 'email']);

    if (loginResult.isCancelled) {
      yield put(actionCreators.setAuthError('User cancelled request'));
      return;
    }

    const data = yield call([AccessToken, AccessToken.getCurrentAccessToken]);

    if (!data || !data.accessToken) {
      yield put(actionCreators.setAuthError('Something went wrong attempting to get FB access token.'));
      return;
    }

    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
    yield call([auth, auth.signInWithCredential], credential);
  } catch (error) {
    yield put(actionCreators.setAuthError(error));
  }
}

export function* login(action) {
  try {
    const auth = firebase.auth();
    yield call([auth, auth.signInWithEmailAndPassword], action.payload.email, action.payload.password);
  } catch (error) {
    yield put(actionCreators.setAuthError(error.toString()));
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
  yield takeEvery(AUTH_FACEBOOK_LOGIN_REQUEST, loginWithFacebook);
  yield takeEvery(AUTH_CREATE_EMAIL_PASSWORD_USER_REQUEST, createUserWithEmailAndPassword);
  yield takeEvery(AUTH_LOGIN_REQUEST, login);
  yield takeEvery(AUTH_LOGOUT_REQUEST, logout);
}

export default function* root() {
  yield fork(watchInitializationRequest);
}
