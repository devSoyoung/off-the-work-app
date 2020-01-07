import { AccountActionTypes } from './account.action';

type AuthState = {
  login: boolean,
};

export const initialState: AuthState = {
  login: false,
};

const accountReducer = (state = initialState, action) => {
  switch(action.type) {
    case AccountActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        login: true,
      };

    case AccountActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        login: true,
      };

    default:
      return state;
  }
};

export default accountReducer;
