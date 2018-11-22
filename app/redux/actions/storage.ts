import {
  StorageActionTypes
} from '../actionTypes';
import { Action } from 'redux';

export interface RequestDownload extends Action {
  type: StorageActionTypes.STORAGE_DOWNLOAD_REQUEST,
  payload: {path: string, filename: string, directoryPath: string}
}

export interface SetStorageIsProcessing extends Action {
  type: StorageActionTypes.STORAGE_IS_PROCESSING_SET
  payload: boolean
}

export interface RequestUpload extends Action {
  type: StorageActionTypes.STORAGE_UPLOAD_REQUEST,
  payload: {path: string, filename: string, directoryPath: string}
}

export type AdmobAction = RequestDownload | RequestUpload | SetStorageIsProcessing;

/**
 * Requests that a file is downloaded from Firebase storage to a local directory.
 * @param path The Firebase Storage bucket reference
 * @param filename The name of the file to set once the file is downloaded locally
 * @param directoryPath The directory path to save the file to locally
 */
export const requestDownload = (path: string, filename: string, directoryPath: string): RequestDownload => {
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
export const requestUpload = (path: string, filename: string, directoryPath: string): RequestUpload => {
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
