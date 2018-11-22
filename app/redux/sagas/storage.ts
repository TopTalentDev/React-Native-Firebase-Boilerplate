import firebase from 'react-native-firebase';
import { call, put, fork, takeEvery } from 'redux-saga/effects';
import * as appActions from '../actions/app';
import { StorageActionTypes } from '../actionTypes';
import { RequestDownload, RequestUpload } from '../actions/storage';
import { Reference } from 'react-native-firebase/storage';

export function* download(action: RequestDownload) {
  try {
    const storage = firebase.storage();
    const ref: Reference = yield call([storage, storage.ref], action.payload.path);
    yield call([ref, ref.downloadFile], `${action.payload.directoryPath || firebase.storage.Native.DOCUMENT_DIRECTORY_PATH}/${action.payload.filename}`)
  } catch (error) {
    yield put(appActions.setAppError(error.toString()));
  }
}

export function* upload(action: RequestUpload) {
  try {
    const storage = firebase.storage();
    const ref: Reference = yield call([storage, storage.ref], action.payload.path);
    yield call([ref, ref.putFile], `${action.payload.directoryPath || firebase.storage.Native.DOCUMENT_DIRECTORY_PATH}/${action.payload.filename}`)
  } catch (error) {
    yield put(appActions.setAppError(error.toString()));
  }
}


export function* watchInitializationRequest() {
  yield takeEvery(StorageActionTypes.STORAGE_DOWNLOAD_REQUEST, download);
}

export default function* root() {
  yield fork(watchInitializationRequest);
}