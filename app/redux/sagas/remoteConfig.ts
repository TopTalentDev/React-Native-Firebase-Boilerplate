import firebase from 'react-native-firebase';
import { call, put } from 'redux-saga/effects';
import * as appActions from '../actions/app';
import { Config } from 'react-native-firebase/config';

export function* enableDeveloperMode() {
  try {
    const config: Config = firebase.config();
    yield call([config, config.enableDeveloperMode]);
  } catch (error) {
    yield put(appActions.setAppError(error.toString()));
  }
}

export function* getRemoteConfig(prefix: string) {
  try {
    const config: Config = firebase.config();
    yield call([config, config.fetch]);
    yield call([config, config.activateFetched]);
    const keys: string[] = yield call([config, config.getKeysByPrefix], prefix);
    const snapshots: object = yield call([config, config.getValues], keys);
    return snapshots;
  } catch (error) {
    yield put(appActions.setAppError(error.toString()));
  }
}
