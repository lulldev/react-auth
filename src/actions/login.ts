import {Dispatch} from 'redux';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from '../constants/actions';
import {USER_AUTHENTICATION_ENDPOINT} from '../constants/api';
import {SimpleAction} from '../types/actions';


export const loginSuccess = (accessData: object) => {
  return {
    type: LOGIN_SUCCESS,
    payload: accessData,
  };
};

export const loginFailure = (): SimpleAction => {
  return {
    type: LOGIN_FAILURE,
  };
};

export const login = (dispatch: Dispatch<SimpleAction>, requestData: object) => {
  fetch(USER_AUTHENTICATION_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(requestData)
  })
    .then((response: Response) => {
      if (response.status !== 200) {
        dispatch(loginFailure());
        return;
      }
      return response.json();
    })
    .then((authResult: object) => {
      dispatch(loginSuccess(authResult));
    })
    .catch(() => {
      dispatch(loginFailure());
    });
};

export const logout = (): SimpleAction => {
  return {
    type: LOGOUT,
  };
};
