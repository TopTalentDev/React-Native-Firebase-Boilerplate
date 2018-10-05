import * as permissions from './permissions';
import * as app from './app';
import * as auth from './auth';

const actionCreators = Object.assign({}, app, permissions, auth);

export default actionCreators;
