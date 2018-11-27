import firebase from 'react-native-firebase';
import { call, put, fork, takeEvery } from 'redux-saga/effects';
import * as appActions from '../actions/app';
import * as storageActions from '../actions/storage';
import { StorageActionTypes } from '../actionTypes';
import { RequestDownload, RequestUpload, RequestDownloadURL } from '../actions/storage';
import { Reference } from 'react-native-firebase/storage';

export function* download(action: RequestDownload) {
  try {
    const storage = firebase.storage();
    const ref: Reference = yield call([storage, storage.ref], action.payload.path);
    const path: string = `${action.payload.directoryPath || firebase.storage.Native.DOCUMENT_DIRECTORY_PATH}/${action.payload.filename}`;
    yield put(storageActions.setStorageIsProcessing(true));
    yield call([ref, ref.downloadFile], path);
    yield put(storageActions.setStorageLocalURI(action.payload.filename, path));
    yield put(storageActions.setStorageIsProcessing(false));
  } catch (error) {
    yield put(appActions.setAppError(error.toString()));
  }
}

export function* upload(action: RequestUpload) {
  try {
    const storage = firebase.storage();
    const ref: Reference = yield call([storage, storage.ref], action.payload.path);
    const path: string = `${action.payload.directoryPath || firebase.storage.Native.DOCUMENT_DIRECTORY_PATH}/${action.payload.filename}`
    yield put(storageActions.setStorageIsProcessing(true));
    yield call([ref, ref.putFile], path);
    yield put(storageActions.setStorageIsProcessing(false));
  } catch (error) {
    yield put(appActions.setAppError(error.toString()));
  }
}

export function* getDownloadURL(action: RequestDownloadURL) {
  try {
    const storage = firebase.storage();
    const ref: Reference = yield call([storage, storage.ref], action.payload.path);
    const url = yield call([ref, ref.getDownloadURL]);
    yield put(storageActions.setStorageRemoteURI(action.payload.path, url));
  } catch (error) {
    yield put(appActions.setAppError(error.toString()));
  }
}


export function* watchInitializationRequest() {
  yield takeEvery(StorageActionTypes.STORAGE_DOWNLOAD_REQUEST, download);
  yield takeEvery(StorageActionTypes.STORAGE_UPLOAD_REQUEST, upload);
  yield takeEvery(StorageActionTypes.STORAGE_DOWNLOAD_URL_REQUEST, getDownloadURL);
}

export default function* root() {
  yield fork(watchInitializationRequest);
}