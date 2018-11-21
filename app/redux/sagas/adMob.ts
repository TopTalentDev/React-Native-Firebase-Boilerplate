import firebase from 'react-native-firebase';
import { call, put } from 'redux-saga/effects';
import * as appActions from '../actions/app';
import { Config } from 'react-native-firebase/config';

export function* initialize(id: string) {
  try {
    // @ts-ignore
    const admob = firebase.admob()
    yield call([admob, admob.initialize], id);
  } catch (error) {
    yield put(appActions.setAppError(error.toString()));
  }
}

export function* openDebugMenu() {
  try {
     // @ts-ignore
     const admob = firebase.admob()
    yield call([admob, admob.openDebugMenu]);
  } catch (error) {
    yield put(appActions.setAppError(error.toString()));
  }
}

export function* openDebugMenu() {
  try {
     // @ts-ignore
     const admob = firebase.admob()
    yield call([admob, admob.openDebugMenu]);
  } catch (error) {
    yield put(appActions.setAppError(error.toString()));
  }
}

export function* interstitial(unitId: string) {
  try {
     // @ts-ignore
     const admob = firebase.admob()
    const intersitial = yield call([admob, admob.interstitial], unitId);
  } catch (error) {
    yield put(appActions.setAppError(error.toString()));
  }
}
