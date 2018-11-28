import { NotificationsActionTypes } from '../actionTypes';
import { Reducer } from 'redux';

export interface NotificationState {
  notificationPayload: object
}
const defaultNotificationsState = {
  notificationPayload: {
    type: null,
    openedFromTray: null,
    screenData: { name: null, params: {} }
  }
};

export const notifications: Reducer<NotificationState, any> = (state = defaultNotificationsState, action) => {
  switch (action.type) {
    case NotificationsActionTypes.NOTIFICATIONS_PAYLOAD_SET:
      return { ...state, notificationPayload: action.payload };
    case NotificationsActionTypes.NOTIFICATIONS_PAYLOAD_CLEAR:
      return { ...defaultNotificationsState };
  }
  return state;
}
