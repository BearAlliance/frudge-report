import { combineReducers } from 'redux';
import connectionState from './connection-state';
import receivedTimer from './received-timer';

export default combineReducers({
  connectionState,
  receivedTimer
});
