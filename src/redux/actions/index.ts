import {
  RESET_LAST_RECEIVED_TIMER,
  SET_CONNECTION_STATUS
} from '../action-types';

export const setConnectionState = (isConnected: boolean) => ({
  type: SET_CONNECTION_STATUS,
  isConnected
});

export const resetLastReceivedTimer = () => ({
  type: RESET_LAST_RECEIVED_TIMER,
  lastReset: new Date()
});
