import { SET_CONNECTION_STATUS } from '../action-types';

const initialState = {
  isConnected: false
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CONNECTION_STATUS:
      const { isConnected } = action;
      return {
        ...state,
        isConnected: isConnected
      };
    default:
      return state;
  }
};
