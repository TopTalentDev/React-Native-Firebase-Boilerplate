import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import FilesystemStorage from 'redux-persist-filesystem-storage';
// @ts-ignore
import createSensitiveStorage from 'redux-persist-sensitive-storage';
import { permissions } from './permissions';
import { notifications, NotificationState } from './notifications';
import { app, initialization, InitializationState, AppState } from './app';
import { sensitiveData, SensitiveDataState } from './sensitiveData';
import { auth, AuthState } from './auth';
import { errors, ErrorState } from './errors';
import { admob, AdMobState } from './admob';
import { storage, StorageState } from './storage';

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

export interface RootState {
  auth: AuthState
  errors: ErrorState
  admob: AdMobState
  initialization: InitializationState
  notifications: NotificationState
  storage: StorageState
  app: AppState
  sensitiveData: SensitiveDataState
};

// Auth is not persisted by Redux because persistence is handled by firebase directly
export default () => {
  return combineReducers<RootState>({
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
