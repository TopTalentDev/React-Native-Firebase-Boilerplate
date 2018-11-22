import * as permissions from './permissions';
import * as app from './app';
import * as auth from './auth';
import * as admob from './admob';
import * as storage from './storage';

const actionCreators = Object.assign({}, app, permissions, auth, admob, storage);

export default actionCreators;
