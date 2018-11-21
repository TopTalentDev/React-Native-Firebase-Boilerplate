import * as permissions from './permissions';
import * as app from './app';
import * as auth from './auth';
import * as admob from './admob';

const actionCreators = Object.assign({}, app, permissions, auth, admob);

export default actionCreators;
