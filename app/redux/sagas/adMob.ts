import firebase from 'react-native-firebase';
import { call, put, take, fork, takeEvery } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import * as admobActions from '../actions/admob';
import * as appActions from '../actions/app';
import { AdmobActionTypes } from '../actionTypes';

export function* initialize(id: string) {
  try {
    // @ts-ignore
    const admob = firebase.admob();
    yield call([admob, admob.initialize], id);
  } catch (error) {
    yield put(appActions.setAppError(error.toString()));
  }
}

export function* openDebugMenu() {
  try {
     // @ts-ignore
     const admob = firebase.admob();
    yield call([admob, admob.openDebugMenu]);
  } catch (error) {
    yield put(appActions.setAppError(error.toString()));
  }
}

export function* interstitial(unitId: string) {
  try {
    // @ts-ignore
    const admob = firebase.admob();
    const interstitial = yield call([admob, admob.interstitial], unitId);
    return interstitial;
  } catch (error) {
    yield put(appActions.setAppError(error.toString()));
  }
}

export function adLoadListener(advert: any) {
  return eventChannel(emitter => {
    advert.on('onAdLoaded', () => {
      advert.show();
      emitter(true);
      emitter(END);
    });
    return (): void => {}
  });
}

export function* listenForAdLoaded(advert: any) {
  const adLoadChannel = yield call(adLoadListener, advert);
  while (true) {
    const isLoaded = yield take(adLoadChannel);
    if (isLoaded) {
      yield put(admobActions.setAdIsLoaded(true));
    }
  }
}

export function* showSampleInterstitial() {
  try {
    //this unit id is a google test id that will work on simulator
    const advert = yield call(interstitial, 'ca-app-pub-3940256099942544/4411468910');
    // @ts-ignore
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();
    request.addKeyword('foo').addKeyword('bar');
    advert.loadAd(request.build());
    yield fork(listenForAdLoaded, advert);
    yield put(admobActions.requestAdLoad());
  } catch (error) {
    yield put(appActions.setAppError(error.toString()));
  }
}

export function* watchInitializationRequest() {
  yield takeEvery(AdmobActionTypes.ADMOB_SHOW_SAMPLE_INTERSTITIAL, showSampleInterstitial);
}

export default function* root() {
  yield fork(watchInitializationRequest);
}