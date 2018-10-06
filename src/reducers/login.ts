import {SimpleAction} from '../types/actions';
import {UserPayload} from '../types/user';
import {LoginState} from '../types/state';


const initialState: LoginState = {
  accessToken: null,
  tokenId: null,
  userId: null,
  isLoginFail: false,
};

export default (state: LoginState = initialState, action: SimpleAction) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      const payload: UserPayload = action.payload;
      return {
        accessToken: payload.accessToken,
        tokenId: payload.tokenId,
        userId: payload.userId,
        isLoginFail: false,
      }
    case 'LOGIN_FAILURE':
      return {
        accessToken: null,
        tokenId: null,
        userId: null,
        isLoginFail: true,
      }
    case 'LOGOUT':
      return {
        accessToken: null,
        tokenId: null,
        userId: null,
        isLoginFail: false,
      }
    default:
      return state
  }
}