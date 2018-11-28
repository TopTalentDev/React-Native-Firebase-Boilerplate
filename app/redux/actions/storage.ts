import {
  StorageActionTypes
} from '../actionTypes';
import { Action } from 'redux';

export interface RequestDownload extends Action {
  type: StorageActionTypes.STORAGE_DOWNLOAD_REQUEST,
  payload: {path: string, filename: string, directoryPath: string | undefined}
}

export interface SetStorageIsProcessing extends Action {
  type: StorageActionTypes.STORAGE_IS_PROCESSING_SET
  payload: boolean
}

export interface RequestUpload extends Action {
  type: StorageActionTypes.STORAGE_UPLOAD_REQUEST,
  payload: {path: string, filename: string, directoryPath: string | undefined}
}

export interface SetStorageLocalURI extends Action {
  type: StorageActionTypes.STORAGE_LOCAL_URI_SET,
  payload: {key: string, uri: string}
}

export interface SetStorageRemoteURI extends Action {
  type: StorageActionTypes.STORAGE_REMOTE_URI_SET,
  payload: {key: string, uri: string}
}

export interface RequestDownloadURL extends Action {
  type: StorageActionTypes.STORAGE_DOWNLOAD_URL_REQUEST,
  payload: {path: string}
}

export type StorageAction = RequestDownload | RequestUpload | SetStorageIsProcessing | SetStorageLocalURI | SetStorageRemoteURI | RequestDownloadURL;

/**
 * Requests that a file is downloaded from Firebase storage to a local directory.
 * @param path The Firebase Storage bucket reference
 * @param filename The name of the file to set once the file is downloaded locally
 * @param directoryPath The directory path to save the file to locally
 */
export const requestDownload = (path: string, filename: string, directoryPath?: string): RequestDownload => {
  return {
    type: StorageActionTypes.STORAGE_DOWNLOAD_REQUEST,
    payload: {path, filename, directoryPath}
  };
}

/**
 * Requests that a file is uploaded to the Firebase storage, from a local directory.
 * @param path The Firebase Storage bucket reference
 * @param filename The name of the local file to upload
 * @param directoryPath The directory path to the local file to upload
 */
export const requestUpload = (path: string, filename: string, directoryPath?: string): RequestUpload => {
  return {
    type: StorageActionTypes.STORAGE_UPLOAD_REQUEST,
    payload: {path, filename, directoryPath}
  };
}

export const setStorageIsProcessing = (isProcessing: boolean): SetStorageIsProcessing => {
  return {
    type: StorageActionTypes.STORAGE_IS_PROCESSING_SET,
    payload: isProcessing
  };
}

/**
 * Sets a local uri (one pointing to a local device storage location) in memory, to be used by the app.
 * @param key A key that refers to the uri
 * @param uri The uri associated with the key
 */
export const setStorageLocalURI = (key: string, uri: string): SetStorageLocalURI => {
  return {
    type: StorageActionTypes.STORAGE_LOCAL_URI_SET,
    payload: {key, uri}
  };
}

/**
 * Sets a local uri (one pointing to a local device storage location) in memory, to be used by the app.
 * @param key A key that refers to the uri
 * @param uri The uri associated with the key
 */
export const setStorageRemoteURI = (key: string, uri: string): SetStorageRemoteURI => {
  return {
    type: StorageActionTypes.STORAGE_REMOTE_URI_SET,
    payload: {key, uri}
  };
}

/**
 * Returns a long lived download url for the file
 * @param path The full firebase ref path including file extension
 */
export const requestDownloadURL = (path: string): RequestDownloadURL => {
  return {
    type: StorageActionTypes.STORAGE_DOWNLOAD_URL_REQUEST,
    payload: {path}
  };
}
