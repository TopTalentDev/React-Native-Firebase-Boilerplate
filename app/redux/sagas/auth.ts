import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { eventChannel } from 'redux-saga';
import { take, call, put, fork, takeEvery } from 'redux-saga/effects';
import {
  AuthActionTypes
} from '../actionTypes';
import * as authActions from '../actions/auth';
import { Auth } from 'react-native-firebase/auth';
import { User } from '../../types';
import { RequestLogin, RequestUserCreateWithEmailAndPassword } from '../actions/auth';

export function authListener() {
  const auth: Auth = firebase.auth();
  return eventChannel(emit => {
    const unsubscribe = auth.onAuthStateChanged((user: User) => emit({ user }));
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
      yield put(authActions.setAuthError(payload.error));
    } else if (payload.user) {
      yield put(authActions.setAuthChange(payload.user));
    }
  }
}

export function* createUserWithEmailAndPassword(action: RequestUserCreateWithEmailAndPassword) {
  try {
    const auth: Auth = firebase.auth();
    yield call([auth, auth.createUserWithEmailAndPassword], action.payload.email, action.payload.password);
  } catch (error) {
    yield put(authActions.setAuthError(error.toString()));
  }
}

export function* loginAnonymously() {
  try {
    const auth: Auth = firebase.auth();
    const result = yield call([auth, auth.signInAnonymously]);
    yield put(authActions.setAdditionalUserInfo(result.additionalUserInfo));
  } catch (error) {
    yield put(authActions.setAuthError(error));
  }
}

export function* loginWithFacebook() {
  try {
    const auth: Auth = firebase.auth();
    const loginResult = yield call([LoginManager, LoginManager.logInWithReadPermissions], ['public_profile', 'email']);

    if (loginResult.isCancelled) {
      yield put(authActions.setAuthError('User cancelled request'));
      return;
    }

    const data = yield call([AccessToken, AccessToken.getCurrentAccessToken]);

    if (!data || !data.accessToken) {
      yield put(authActions.setAuthError('Something went wrong attempting to get FB access token.'));
      return;
    }

    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
    yield call([auth, auth.signInWithCredential], credential);
  } catch (error) {
    yield put(authActions.setAuthError(error));
  }
}

export function* login(action: RequestLogin) {
  try {
    const auth: Auth = firebase.auth();
    yield call([auth, auth.signInWithEmailAndPassword], action.payload.email, action.payload.password);
  } catch (error) {
    yield put(authActions.setAuthError(error.toString()));
  }
}

export function* logout() {
  try {
    const auth: Auth = firebase.auth();
    yield call([auth, auth.signOut]);
  } catch (error) {
    yield put(authActions.setAuthError(error));
  }
}

export function* watchInitializationRequest() {
  yield takeEvery(AuthActionTypes.AUTH_ANONYMOUS_LOGIN_REQUEST, loginAnonymously);
  yield takeEvery(AuthActionTypes.AUTH_FACEBOOK_LOGIN_REQUEST, loginWithFacebook);
  yield takeEvery(AuthActionTypes.AUTH_CREATE_EMAIL_PASSWORD_USER_REQUEST, createUserWithEmailAndPassword);
  yield takeEvery(AuthActionTypes.AUTH_LOGIN_REQUEST, login);
  yield takeEvery(AuthActionTypes.AUTH_LOGOUT_REQUEST, logout);
}

export default function* root() {
  yield fork(watchInitializationRequest);
}
