import { RESET_LAST_RECEIVED_TIMER } from '../action-types';

const initialState = {
  lastReset: new Date()
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case RESET_LAST_RECEIVED_TIMER:
      const { lastReset } = action;
      return {
        ...state,
        lastReset: lastReset
      };
    default:
      return state;
  }
};
