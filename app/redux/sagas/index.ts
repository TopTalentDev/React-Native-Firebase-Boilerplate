import { fork } from 'redux-saga/effects';
import auth from './auth';
import initialization from './initialization';
import permissions from './permissions';

export default function* root() {
  let sagas = [fork(auth), fork(initialization), fork(permissions)];
  yield sagas;
}
