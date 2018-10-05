import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import FilesystemStorage from 'redux-persist-filesystem-storage';
import createSensitiveStorage from 'redux-persist-sensitive-storage';
import { permissions } from './permissions';
import { notifications } from './notifications';
import { app, initialization } from './app';
import { me } from './auth';

const sensitiveStorage = createSensitiveStorage({
  keychainService: 'REPLACE_WITH_APP_NAME_OR_OTHER_KEY',
  sharedPreferencesName: 'REPLACE_WITH_APP_NAME_OR_OTHER_KEY',
  encrypt: true
});

const mePersistConfig = {
  key: 'me',
  storage: sensitiveStorage
};

const createFileSystemStorage = key => {
  return {
    key: key,
    storage: FilesystemStorage
  };
};

export default () => {
  return combineReducers({
    me: persistReducer(mePersistConfig, me),
    app: persistReducer(createFileSystemStorage('app'), app),
    notifications,
    permissions,
    initialization
  });
};
