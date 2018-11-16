import Permissions from 'react-native-permissions';
import { Platform } from 'react-native';
import { call, takeEvery, fork, put } from 'redux-saga/effects';
import * as actions from '../actions/permissions';
import {
  PERMISSION_TYPE_LOCATION,
  PERMISSION_TYPE_PHOTO,
  PERMISSION_TYPE_CAMERA,
  PERMISSION_TYPE_NOTIFICATION,
  PERMISSION_TYPE_SPEECH_REC,
  PERMISSION_TYPE_MICROPHONE,
  PERMISSION_TYPE_STORAGE
} from '../../constants';
import { PermissionsActionTypes } from '../actionTypes';

/**
 * Gets the state of each permission type. Possible types are:
 * authorized: User has authorized this permission
 * denied: User has denied this permission at least once. On iOS this means that the user will not be prompted again. Android users can be prompted multiple times until they select 'Never ask me again'
 * restricted: iOS - this means user is not able to grant this permission, either because it's not supported by the device or because it has been blocked by parental controls. Android - this means that the user has selected 'Never ask me again' while denying permission
 * undetermined: User has not yet been prompted with a permission dialog.
 */
export function* getAllPermissionsState() {
  const permissions = yield call(Permissions.checkMultiple, [
    ...(Platform.OS === 'android' ? [PERMISSION_TYPE_STORAGE] : []),
    PERMISSION_TYPE_LOCATION,
    PERMISSION_TYPE_PHOTO,
    PERMISSION_TYPE_CAMERA,
    PERMISSION_TYPE_NOTIFICATION,
    PERMISSION_TYPE_SPEECH_REC,
    PERMISSION_TYPE_MICROPHONE
  ]);
  yield put(actions.setAllPermissions(permissions));
}

/**
 * Invokes the native prompt to the user, to allow or deny a certain app permission.
 * @param {Object} action
 * @param {string} action.payload The permission type as defined by the PERMISSION_TYPE_* constants
 */
export function* requestPermission(action) {
  const permissionType = action.payload;
  yield call(Permissions.request, permissionType);
  yield call(getAllPermissionsState);
}

export function* watchPermissionsRequests() {
  yield takeEvery(PermissionsActionTypes.PERMISSIONS_ALL_GET, getAllPermissionsState);
  yield takeEvery(PermissionsActionTypes.PERMISSIONS_REQUEST, requestPermission);
}

export default function* root() {
  yield fork(watchPermissionsRequests);
}
