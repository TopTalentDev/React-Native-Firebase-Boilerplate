import { NOTIFICATIONS_PAYLOAD_SET, NOTIFICATIONS_PAYLOAD_CLEAR } from '../actionTypes';

const defaultNotificationsState = {
  notificationPayload: {
    type: null,
    openedFromTray: null,
    screenData: { name: null, params: {} }
  }
};

export function notifications(state = defaultNotificationsState, action) {
  switch (action.type) {
    case NOTIFICATIONS_PAYLOAD_SET:
      return { ...state, notificationPayload: action.payload };
    case NOTIFICATIONS_PAYLOAD_CLEAR:
      return { ...defaultNotificationsState };
  }
  return state;
}
