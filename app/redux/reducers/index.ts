import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import FilesystemStorage from 'redux-persist-filesystem-storage';
import createSensitiveStorage from 'redux-persist-sensitive-storage';
import { permissions } from './permissions';
import { notifications } from './notifications';
import { app, initialization } from './app';
import { sensitiveData } from './sensitiveData';
import { auth } from './auth';
import { errors } from './errors';
import { admob } from './admob';
import { storage } from './storage';

const sensitiveStorage = createSensitiveStorage({
  keychainService: 'REPLACE_WITH_APP_NAME_OR_OTHER_KEY',
  sharedPreferencesName: 'REPLACE_WITH_APP_NAME_OR_OTHER_KEY',
  encrypt: true
});

const sensitiveDataPersistConfig = {
  key: 'sensitiveData',
  storage: sensitiveStorage
};

const createFileSystemStorage = key => {
  return {
    key: key,
    storage: FilesystemStorage
  };
};

// Auth is not persisted by Redux because persistence is handled by firebase directly
export default () => {
  return combineReducers({
    sensitiveData: persistReducer(sensitiveDataPersistConfig, sensitiveData),
    app: persistReducer(createFileSystemStorage('app'), app),
    auth,
    notifications,
    permissions,
    initialization,
    errors,
    admob,
    storage
  });
};
