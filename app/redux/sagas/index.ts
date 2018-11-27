import { fork } from 'redux-saga/effects';
import auth from './auth';
import initialization from './initialization';
import permissions from './permissions';
import admob from './admob';
import storage from './storage';

export default function* root() {
  let sagas = [fork(auth), fork(initialization), fork(permissions), fork(admob), fork(storage)];
  yield sagas;
}
