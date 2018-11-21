import {Platform} from 'react-native';
import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { AppActionTypes } from '../actionTypes';
import actionCreators from '../actions';
import { listenForAuthChange } from './auth';
import { getRemoteConfig, enableDeveloperMode } from './remoteConfig';
import {initialize as adMobInitialize} from './admob';
import { RemoteConfigResult } from '../../types';
import { ADMOB_IOS_APP_ID, ADMOB_ANDROID_APP_ID } from '../../constants';

/**
 * Initialization saga, ran after logging in.
 */
export function* initializeApp() {
  try {
    yield fork(listenForAuthChange);
    if(__DEV__) {
      yield call(enableDeveloperMode);
    }
    const configResult: RemoteConfigResult = yield call(getRemoteConfig, 'demo_config');
    console.log('configResult:', configResult['demo_config_key'].val());
    yield call(adMobInitialize, Platform.OS === 'ios' ? ADMOB_IOS_APP_ID : ADMOB_ANDROID_APP_ID);
    yield put(actionCreators.setAppAsInitialized());
  } catch (error) {
    yield put(actionCreators.setAppInitializeError(error));
  }
}

export function* watchInitializationRequest() {
  yield takeEvery(AppActionTypes.APP_INITIALIZE_REQUEST, initializeApp);
}

export default function* root() {
  yield fork(watchInitializationRequest);
}
